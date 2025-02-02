import express from 'express';
import * as registerControl from '../controllers/teacherController.js'
import { validation } from '../../middleware/validation.js';
import { loginValidation, signUpValidation, updateValidation } from '../validations/teacherValidation.js';
import {  teacherAccess } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.post('/signup',validation(signUpValidation),registerControl.signup)
router.post('/login',validation(loginValidation),registerControl.login)
router.post('/forgot-password',registerControl.forgotPassword)
router.post('/reset-password/:token',registerControl.resetPassword)
router.put('/update-profile',validation(updateValidation),teacherAccess(["teacher"]),registerControl.updateProfile)
router.delete('/delete-profile',teacherAccess(["teacher"]),registerControl.deleteProfile)

export default router;     