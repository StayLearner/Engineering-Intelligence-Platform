import { Request, Response } from "express";
import { getHealthStatus, logInUserService, requestSignUpOTPService, verifyOtpService } from "../services/auth.service";
import { loginInput, verifyOtpInput } from "../api/validators/user.validator";



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


export const verifyOtpServiceController = async (req: Request<{},{},verifyOtpInput>, res: Response) => {
 try {
    const user= await verifyOtpService(req.body);
    return res.status(200).json({message:"User has been verified and created successfully", user});
 } catch (error:any) {
    if(error.message.includes("Invalid") || error.message.includes("expired"))
      return res.status(400).json({ error: error.message });
    else
      return res.status(500).json({message:"Internal Server Error"});
 }   
}


export const logInUserServiceController = async (req: Request<{}, {}, loginInput>, res: Response)=> {
    try {
        const token = await logInUserService(req.body);
        return res.status(200).json({message:"User has been logged in successfully", token});
    } catch (error:any) {
      console.error("Internal Server Error", error.message);
      return res.status(401).json({message:"Invalid Credentials", error:error.message});   
    }
}