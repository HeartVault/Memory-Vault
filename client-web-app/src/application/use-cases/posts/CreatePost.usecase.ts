import { PostRepository } from "@/src/domain/repositories/PostRepository";

import { Post } from "@/src/domain/entities/Post";
import {
  Caption,
  PostId,
  UserId,
  MediaUrl,
  Year,
  Visibility,
  PostType,
} from "@/src/domain";

import { CreatePostDto } from "../../dto/posts/CreatePostDto";

export class CreatePostUseCases {
  constructor(private readonly repo: PostRepository) {}

  async execute(dto: CreatePostDto): Promise<Post> {
    const post = Post.create({
      post_id: PostId.create(crypto.randomUUID()),
      user_id: UserId.create(dto.user_id),
      caption: Caption.create(dto.caption),
      type: PostType.create(dto.type),
      visibility: Visibility.create(dto.visibility),
      media_url: dto.media_url ? MediaUrl.create(dto.media_url) : null,
      event: dto.event ?? null,
      location: dto.location ?? null,
      year: dto.year ? Year.create(dto.year) : null,
      created_at: new Date(),
    });

    await this.repo.save(post);

    return post;
  }
}
