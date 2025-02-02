import express from 'express';
import * as subject from '../controllers/subjectController.js'
import { validation } from '../../middleware/validation.js';
import { add } from '../validations/subjectValidation.js';

const router = express.Router();
router.post('/add-subject',validation(add),subject.createSubject)


export default router;   