import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signUpUserInput } from "../api/validators/user.validator";



export const getHealthStatus = () => {
    return {
        status: "Up",
        message: "Auth Service is Healthy and Running"
    };
};




const prisma = new PrismaClient();

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

  return { message: 'OTP has been sent to your email :) ' };
}