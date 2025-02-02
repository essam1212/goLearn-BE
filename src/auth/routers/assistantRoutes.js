import express from 'express';
import * as registerControl from '../controllers/assistantController.js'
import { validation } from '../../middleware/validation.js';
import { loginValidation, signUpValidation, updateValidation } from '../validations/assistantValidation.js';
import {  assistantAccess } from '../../middleware/authMiddleware.js';
import { upload } from '../../utils/mailer.js';

const router = express.Router();
router.post('/signup',validation(signUpValidation),upload.single(),registerControl.signup)
router.post('/login',validation(loginValidation),registerControl.login)
router.post('/forgot-password',registerControl.forgotPassword)
router.post('/reset-password/:token',registerControl.resetPassword)
router.put('/update-profile',validation(updateValidation),assistantAccess(["assistant"]),registerControl.updateProfile)
router.delete('/delete-account',assistantAccess(["assistant"]),registerControl.deleteProfile)

export default router;     