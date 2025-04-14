import express from 'express';
import * as registerControl from '../controllers/studentController.js'
import { validation } from '../../middleware/validation.js';
import { loginValidation, signUpValidation, updateValidation } from '../validations/studentValidation.js';
import { studentAccess } from '../../middleware/authMiddleware.js';
import { upload } from '../../utils/mailer.js';

const router = express.Router();
router.post('/signup',upload.single("profilePicture"),registerControl.signup)
router.get('/verify-email/:token',registerControl.confirmEmail)
router.post('/login',validation(loginValidation),registerControl.login)
router.post('/forgot-password',registerControl.forgotPassword)
router.post('/reset-password/:token',registerControl.resetPassword)
router.put('/update-profile',validation(updateValidation),studentAccess(["student"]),registerControl.updateProfile)
router.delete('/delete-account',studentAccess(["student"]),registerControl.deleteProfile)

export default router;     