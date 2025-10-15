import { Request, Response } from "express";
import { getHealthStatus, sendOtpEmailService } from "../services/email.service";
import { SendOtpEmailInput } from "../api/validators/email.validator";


export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};


export const sendOtpEmailController = async (
  req: Request<{}, {}, SendOtpEmailInput>,
  res: Response
) => {
  try {
    const result = await sendOtpEmailService(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};