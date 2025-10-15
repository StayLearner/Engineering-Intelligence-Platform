import prisma from "../utils/databaseConnection";
import bcrypt from "bcryptjs";
import { signUpUserInput, verifyOtpInput } from "../api/validators/user.validator";
import { sendOtpViaRpc } from "../clients/notification.client";



export const getHealthStatus = () => {
    return {
        status: "Up",
        message: "Auth Service is Healthy and Running"
    };
};




const generatedOTP= () =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const requestSignUpOTPService = async (input: signUpUserInput) => {
 
 const { email, password } = input;

  // verified user with this email already exists or not
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('A user with this email is already registered.');
  }
    
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generatedOTP();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now


  await prisma.verification.upsert({
    where: { email },
    create: { email, hashedPassword, otp, expiresAt },
    update: { hashedPassword, otp, expiresAt },
  });   

   sendOtpViaRpc(email, otp); 
  return { message: 'OTP has been sent to your email :) ' };
}



export const verifyOtpService = async(input: verifyOtpInput) =>{

  const { email, otp } = input;

  const verifyOtp= await prisma.verification.findUnique({ where: { email } });

  if (!verifyOtp || verifyOtp.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  if (verifyOtp.expiresAt < new Date()) {
    throw new Error('OTP has expired');
  }

  await prisma.verification.delete({ where: { email } });   // Delete the temporary verification record
  

  const user = await prisma.user.create({
    data: { email, password: verifyOtp.hashedPassword },
  });
  
  return { message: 'User has been created successfully' };
}