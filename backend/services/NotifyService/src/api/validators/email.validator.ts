import { z } from 'zod';

export const sendOtpEmailSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'A valid email is required' }),
    otp: z.string().min(6, { message: 'OTP must be 6 characters' }),
  }),
});

export type SendOtpEmailInput = z.infer<typeof sendOtpEmailSchema>['body'];