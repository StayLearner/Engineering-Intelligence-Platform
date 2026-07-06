import { z } from "zod";

export const createRepositoryInput = z.object({
  body: z.object({
    organizationId: z
      .string()
      .min(1, "Organization ID is required"),

    name: z
      .string()
      .trim()
      .min(3, "Repository name must be at least 3 characters")
      .max(100, "Repository name cannot exceed 100 characters"),

    owner: z
      .string()
      .trim()
      .min(1, "Repository owner is required")
      .max(100, "Repository owner cannot exceed 100 characters"),

    githubUrl: z
      .string()
      .trim()
      .url("Invalid GitHub repository URL")
      .refine(
        (url) =>
          /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(url),
        {
          message:
            "Repository URL must be a valid GitHub repository URL",
        }
      ),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
  }),
});


export type CreateRepositoryInput = z.infer<typeof createRepositoryInput>["body"];