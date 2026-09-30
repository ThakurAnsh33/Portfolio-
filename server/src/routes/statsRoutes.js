import express from 'express';
import { getGitHubStats } from '../controllers/githubController.js';
import { recordVisit, getVisitCount, trackAndDownloadResume } from '../controllers/statsController.js';

const router = express.Router();

// Live GitHub statistics
router.get('/github-stats', getGitHubStats);

// Visitor counter
router.post('/visit', recordVisit);
router.get('/visit', getVisitCount);

// Tracked resume download
router.get('/resume-download', trackAndDownloadResume);

export default router;

