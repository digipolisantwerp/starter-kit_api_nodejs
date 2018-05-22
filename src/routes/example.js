import express from 'express';
import {
  getExample,
  getExamples,
} from '../controllers/examples';

const router = new express.Router();

router.get('/:exampleId', getExample);
router.get('/', getExamples);

export default router;
