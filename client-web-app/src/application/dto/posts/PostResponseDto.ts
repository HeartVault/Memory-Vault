import * as z from "zod";

export const postResponseDto = z.object({
  post_id: z.string(),
  user_id: z.string(),
  type: z.enum(["moment", "memory"]),
  caption: z.string().min(1).max(2200),
  media_url: z.string().url().nullable().optional(),
  visibility: z.enum(["public", "friends", "family"]),
  year: z.number().int().min(1900).max(new Date().getFullYear()).nullable(),
  event: z.string().nullable(),
  location: z.string().nullable(),
  created_at: z.string(),
});

export type PostResponseDto = z.infer<typeof postResponseDto>;
