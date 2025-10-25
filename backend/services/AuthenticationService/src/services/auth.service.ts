import prisma from "../utils/databaseConnection";
import bcrypt from "bcryptjs";
import { signUpUserInput, verifyOtpInput, loginValidator, loginInput } from "../api/validators/user.validator";
import { sendOtpViaRpc } from "../clients/notification.client";
import { createAccessToken, createRefreshToken} from '../utils/jwt';


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



export const logInUserService = async(input: loginInput) =>{
  const {email, password} = input;

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  
  if(!user){
    throw new Error('User does not exist');
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new Error('Wrong Password Entered');
  }


    const accessToken = createAccessToken({ userId: user.id });
    const refreshToken = createRefreshToken({ userId: user.id });


    try {
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  // Always create a new record for this login session
  await prisma.refreshToken.create({
    data: {
      hashedToken: hashedRefreshToken, 
      userId: user.id,
    },
  });

} catch (error) {
  console.error('Error saving refresh token:', error);
  throw new Error('Could not save session. Please try again.');
}

    return { accessToken, refreshToken };
}