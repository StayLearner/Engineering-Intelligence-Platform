import { Request, Response } from "express";
import { getHealthStatus, logInUserService, logOutUserService, refreshAccessTokenService, requestSignUpOTPService, verifyOtpService } from "../services/auth.service";
import { loginInput, signUpUserInput, verifyOtpInput } from "../api/validators/user.validator";



export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};


export const requestSignUpOTPServiceController = async (req: Request<{},{},signUpUserInput>, res: Response) => {
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
        
        res.cookie('refreshToken', token.refreshToken, { 
            httpOnly: true, 
            sameSite: 'strict',    // Helps prevent CSRF attacks 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).json({message:"User has been logged in successfully", accessToken:token.accessToken}); //in body only accessToken is sent
    } catch (error:any) {
      console.error("Internal Server Error", error.message);
      return res.status(401).json({message:"Invalid Credentials", error:error.message});   
    }
}


export const refreshAccessTokenController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken; 
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided.' });
  }

  try {
    const result = await refreshAccessTokenService(refreshToken);

    return res.status(200).json({message:'Refreshed Access Token', result});

  } catch (error: any) {
    return res.status(403).json({ message: error.message || 'Invalid refresh token.' }); 
  }
};


export const logOutUserServiceController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken; 

  res.clearCookie(
      'refreshToken',
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      }
    );

  if (!refreshToken) {
    return res.status(401).json({ message: 'Already logged out.' });
  }

  try {
    const result = await logOutUserService(refreshToken);
    return res.status(200).json({message:'Logged out successfully', result});
  } catch (error: any) {
    console.error("Logout service error:", error.message);
    return res.status(200).json({ message: 'Logout successful' });

  } 
};