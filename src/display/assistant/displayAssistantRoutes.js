import express from 'express';
import * as displayControl from './displayAssistantController.js'
import { assistantAccess } from '../../middleware/authMiddleware.js';
const router = express.Router();
router.get('/all-teachers',assistantAccess(["assistant"]),displayControl.getTeachers)
router.get('/teacher/:teacherId/school-years',assistantAccess(["assistant"]),displayControl.getSchoolYears)
// router.get('/school-years/:yearId/students',assistantAccess(["assistant"]),displayControl.getStudents)
router.get('/school-year/:yearId/chapters',assistantAccess(["assistant"]),displayControl.getLessonExams)
// ====================================exam=========================================================
router.get('/exams/:examId/all-students',assistantAccess(["assistant"]),displayControl.getExamAllStudents)
router.get('/exams/:examId/student/:studentId',assistantAccess(["assistant"]),displayControl.getExamAnswer)
router.post('/exams/:examId/students/:studentId/grade',assistantAccess(["assistant"]),displayControl.grateExamAnswer)
// ====================================lesson=======================================================
router.get('/lessons/:lessonId/all-students',assistantAccess(["assistant"]),displayControl.getLessonAllStudents)
router.get('/lessons/:lessonId/student/:studentId',assistantAccess(["assistant"]),displayControl.getLessonAnswer)
router.post('/lessons/:lessonId/students/:studentId/grade',assistantAccess(["assistant"]),displayControl.grateLessonAnswer)



export default router;   