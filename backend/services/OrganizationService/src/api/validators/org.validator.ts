import { z } from "zod";

export const createOrganizationValidator = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Organization name must be at least 3 characters long" })
      .max(100, { message: "Organization name must be less than 100 characters" }),

    description: z
      .string()
      .max(500, { message: "Description must be less than 500 characters" })
      .optional(),
  }),
});


export type createOrganizationInput =
  z.infer<typeof createOrganizationValidator>["body"];