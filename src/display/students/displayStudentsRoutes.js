import express from 'express';
import * as displayControl from './displayStudentsController.js'
import { studentAccess } from '../../middleware/authMiddleware.js';
const router = express.Router();
router.get('/all-subjects',studentAccess(["student"]),displayControl.allSubjects)
router.get('/all-subjects/:subjectId/all-teachers',studentAccess(["student"]),displayControl.allTeachers)
router.get('/subjectContent/:subjectId',studentAccess(["student"]),displayControl.gitSubjectContent)
router.get('/git-lesson/:lessonId',studentAccess(["student"]),displayControl.gitLesson)
router.get('/git-exam/:examId',studentAccess(["student"]),displayControl.gitExam)
// router.post('/submitLesson/:lessonId',studentAccess(["student"]),displayControl.lessonAnswer)
router.post('/submitExam/:examId',studentAccess(["student"]),displayControl.examAnswer)
export default router;   