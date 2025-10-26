import z from "zod";

export const signUpUserValidator = z.object({
  body: z.object({
    email: z.string()
      .min(1, { message: 'Email is required' })
      .refine(
        value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
        { message: 'A valid email is required' }
      ),

    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        value => /(?=.*[A-Z])/.test(value),
        { message: 'Password must contain at least one uppercase letter' }
      )
      .refine(
        value => /(?=.*[a-z])/.test(value),
        { message: 'Password must contain at least one lowercase letter' }
      )
      .refine(
        value => /(?=.*\d)/.test(value),
        { message: 'Password must contain at least one number' }
      )
      .refine(
        value => /(?=.*[!@#$%^&*])/.test(value),
        { message: 'Password must contain at least one special character' }
      ),
  }),
});

// This is the line that creates and exports the TypeScript type
export type signUpUserInput = z.infer<typeof signUpUserValidator>["body"];    // It infers the type from the 'body' part of the schema above






export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string()
      .min(1, { message: 'Email is required' }),

    otp: z.string()
      .min(1, { message: 'OTP is required' })
      .max(6, { message: 'OTP must be 6 digits' }),
  })
})

export type verifyOtpInput = z.infer<typeof verifyOtpSchema>["body"];





export const loginValidator = z.object({
  body: z.object({
    email: z.string()
      .min(1, { message: 'Email is required' })
      .refine(
        value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
        { message: 'A valid email is required' }
      ),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        value => /(?=.*[A-Z])/.test(value),
        { message: 'Password must contain at least one uppercase letter' }
      )
      .refine(
        value => /(?=.*[a-z])/.test(value),
        { message: 'Password must contain at least one lowercase letter' }
      )
      .refine(
        value => /(?=.*\d)/.test(value),
        { message: 'Password must contain at least one number' }
      )
      .refine(
        value => /(?=.*[!@#$%^&*])/.test(value),
        { message: 'Password must contain at least one special character' }
      ),
  }),
});

export type loginInput = z.infer<typeof loginValidator>["body"];
