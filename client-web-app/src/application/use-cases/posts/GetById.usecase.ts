import { Post } from "@/src/domain/entities/Post";
import { PostRepository } from "@/src/domain/repositories/PostRepository";
import { PostId } from "@/src/domain/";

export class GetPostByIdUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(postId: string): Promise<Post | null> {
    const id = PostId.create(postId);
    return await this.repo.findById(id);
  }
}
