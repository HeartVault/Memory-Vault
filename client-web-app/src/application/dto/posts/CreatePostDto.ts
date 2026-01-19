import * as z from "zod";

export const createPostDto = z.object({
  user_id: z.string().uuid(),
  caption: z.string().min(1).max(2200),
  type: z.enum(["moment", "memory"]),
  media_url: z.array(z.string().url()),
  visibility: z.enum(["public", "friends", "family"]),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional().nullable(),
  event: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});

export type CreatePostDto = z.infer<typeof createPostDto>;
