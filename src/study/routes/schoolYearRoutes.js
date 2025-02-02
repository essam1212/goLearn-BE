import express from 'express';
import * as SchoolYearControl from '../controllers/schoolYearController.js'
import { validation } from '../../middleware/validation.js';
import { add,update } from '../validations/schoolYearValidation.js';

const router = express.Router();
router.post('/add-year',validation(add),SchoolYearControl.addYear)
router.put('/update-year/:id',validation(update),SchoolYearControl.updateYear)


export default router;   