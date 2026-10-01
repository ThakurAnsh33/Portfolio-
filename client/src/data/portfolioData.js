export const personalInfo = {
  name: "Ansh Singh",
  tagline: "Full Stack MERN Developer",
  animatedTitles: [
    "Full Stack MERN Developer",
    "React.js Developer",
    "Node.js & Express Developer",
    "Backend & REST API Architect"
  ],
  bioIntro:
    "Computer Science undergraduate at Lovely Professional University with a passion for building scalable, high-performance web applications across the full MERN stack.",
  bioDetailed:
    "I'm a Full Stack Developer with a strong foundation in modern JavaScript, React.js, Node.js, Express, and MongoDB. With hands-on internship experience building marketplace applications, competing in fast-paced hackathons, and developing production-grade platforms, I focus on crafting clean architectures, intuitive user interfaces, and resilient backend services.",
  email: "anshmvm@gmail.com",
  phone: "+91 9559035733",
  location: "Phagwara, Punjab, India",
  linkedIn: "https://www.linkedin.com/in/thakuransh/",
  github: "https://github.com/ThakurAnsh33",
  resumeUrl: "/resume.pdf",
  profileImage: "/profile.png",
  avatar: "/profile.png",
  cgpa: "8.3",
  university: "Lovely Professional University",
  status: "Available for Full-time Roles & Internships",
};

export const stats = [
  { label: "CGPA", value: "8.3", detail: "Lovely Professional University" },
  { label: "Core Focus", value: "MERN", detail: "MongoDB, Express, React, Node" },
  { label: "Hackathons", value: "24h", detail: "WEB-A-THON 2.0 Finalist" },
  { label: "Certifications", value: "11+", detail: "NASSCOM, iamneo & more" },
];

export const coreStrengths = [
  {
    title: "Full-Stack System Design",
    description: "Designing end-to-end applications with secure JWT authentication, RESTful APIs, and optimized database schemas.",
  },
  {
    title: "Problem Solving",
    description: "Strong algorithmic mindset in C++, Java, and JavaScript with clean code discipline.",
  },
  {
    title: "Quick Learner & Adaptable",
    description: "Rapidly mastering emerging technologies, frameworks, containerization, and modern UI tooling.",
  },
  {
    title: "Team Player & Agile",
    description: "Proven track record in collaborative hackathons, code reviews, and cross-functional team sprints.",
  },
];

