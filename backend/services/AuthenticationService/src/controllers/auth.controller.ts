import { Request, Response } from "express";
import { getHealthStatus, requestSignUpOTPService } from "../services/auth.service";



export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};


export const requestSignUpOTPServiceController = async (req: Request, res: Response) => {
    try {
        const result = await requestSignUpOTPService(req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

