import express from 'express';
import * as chapter from '../controllers/chapterController.js'
import { validation } from '../../middleware/validation.js';
import { add, update } from '../validations/chapterValidation.js';
import { teacherAccess } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add-chapter',teacherAccess(["teacher"]),validation(add),chapter.addChapter)
router.put('/update-chapter/:id',teacherAccess(["teacher"]),validation(update),chapter.updateChapter)
router.delete('/delete-chapter/:id',teacherAccess(["teacher"]),chapter.deleteChapter)


export default router;   