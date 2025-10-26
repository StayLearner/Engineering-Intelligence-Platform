import { z } from 'zod';

export const sendOtpEmailSchema = z.object({
  body: z.object({
    email: z.string()
      .min(1, { message: 'Email is required' })
      .refine(
        value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
        { message: 'A valid email is required' }
      ),
     otp: z.string()
      .min(1, { message: 'OTP is required' })
      .max(6, { message: 'OTP must be 6 digits' }),
  }),
});

export type SendOtpEmailInput = z.infer<typeof sendOtpEmailSchema>['body'];