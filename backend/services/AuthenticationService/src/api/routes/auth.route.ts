import express from 'express';
import { validate } from '../../middlewares/validate';
import { getHealthController, requestSignUpOTPServiceController } from '../../controllers/auth.controller';
import { signUpUserValidator } from '../validators/user.validator';



const router = express.Router();


router.get('/', getHealthController);
router.post('/signup', validate(signUpUserValidator), requestSignUpOTPServiceController)


export default router;