export const skillCategories = [
  {
    category: "Languages",
    description: "Core programming and scripting languages",
    skills: [
      { name: "JavaScript", level: 92, icon: "SiJavascript", color: "#F7DF1E" },
      { name: "Java", level: 88, icon: "FaJava", color: "#ED8B00" },
      { name: "C++", level: 85, icon: "SiCplusplus", color: "#00599C" },
      { name: "C", level: 82, icon: "SiC", color: "#A8B9CC" },
      { name: "Python", level: 80, icon: "SiPython", color: "#3776AB" },
    ],
  },
  {
    category: "Frontend",
    description: "Modern web UI & client engineering",
    skills: [
      { name: "React.js", level: 94, icon: "SiReact", color: "#61DAFB" },
      { name: "Tailwind CSS", level: 95, icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "HTML5", level: 95, icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS3", level: 92, icon: "TbBrandCss3", color: "#1572B6" },
      { name: "Framer Motion", level: 88, icon: "SiFramer", color: "#0055FF" },
    ],
  },
  {
    category: "Backend",
    description: "Server architecture, APIs & real-time communication",
    skills: [
      { name: "Node.js", level: 90, icon: "SiNodedotjs", color: "#339933" },
      { name: "Express.js", level: 92, icon: "SiExpress", color: "#ffffff" },
      { name: "REST APIs", level: 94, icon: "TbApi", color: "#38BDF8" },
      { name: "JWT Auth", level: 90, icon: "SiJsonwebtokens", color: "#FB7185" },
      { name: "Socket.IO", level: 84, icon: "SiSocketdotio", color: "#010101" },
    ],
  },
  {
    category: "Database",
    description: "Data modeling, querying & ODM tools",
    skills: [
      { name: "MongoDB", level: 90, icon: "SiMongodb", color: "#47A248" },
      { name: "Mongoose ODM", level: 90, icon: "SiMongodb", color: "#880000" },
    ],
  },
  {
    category: "Tools & Platforms",
    description: "Development environment, devops & media infrastructure",
    skills: [
      { name: "Git", level: 90, icon: "SiGit", color: "#F05032" },
      { name: "GitHub", level: 92, icon: "SiGithub", color: "#ffffff" },
      { name: "VS Code", level: 95, icon: "VscVscode", color: "#007ACC" },
      { name: "Cloudinary", level: 85, icon: "SiCloudinary", color: "#3448C5" },
      { name: "Docker", level: 75, icon: "SiDocker", color: "#2496ED" },
      { name: "Kubernetes (Fund.)", level: 70, icon: "SiKubernetes", color: "#326CE5" },
    ],
  },
];

export const experience = [
  {
    role: "Web Development Intern",
    company: "Info Bharat Interns",
    type: "Virtual Internship",
    period: "Virtual Internship Experience",
    badge: "MERN Stack",
    description:
      "Contributed to building high-traffic, reliable web solutions with a focus on marketplace dynamics, role-scoped permissions, and smooth client UX.",
    highlights: [
      "Built a Service Marketplace web application using React.js, Node.js, Express.js & MongoDB for service listings, bookings, and provider management.",
      "Set up JWT authentication and role-based dashboards for Users, Providers & Admins with scoped permissions.",
      "Built responsive service browsing and booking interfaces with Tailwind CSS.",
      "Collaborated on API documentation, database schema optimizations, and state management flow.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
  },
];

export const projects = [
  {
    id: "ner-slap",
    slug: "ner-slap",
    title: "NER-SLAP — Northeast Region Smart Logistics & Accessibility Platform",
    date: "2026",
    subtitle: "SIH 2026 Grand Finale — ML-Powered Logistics Decision Support System",
    tags: ["React", "TypeScript", "Node.js", "Express", "SQLite", "Leaflet", "Recharts", "Machine Learning", "scikit-learn"],
    description:
      "Enterprise decision-support platform for Northeast India logistics planners and disaster management authorities — combining live routing, ML-based ETA/cost/disruption prediction, and a 6-pillar accessibility scoring engine across 8 modules.",
    problem:
      "Logistics planning across Northeast India's complex terrain faces frequent monsoon landslides, infrastructure bottlenecks, volatile transport costs, and zero-cellular connectivity zones that stall critical supply chains during disaster emergencies.",
    solution:
      "Architected an end-to-end decision-support platform combining live corridor routing, scikit-learn decision tree models exported to pure TypeScript for zero-runtime-Python inference (<0.05ms), a 15-minute SQLite caching proxy, and graceful offline fallback datasets for zero-downtime demonstrations.",
    architecture: {
      layer1: "Layer 1: Frontend — React, TypeScript, Leaflet GIS, Recharts radar/bar analytics, offline datasets",
      layer2: "Layer 2: Express Routes & API Gateway — Routing controllers, module handlers, validation & proxy dispatch",
      layer3: "Layer 3: SQLite Cache Proxy + Pure-TS Decision Trees (<0.05ms in-memory ML inference)",
    },
    metrics: [
      { label: "Disruption Classifier", value: "85.80% Acc / 0.8600 Prec" },
      { label: "ETA Regressor", value: "R² = 0.7866 (MAE ~37 min)" },
      { label: "Cost Regressor", value: "R² = 0.9541 (MAE ₹2.85/km)" },
    ],
    features: [
      "8 integrated modules: live corridor Dashboard, Route Optimizer with OSRM-based routing and Bézier-curve offline fallback, ML-driven ETA Predictor with 90% confidence bounds, and a Disruption Alerts classifier (85.80% test accuracy, full confusion matrix + judge demo panel).",
      "Hub & POI Finder for fuel/hospital/warehouse discovery, Transport Matcher enforcing cold-chain compliance and recommending rail freight for heavy loads, and a Cost Predictor regressor (R² = 0.9541) with a 4-pillar cost breakdown.",
      "Logistics Accessibility Score (LAS): a 6-pillar, equally-weighted, explainable 0–100 district accessibility index with radar-chart visualization and side-by-side district comparison.",
      "Zero-runtime-Python ML inference — scikit-learn decision trees exported to pure TypeScript for sub-0.05ms predictions — plus a strict 3-layer architecture with a 15-minute SQLite-cached proxy layer and graceful offline fallbacks (climatological weather model, curved detour routing, 35-hub/60-POI offline dataset) for zero-downtime live demos.",
    ],
    codeSnippet: {
      title: "Pure TypeScript Decision Tree Traversal Engine (<0.05ms Zero-Python Inference)",
      language: "typescript",
      code: `// NER-SLAP: Zero-Runtime-Python ML Decision Tree Inference Engine
// Trained in scikit-learn, exported to pure TypeScript for sub-0.05ms predictions

interface TreeNode {
  featureIndex?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  value?: number; // regression estimate or class probability
}

/**
 * Iterative binary tree evaluation avoiding recursion overhead
 * Executes in < 0.05ms with zero external runtime dependencies
 */
export function evaluateDecisionTree(node: TreeNode, features: Float64Array): number {
  let current: TreeNode = node;
  
  while (current.left && current.right && current.featureIndex !== undefined && current.threshold !== undefined) {
    const featureVal = features[current.featureIndex];
    current = featureVal <= current.threshold ? current.left : current.right;
  }
  
  return current.value ?? 0;
}

// Disruption Alerts Classifier: 85.80% Test Accuracy
export function predictDisruption(rainfallMm: number, elevationM: number, slopeDeg: number): boolean {
  const inputVector = new Float64Array([rainfallMm, elevationM, slopeDeg]);
  const probability = evaluateDecisionTree(DISRUPTION_TREE_ROOT, inputVector);
  return probability >= 0.50; // Decision threshold
}`,
    },
    githubUrl: "<your NER-SLAP GitHub repo URL>",
    liveDemoUrl: "https://ner-slap-final.onrender.com/",
    featured: true,
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/30",
  },
  {
    id: "primebid",
    slug: "primebid",
    title: "PrimeBid — MERN Stack Auction Platform",
    date: "Apr 2026",
    subtitle: "Real-time Bidding & Marketplace Engine",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Cloudinary", "Socket.IO"],
    description:
      "Full-stack digital auction platform facilitating live auctions, automated bids, asset uploads, and notifications.",
    problem:
      "Traditional online auctions suffer from bid-sniping, high server polling overhead, race conditions on simultaneous last-second bids, and laggy media delivery.",
    solution:
      "Engineered an event-driven architecture using Socket.IO rooms for zero-polling real-time bid updates, backed by atomic MongoDB conditional increments ($lt/$gt checks) to completely eliminate concurrency anomalies and race conditions.",
    architecture: {
      frontend: "React 18, Tailwind CSS, Framer Motion, Socket.IO Client",
      backend: "Node.js, Express.js REST APIs, Socket.IO Gateway",
      database: "MongoDB with Mongoose schemas & atomic indexing",
      storage: "Cloudinary CDN with adaptive image transformations",
    },
    metrics: [
      { label: "Bid Latency", value: "< 50ms" },
      { label: "Concurrency", value: "Atomic $lt checks" },
      { label: "Uptime", value: "99.9%" },
    ],
    features: [
      "Full-stack auction platform with authentication, auction management, and real-time bidding.",
      "Live countdown timers and high-resolution image uploads for auction listings via Cloudinary.",
      "Integrated REST APIs, Cloudinary, and email notifications with a clean, responsive UI.",
      "Automated bid validation preventing sniper bids and ensuring fair pricing mechanisms.",
    ],
    codeSnippet: {
      title: "Atomic Concurrency Control Handler",
      language: "javascript",
      code: `// PrimeBid: Atomic Real-Time Auction Bidding Engine (Socket.IO + MongoDB)
export const handlePlaceBid = (io, socket) => {
  socket.on('auction:place_bid', async ({ auctionId, amount, bidderId }) => {
    try {
      // 1. Atomically increment bid and push bid history with condition
      const updatedAuction = await Auction.findOneAndUpdate(
        {
          _id: auctionId,
          status: 'active',
          currentBid: { $lt: amount },
          expiresAt: { $gt: new Date() },
        },
        {
          $set: { currentBid: amount, highestBidder: bidderId },
          $push: {
            bids: {
              bidder: bidderId,
              amount,
              timestamp: new Date(),
            },
          },
        },
        { new: true, runValidators: true }
      ).populate('highestBidder', 'name email avatar');

      if (!updatedAuction) {
        return socket.emit('bid_error', {
          message: 'Bid rejected: Auction closed or higher bid placed.',
        });
      }

      // 2. Broadcast updated state to all connected clients in auction room
      io.to(\`auction:\${auctionId}\`).emit('auction:bid_updated', {
        auctionId,
        newHighBid: amount,
        highestBidder: updatedAuction.highestBidder,
        bidCount: updatedAuction.bids.length,
      });
    } catch (err) {
      socket.emit('bid_error', { message: 'Failed to process bid transaction.' });
    }
  });
};`,
    },
    githubUrl: "https://github.com/ThakurAnsh33",
    liveDemoUrl: "https://github.com/ThakurAnsh33",
    featured: true,
    gradient: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
  },
  {
    id: "civicpulse",
    slug: "civicpulse",
    title: "CivicPulse — AI-Powered Citizen Feedback Dashboard",
    date: "Jun–Jul 2026",
    subtitle: "Intelligent Sentiment & Urgency Prioritization",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "NLP", "Socket.IO"],
    description:
      "AI-powered citizen feedback analysis dashboard designed to streamline civic grievance redressal with automated NLP triage.",
    problem:
      "Municipal departments receive thousands of unstructured grievances weekly across social channels and portals, leading to critical public safety hazards remaining buried beneath low-priority complaints.",
    solution:
      "Designed an NLP pipeline that extracts emotion, sentiment polarity, and urgency scores from citizen submissions, auto-classifying them into emergency dispatch queues and rendering interactive spatial heatmaps for civic authorities.",
    architecture: {
      frontend: "React 18, TypeScript, Tailwind CSS, Recharts/Plotly",
      backend: "Express.js, NLP Triage Worker, Socket.IO Notification Hub",
      database: "MongoDB with compound sentiment & geospatial indexes",
      auth: "Role-scoped JWT with permission scopes (Officer, Supervisor, Admin)",
    },
    metrics: [
      { label: "Triage Speed", value: "Instantaneous" },
      { label: "Urgency Accuracy", value: "91% F1" },
      { label: "Categories", value: "12 Civic Depts" },
    ],
    features: [
      "AI-powered citizen feedback analysis dashboard — collection, processing, and visual analytics.",
      "NLP-based sentiment, emotion, topic, keyword, spam, and urgency analysis for auto-prioritizing critical civic feedback.",
      "JWT auth, role-based access control, REST APIs, and real-time Socket.IO alerts for high-priority incidents.",
      "Interactive analytics chart views providing local authorities actionable demographic insights.",
    ],
    codeSnippet: {
      title: "NLP Urgency Scoring & Auto-Classification Engine",
      language: "javascript",
      code: `// CivicPulse: NLP Sentiment & Urgency Prioritization Pipeline
export const triageGrievance = async (grievanceText, category) => {
  const tokens = tokenize(grievanceText.toLowerCase());
  const sentimentScore = analyzeSentiment(tokens);
  
  // Detect emergency hazard indicators (gas leaks, collapsed roads, wire down)
  const hazardHits = EMERGENCY_KEYWORDS.filter(k => grievanceText.includes(k));
  const isEmergency = hazardHits.length > 0 || sentimentScore.urgencyFactor > 0.85;

  const classification = {
    priority: isEmergency ? 'CRITICAL_DISPATCH' : sentimentScore.polarity < -0.6 ? 'HIGH' : 'STANDARD',
    sentiment: sentimentScore.label,
    urgencyScore: Math.round(sentimentScore.urgencyFactor * 100),
    suggestedDepartment: DEPARTMENT_MAP[category] || 'General Administration',
    keywords: Array.from(new Set([...hazardHits, ...sentimentScore.keyEntities])),
    autoEscalate: isEmergency,
  };

  return classification;
};`,
    },
    githubUrl: "https://github.com/ThakurAnsh33",
    liveDemoUrl: "https://github.com/ThakurAnsh33",
    featured: true,
    gradient: "from-cyan-600/30 via-blue-600/20 to-violet-600/30",
  },
  {
    id: "home-services",
    slug: "home-services",
    title: "Home Services Platform — WEB-A-THON 2.0",
    date: "Feb 2026",
    subtitle: "24-Hour Hackathon Delivery (ARENA)",
    tags: ["MERN Stack", "Hackathon", "React.js", "Node.js", "MongoDB", "Express.js"],
    description:
      "Full-stack MERN application engineered within 24 hours connecting residents with on-demand verified local service providers.",
    problem:
      "Urban residents face difficulty finding trustworthy, price-transparent local domestic service providers (plumbing, cleaning, cooking) with reliable scheduling on short notice.",
    solution:
      "Built a high-velocity booking platform with verified provider profiles, instant calendar slot selection, role-based user/provider views, and dynamic search by neighborhood.",
    architecture: {
      frontend: "React.js, Tailwind CSS, Lucide Icons",
      backend: "Node.js & Express.js REST endpoints",
      database: "MongoDB Atlas cluster with geolocation queries",
      auth: "Bcrypt hashed credentials + stateless session tokens",
    },
    metrics: [
      { label: "Build Time", value: "24 Hours" },
      { label: "Status", value: "Hackathon Finalist" },
      { label: "API Endpoints", value: "14 Handlers" },
    ],
    features: [
      "Full-stack MERN app built in a 24-hour hackathon (organized by ARENA) connecting people with local service providers for cooking, cleaning, and household help.",
      "Contributed across the stack: React front-end, Node/Express backend REST services, and MongoDB database models.",
      "Instant booking mechanism with schedule selection and provider confirmation workflow.",
      "Rapid prototyping with responsive Tailwind CSS UI tailored for mobile clients.",
    ],
    codeSnippet: {
      title: "Service Provider Booking Dispatcher",
      language: "javascript",
      code: `// Home Services: Dynamic Service Provider Schedule Matcher
export const createBooking = async (req, res) => {
  const { providerId, serviceType, appointmentDate, address } = req.body;
  
  // Verify slot availability
  const conflict = await Booking.findOne({
    providerId,
    appointmentDate: { $gte: startOfSlot(appointmentDate), $lte: endOfSlot(appointmentDate) },
    status: { $in: ['confirmed', 'in_progress'] }
  });

  if (conflict) {
    return res.status(409).json({ success: false, message: 'Provider slot already reserved.' });
  }

  const booking = await Booking.create({
    userId: req.user._id,
    providerId,
    serviceType,
    appointmentDate,
    address,
    status: 'confirmed',
  });

  res.status(201).json({ success: true, booking });
};`,
    },
    githubUrl: "https://github.com/ThakurAnsh33",
    liveDemoUrl: "https://github.com/ThakurAnsh33",
    featured: false,
    gradient: "from-violet-600/30 via-purple-600/20 to-pink-600/30",
  },
  {
    id: "lpu-clothings",
    slug: "lpu-clothings",
    title: "E-commerce — LPU Clothings",
    date: "Oct 2024",
    subtitle: "End-to-End Online Fashion Storefront",
    tags: ["HTML", "CSS", "JavaScript", "Frontend", "E-Commerce"],
    description:
      "Complete responsive apparel e-commerce website covering the entire customer shopping journey from discovery to checkout.",
    problem:
      "Modern e-commerce sites often rely on heavy frameworks for simple storefronts, leading to bloat and slow load times on low-bandwidth mobile networks.",
    solution:
      "Implemented a zero-dependency, vanilla JavaScript client utilizing localStorage state persistence, performant DOM mutations, and fluid CSS media queries.",
    architecture: {
      frontend: "HTML5, CSS3, Modern ES6+ JavaScript",
      state: "Browser LocalStorage client persistence",
      styling: "Custom responsive grid & modern glass cards",
    },
    metrics: [
      { label: "Bundle Size", value: "< 45 KB" },
      { label: "PageSpeed", value: "98/100" },
      { label: "Dependencies", value: "Zero" },
    ],
    features: [
      "Responsive e-commerce website covering full browsing-to-checkout user flow.",
      "Dynamic product catalog listing, filtering, search, and detailed view modals.",
      "Interactive shopping cart with item quantity updates, price calculations, and checkout validation.",
      "Lightweight, pure JavaScript implementation demonstrating solid fundamental DOM manipulation.",
    ],
    codeSnippet: {
      title: "Persistent Cart State Engine",
      language: "javascript",
      code: `// LPU Clothings: LocalStorage Cart Mutation Engine
class CartController {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart_items')) || [];
  }

  addItem(product, qty = 1) {
    const existing = this.cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ ...product, qty });
    }
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }
}`,
    },
    githubUrl: "https://github.com/ThakurAnsh33",
    liveDemoUrl: "https://github.com/ThakurAnsh33",
    featured: false,
    gradient: "from-emerald-600/30 via-teal-600/20 to-blue-600/30",
  },
];

export const certifications = [
  {
    title: "AI-Driven MERN Stack Bootcamp: Full Stack Development with DevOps & Real-World Projects",
    issuer: "Lovely Professional University (Centre for Professional Enhancement)",
    date: "Jul 2026",
    credentialId: "491780",
    category: "Full Stack",
    badge: "Full Stack",
    skills: ["MERN Stack", "DevOps", "Real-World Projects", "Cloud Architecture"],
  },
  {
    title: "Full Stack Development with MERN",
    issuer: "Nasscom Foundation",
    date: "Dec 2025",
    credentialId: null,
    category: "Full Stack",
    badge: "Full Stack",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
  },
  {
    title: "Data Structure and Algorithm",
    issuer: "iamneo (NIIT Venture)",
    date: "Jun 2026",
    credentialId: "29am4c26078DN3dO7BP1",
    category: "DSA",
    badge: "DSA",
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Time Complexity"],
  },
  {
    title: "Programming in Java",
    issuer: "iamneo (NIIT Venture), in collab with LPU",
    date: "May 2026",
    credentialId: "27ck6cl6cm6b25D73BN1",
    category: "Language",
    badge: "Language",
    skills: ["Java", "OOP", "Collections", "Exception Handling"],
  },
  {
    title: "React.js",
    issuer: "Tech Veda",
    date: "Mar 2025",
    credentialId: "TV/MAR25/RJ/521",
    category: "Full Stack",
    badge: "Full Stack",
    skills: ["React Hooks", "Component Architecture", "State Management", "Routing"],
  },
  {
    title: "Introduction to Docker and Kubernetes",
    issuer: "Nasscom Foundation",
    date: "Dec 2025",
    credentialId: null,
    category: "DevOps",
    badge: "DevOps",
    skills: ["Docker", "Kubernetes", "Containerization", "Pod Orchestration"],
  },
  {
    title: "Programming using C++",
    issuer: "Infosys Springboard",
    date: "Aug 2025",
    credentialId: null,
    category: "Language",
    badge: "Language",
    skills: ["C++", "STL", "Object-Oriented Programming", "Memory Management"],
  },
  {
    title: "C Programming",
    issuer: "Coding Tantra",
    date: "Jan 2025",
    credentialId: "CT-01/2025-CP-087",
    category: "Language",
    badge: "Language",
    skills: ["C Language", "Pointers", "Memory Allocation", "Data Structures"],
  },
  {
    title: "Computer Programming",
    issuer: "iamneo (NIIT Venture), via LPU",
    date: "Jan 2025 (72-hour course)",
    credentialId: "250MBAj0ck6Cl25m9",
    category: "Language",
    badge: "Language",
    skills: ["Algorithms", "Logic Building", "Debugging", "Problem Solving"],
  },
  {
    title: "Web-A-Thon 2.0 Hackathon",
    issuer: "ARENA, LPU",
    date: "Feb 2026",
    credentialId: "0b8734d8-9388-45dd-8513-be20bc172bb6",
    category: "Hackathon",
    badge: "Hackathon",
    skills: ["24h Hackathon", "MERN Stack", "Rapid Prototyping", "Team Sprint"],
  },
  {
    title: "GenAI Fundamentals",
    issuer: "Disha AI",
    date: "Jun 2025",
    credentialId: "0827F1",
    category: "AI",
    badge: "AI",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "AI Integration"],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    period: "Aug 2024 – Present",
    score: "CGPA: 8.3 / 10.0",
    scoreType: "CGPA",
    details:
      "Specializing in Software Development and Full-Stack Web Technologies. Active member of technical clubs, hackathon contender, and mentor.",
  },
  {
    degree: "Intermediate (Class XII, PCM)",
    institution: "Maharishi Vidya Mandir",
    location: "Orai, UP",
    period: "Apr 2023 – Mar 2024",
    score: "93%",
    scoreType: "Percentage",
    details:
      "Physics, Chemistry, and Mathematics focus with strong foundation in analytical thinking and problem solving.",
  },
  {
    degree: "High School (Class X)",
    institution: "Maharishi Patanjali Vidya Mandir",
    location: "Prayagraj, UP",
    period: "Apr 2021 – Mar 2022",
    score: "90%",
    scoreType: "Percentage",
    details:
      "Graduated with distinction across Sciences, Mathematics, and Computer Applications.",
  },
];

