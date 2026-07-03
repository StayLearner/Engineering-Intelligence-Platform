import express  from "express";
import { getHealthController, sendOtpEmailController } from "../../controllers/email.controller";
import { validate } from "@engineering/shared";
import { sendOtpEmailSchema } from "../validators/email.validator";




const router = express.Router();

router.get('/health', getHealthController);
router.post('/email-otp', validate(sendOtpEmailSchema),sendOtpEmailController);

export default router;