import express from "express";
import * as exam from "../controllers/examController.js"
import { teacherAccess } from "../../middleware/authMiddleware.js";
import { validation } from "../../middleware/validation.js";
import { add, update } from "../validations/examValidation.js";
const router = express.Router();

router.post("/add-exam",teacherAccess(["teacher"]),validation(add),exam.addExam);
router.put('/update-exam/:id',teacherAccess(["teacher"]),validation(update),exam.updateExam)
router.delete('/delete-exam/:id',teacherAccess(["teacher"]),exam.deleteExam)
export default router;     