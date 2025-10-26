import express, { Request, Response } from 'express';
import { validate } from '../../middlewares/validate';
import { getHealthController, logInUserServiceController, logOutUserServiceController, refreshAccessTokenController, requestSignUpOTPServiceController, verifyOtpServiceController } from '../../controllers/auth.controller';
import { loginValidator, signUpUserValidator, verifyOtpSchema } from '../validators/user.validator';
import { requireAuth } from '../../middlewares/requireAuth';



const router = express.Router();


router.get('/', getHealthController);
router.post('/signup', validate(signUpUserValidator), requestSignUpOTPServiceController)
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpServiceController)
router.post('/login', validate(loginValidator), logInUserServiceController)
router.post('/refresh-token',refreshAccessTokenController);
router.post('/logout', logOutUserServiceController);










router.get(
  '/test-protected',
  requireAuth, 
  (req: Request, res: Response) => {
    (res as Response<any, Record<string, any>>).status(200).json({
      message: 'Access granted!',
      user: req.user, 
    });
  }
);


export default router;