export const changelogEntries = [
  {
    version: "v2.5.0",
    date: "Sep 2026",
    title: "Multi-Page Developer Experience & Command Palette",
    type: "Architecture",
    status: "Shipped",
    summary: "Refactored portfolio into full routed architecture with React Router v7, interactive skills matrix, case study pages, and functional terminal command palette.",
    highlights: [
      "Migrated single-page scroll to client-side routing with Framer Motion AnimatePresence transitions.",
      "Rebuilt Skills page with interactive project connection graph and tag-based query filtering.",
      "Added dynamic /projects/:slug case study routes with syntax-highlighted code snippets.",
      "Implemented comprehensive Terminal command palette supporting cd, ls, cat, theme, and sound controls."
    ]
  },
  {
    version: "v2.4.0",
    date: "Aug 2026",
    title: "Live GitHub Intelligence & REST Statistics",
    type: "Backend Integration",
    status: "Shipped",
    summary: "Engineered Express backend proxy for GitHub REST APIs with caching and real-time statistics.",
    highlights: [
      "Integrated Octokit REST queries with 15-minute in-memory caching to avoid rate-limiting.",
      "Built interactive GitHub metrics card with public repositories, total stars, and primary languages.",
      "Added tracked visitor telemetry and resume download tracking."
    ]
  },
  {
    version: "v2.2.0",
    date: "Jul 2026",
    title: "CivicPulse AI Redressal Platform",
    type: "Major Project",
    status: "Active Development",
    summary: "Developing an AI-assisted civic grievance redressal dashboard featuring sentiment & urgency NLP triage.",
    highlights: [
      "Designed MongoDB aggregation pipeline for multi-category sentiment and urgency distributions.",
      "Integrated Socket.IO for immediate dispatch alerts when critical infrastructure emergencies are flagged.",
      "Implemented role-scoped JWT authorization for municipal officers and regional supervisors."
    ]
  },
  {
    version: "v2.0.0",
    date: "Apr 2026",
    title: "PrimeBid Real-Time Auction Engine",
    type: "Production Milestone",
    status: "Shipped",
    summary: "Engineered full-stack auction marketplace with atomic concurrency controls and WebSocket live bidding.",
    highlights: [
      "Resolved race conditions in simultaneous bids via conditional atomic MongoDB update queries.",
      "Integrated Cloudinary CDN with automated client-side responsive image presets.",
      "Achieved sub-50ms WebSocket broadcast latency across multi-client bidding rooms."
    ]
  }
];

export const navLinks = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Activity", href: "/activity" },
  { name: "Changelog", href: "/changelog" },
  { name: "Contact", href: "/contact" },
];

