import express from "express";
import { teacherAccess } from "../../middleware/authMiddleware.js";
import * as displayControl from './displayTeacherController.js'

const router = express.Router();
router.get('/school-years',teacherAccess(['teacher']),displayControl.getAllYears)
router.get('/study-content/:yearId',teacherAccess(['teacher']),displayControl.getStudyContent)
router.get('/lesson-content/:lessonId',teacherAccess(['teacher']),displayControl.getLessonContent)
router.get('/exam-content/:examId',teacherAccess(['teacher']),displayControl.getExamContent)
export default router;   