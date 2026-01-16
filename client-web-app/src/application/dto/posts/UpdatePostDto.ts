import * as z from "zod";

export const updatePostDto = z.object({
  caption: z.string().min(1).max(2200).optional(),
  media_url: z.string().url().optional().nullable(),
    visibility: z.enum(["public", "friends", "family"]).optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear()).optional().nullable(),
    event: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
});

export type UpdatePostDto = z.infer<typeof updatePostDto>;