import { Post } from "@/src/domain/entities/Post";
import { PostRepository } from "@/src/domain/repositories/PostRepository";
import {
  Caption,
  MediaUrl,
  Visibility,
  Year,
  PostType,
  UserId,
} from "@/src/domain/value-objects";
import { PostId } from "@/src/domain/value-objects/";
import { DomainError } from "@/src/domain/errors/Errors";
import { UpdatePostDto } from "../../dto/posts/UpdatePostDto";

export class UpdatePostUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(postId: string, dto: UpdatePostDto): Promise<Post> {
    const id = PostId.create(postId);

    const existing = await this.repo.findById(id);
    if (!existing) throw new DomainError("Post not found");


    const updated = Post.create({
      post_id: PostId.create(existing.post_id),
      user_id: UserId.create(existing.user_id),
      caption: dto.caption
        ? Caption.create(dto.caption)
        : Caption.create(existing.caption),
      type:  PostType.create(existing.type),
      visibility: dto.visibility
        ? Visibility.create(dto.visibility)
        : Visibility.create(existing.visibility),

      media_url:
        dto.media_url !== undefined
          ? dto.media_url
            ? MediaUrl.create(dto.media_url)
            : null
          : existing.media_url
            ? MediaUrl.create(existing.media_url)
            : null,

      year:
        dto.year !== undefined
          ? dto.year
            ? Year.create(dto.year)
            : null
          : existing.year
            ? Year.create(existing.year)
            : null,

      event: dto.event ?? existing.event,
      location: dto.location ?? existing.location,
      created_at: existing.created_at,
    });

   
    await this.repo.save(updated);

    return updated;
  }
}
