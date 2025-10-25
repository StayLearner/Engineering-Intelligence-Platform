import express from 'express';
import { validate } from '../../middlewares/validate';
import { getHealthController, logInUserServiceController, logOutUserServiceController, refreshAccessTokenController, requestSignUpOTPServiceController, verifyOtpServiceController } from '../../controllers/auth.controller';
import { loginValidator, signUpUserValidator, verifyOtpSchema } from '../validators/user.validator';



const router = express.Router();


router.get('/', getHealthController);
router.post('/signup', validate(signUpUserValidator), requestSignUpOTPServiceController)
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpServiceController)
router.post('/login', validate(loginValidator), logInUserServiceController)
router.post('/refresh-token',refreshAccessTokenController);
router.post('/logout', logOutUserServiceController);





export default router;