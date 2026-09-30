/**
 * REST API client for portfolio backend communications
 * Dynamically resolves to relative URL in production or VITE_API_URL in dev
 */

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // In production (Render, custom domain, or any remote host), use relative URL
  if (
    typeof window !== 'undefined' &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    return '';
  }
  return 'http://localhost:5000';
};

/**
 * Submit contact form payload to MongoDB & Nodemailer
 */
export const sendContactMessage = async (formData) => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit contact message');
  }

  return data;
};

/**
 * Fetch live GitHub statistics and recent public repositories
 */
export const fetchGitHubStats = async () => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/github-stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub stats');
  }
  const data = await response.json();
  return data.data;
};

/**
 * Record a page visit and retrieve total visitor count
 */
export const recordVisit = async () => {
  const baseUrl = getApiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) return { totalVisits: 0 };
    const data = await response.json();
    return data;
  } catch (err) {
    return { totalVisits: 0 };
  }
};

/**
 * Direct download link for tracked resume PDF
 */
export const getResumeDownloadUrl = () => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/resume.pdf`;
};
