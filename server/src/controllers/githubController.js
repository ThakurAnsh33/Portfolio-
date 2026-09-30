/**
 * Controller for fetching live GitHub stats for ThakurAnsh33
 * Implements in-memory caching (10-minute TTL) to prevent rate limiting
 */

let cachedGitHubStats = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Resilient fallback data in case GitHub is rate-limited or unreachable
const fallbackStats = {
  login: 'ThakurAnsh33',
  name: 'Ansh Singh',
  avatar_url: 'https://avatars.githubusercontent.com/u/150000000?v=4',
  html_url: 'https://github.com/ThakurAnsh33',
  bio: 'Full Stack MERN Developer | B.Tech CSE at Lovely Professional University',
  public_repos: 14,
  followers: 12,
  following: 15,
  recent_repos: [
    {
      id: 1,
      name: 'PrimeBid',
      description: 'Full-stack MERN real-time auction platform with Socket.IO bidding and automated timers.',
      html_url: 'https://github.com/ThakurAnsh33',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 2,
    },
    {
      id: 2,
      name: 'CivicPulse',
      description: 'AI-assisted citizen grievance analysis and civic issue categorization dashboard.',
      html_url: 'https://github.com/ThakurAnsh33',
      language: 'Python',
      stargazers_count: 4,
      forks_count: 1,
    },
    {
      id: 3,
      name: 'HomeServices-Platform',
      description: '24-hour hackathon finalist project for local verified home service booking.',
      html_url: 'https://github.com/ThakurAnsh33',
      language: 'JavaScript',
      stargazers_count: 3,
      forks_count: 1,
    },
    {
      id: 4,
      name: 'LPU-Clothings-Store',
      description: 'Campus merchandise e-commerce platform with cart, checkout, and admin order analytics.',
      html_url: 'https://github.com/ThakurAnsh33',
      language: 'JavaScript',
      stargazers_count: 3,
      forks_count: 0,
    },
  ],
  cached: false,
  isFallback: true,
};

export const getGitHubStats = async (req, res) => {
  const now = Date.now();

  // Return from cache if fresh
  if (cachedGitHubStats && now - lastCacheTime < CACHE_TTL_MS) {
    return res.status(200).json({
      success: true,
      data: {
        ...cachedGitHubStats,
        cached: true,
        cacheAgeSeconds: Math.floor((now - lastCacheTime) / 1000),
      },
    });
  }

  try {
    const headers = {
      'User-Agent': 'AnshSingh-MERN-Portfolio',
      Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user profile and recent repositories in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/ThakurAnsh33', { headers }),
      fetch('https://api.github.com/users/ThakurAnsh33/repos?sort=updated&per_page=6', { headers }),
    ]);

    if (!userRes.ok) {
      console.warn(`[GitHub API Notice] Status ${userRes.status}. Using fallback/cached data.`);
      const resultData = cachedGitHubStats || fallbackStats;
      return res.status(200).json({
        success: true,
        data: { ...resultData, isFallback: true },
      });
    }

    const userData = await userRes.json();
    let reposData = [];

    if (reposRes.ok) {
      const rawRepos = await reposRes.json();
      if (Array.isArray(rawRepos)) {
        reposData = rawRepos
          .filter((repo) => !repo.fork)
          .slice(0, 4)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'Full-stack software repository.',
            html_url: repo.html_url,
            language: repo.language || 'JavaScript',
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
          }));
      }
    }

    cachedGitHubStats = {
      login: userData.login,
      name: userData.name || 'Ansh Singh',
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      bio: userData.bio || 'Full Stack MERN Developer',
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      recent_repos: reposData.length > 0 ? reposData : fallbackStats.recent_repos,
      cached: false,
      isFallback: false,
      updatedAt: new Date().toISOString(),
    };

    lastCacheTime = now;

    return res.status(200).json({
      success: true,
      data: cachedGitHubStats,
    });
  } catch (error) {
    console.error('[GitHub Stats Error]:', error.message);
    const resultData = cachedGitHubStats || fallbackStats;
    return res.status(200).json({
      success: true,
      data: { ...resultData, isFallback: true, error: error.message },
    });
  }
};

