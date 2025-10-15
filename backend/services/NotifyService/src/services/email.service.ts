import nodemailer from 'nodemailer';
import { SendOtpEmailInput } from '../api/validators/email.validator';



export const getHealthStatus = () => {
    return {
        status: "Up",
        message: "Email Service is Healthy and Running"
    };
};



const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
//   secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,    
    pass: process.env.BREVO_SMTP_KEY,     
  },
});



export const sendOtpEmailService = async (input:SendOtpEmailInput) => {
   const { email, otp } = input;
  


  const mailOptions = {
    from: `"Coding Platform" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: 'Your Verification Code for registartion',
    html: `
      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Verification</title>
      </head>
      <body
        style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #43cea2, #185a9d); text-align: center;"
      >
        <div
          style="max-width: 600px; background: #ffffff; margin: 40px auto; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); overflow: hidden;"
        >
          <div style="background: linear-gradient(135deg, #185a9d, #43cea2); padding: 25px;">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWd0Y2JxYzF3ZHN4am9jaGxoaWx0ZGE1OWd3NnQ1aGtvbW45N3ptdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif"
              alt="Email Verification"
              style="width: 120px; border-radius: 50%; margin-bottom: 10px;"
            />
            <h2 style="color: #fff; margin: 0;">Email Verification</h2>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 18px; color: #333;">
              Hi <b>${email}</b>,
            </p>
            <p style="font-size: 16px; color: #555;">
              Here is your One-Time Password (OTP) to complete your registration:
            </p>
            <p
              style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #185a9d; margin: 25px 0;"
            >
              ${otp}
            </p>
            <p style="color: #777; font-size: 15px;">This code will expire in 2 minutes.</p>

            <div
              style="margin-top: 30px; padding: 15px; background: #e9f9f3; border-radius: 10px; color: #333;"
            >
              If you didn’t request this, you can safely ignore this email.
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true ,message: 'OTP email sent successfully' };
  } catch (error) {
    throw new Error('Failed to send email. Please try again later.');
  }
};