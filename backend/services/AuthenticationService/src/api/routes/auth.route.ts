import express from 'express';
import { validate } from '../../middlewares/validate';
import { getHealthController, requestSignUpOTPServiceController, verifyOtpServiceController } from '../../controllers/auth.controller';
import { signUpUserValidator, verifyOtpSchema } from '../validators/user.validator';



const router = express.Router();


router.get('/', getHealthController);
router.post('/signup', validate(signUpUserValidator), requestSignUpOTPServiceController)
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpServiceController)

export default router;


