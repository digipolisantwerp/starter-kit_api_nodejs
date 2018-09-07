import express from 'express';
import example from './example';

const router = express.Router();

router.use('/api/examples', example);

export default router;
