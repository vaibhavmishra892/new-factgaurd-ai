
import express from 'express';
import { verifyClaim, getHistory } from '../controllers/verifyController.js';

const router = express.Router();

router.post('/verify', verifyClaim);
router.get('/history', getHistory);

export default router;
