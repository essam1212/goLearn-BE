import express from 'express';
import * as lesson from '../controllers/lessonController.js'
import { validation } from '../../middleware/validation.js';
import { teacherAccess } from '../../middleware/authMiddleware.js';
import { add, update } from '../validations/lessonValidation.js';
import { upload } from '../../utils/mailer.js';

const router = express.Router();

router.post('/add-lesson',teacherAccess(["teacher"]),validation(add), upload.fields([
    { name: 'lessonPicture', maxCount: 1 },
    { name: 'pdfLink', maxCount: 1},
]),lesson.addLesson)
router.put('/update-lesson/:id',teacherAccess(["teacher"]),validation(update), upload.fields([
    { name: 'lessonPicture', maxCount: 1 },
    { name: 'pdfLink', maxCount: 1},
]),lesson.updateLesson)
router.delete('/delete-lesson/:id',teacherAccess(["teacher"]),lesson.deleteLesson)


export default router;    