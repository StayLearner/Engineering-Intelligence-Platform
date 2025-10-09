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
      .min(8, 'Password must be at least 8 characters long'),
  }),
});


// This is the line that creates and exports the TypeScript type
export type signUpUserInput = z.infer<typeof signUpUserValidator>["body"];    // It infers the type from the 'body' part of the schema above


