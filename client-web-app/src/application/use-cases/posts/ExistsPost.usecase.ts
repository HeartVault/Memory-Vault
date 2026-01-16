import { PostRepository } from "@/src/domain/repositories/PostRepository";
import { PostId } from "@/src/domain/";

export class ExistsPostUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(postId: string): Promise<boolean> {
    const id = PostId.create(postId);
    return await this.repo.exists(id);
  }
}
