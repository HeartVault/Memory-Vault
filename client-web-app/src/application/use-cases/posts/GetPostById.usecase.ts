import { Post } from "@/src/domain/entities/Post";
import { PostRepository } from "@/src/domain/repositories/PostRepository";
import { UserId } from "@/src/domain/value-objects/UserId";

export class GetPostsByUserIdUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(userId: string): Promise<Post[]> {
    const id = UserId.create(userId);
    return await this.repo.findByUserId(id);
  }
}
