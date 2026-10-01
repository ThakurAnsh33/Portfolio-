import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Visit } from '../models/Visit.js';
import { ResumeDownload } from '../models/ResumeDownload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial baseline count to represent existing placement/portfolio views
const BASELINE_VISITS = 1240;

/**
 * @route   POST /api/visit
 * @desc    Record a visitor session and return total visit count
 */
export const recordVisit = async (req, res) => {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (mongoose.connection.readyState === 1) {
      // Debounce: check if same IP visited in the last 15 minutes
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const recentVisit = await Visit.findOne({
        ipAddress,
        createdAt: { $gte: fifteenMinutesAgo },
      });

      if (!recentVisit) {
        await Visit.create({
          ipAddress,
          userAgent,
        });
      }

      const totalRecorded = await Visit.countDocuments();
      const totalVisits = BASELINE_VISITS + totalRecorded;

      return res.status(200).json({
        success: true,
        count: totalVisits,
      });
    }

    // Fallback if DB is connecting
    return res.status(200).json({
      success: true,
      count: BASELINE_VISITS + 1,
    });
  } catch (error) {
    console.error('[Visit Record Error]:', error.message);
    return res.status(200).json({
      success: true,
      count: BASELINE_VISITS,
    });
  }
};

/**
 * @route   GET /api/visit
 * @desc    Get total visitor count
 */
export const getVisitCount = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalRecorded = await Visit.countDocuments();
      return res.status(200).json({
        success: true,
        count: BASELINE_VISITS + totalRecorded,
      });
    }

    return res.status(200).json({
      success: true,
      count: BASELINE_VISITS,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: BASELINE_VISITS,
    });
  }
};

/**
 * @route   GET /api/resume-download
 * @desc    Log resume download event and stream resume.pdf
 */
export const trackAndDownloadResume = async (req, res) => {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referrer = req.headers['referer'] || req.headers['referrer'] || 'direct';

    // Log to MongoDB asynchronously (non-blocking)
    if (mongoose.connection.readyState === 1) {
      ResumeDownload.create({
        ipAddress,
        userAgent,
        referrer,
      }).catch((err) => console.warn('[Resume Tracking Notice]:', err.message));
    }

    console.log(`\n📄 [Resume Download] Resume requested by recruiter from ${ipAddress}`);

    // Look for resume.pdf in client/public or client/dist
    const candidates = [
      path.resolve(__dirname, '../../../client/public/resume.pdf'),
      path.resolve(__dirname, '../../../client/dist/resume.pdf'),
      path.resolve(__dirname, '../../public/resume.pdf'),
    ];

    let resumePath = candidates.find((p) => fs.existsSync(p));

    if (!resumePath) {
      // Create minimal fallback resume if not present
      const fallbackPath = path.resolve(__dirname, '../../../client/public/resume.pdf');
      fs.mkdirSync(path.dirname(fallbackPath), { recursive: true });
      fs.writeFileSync(
        fallbackPath,
        '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n190\n%%EOF'
      );
      resumePath = fallbackPath;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Ansh_Singh_Resume.pdf"');

    const fileStream = fs.createReadStream(resumePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('[Resume Download Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to download resume file.',
    });
  }
};

