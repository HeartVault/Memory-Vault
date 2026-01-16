import { PostRepository } from "@/src/domain/repositories/PostRepository";
import { PostId } from "@/src/domain";
import { DomainError } from "@/src/domain/errors/Errors";

export class DeletePostUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(postId: string): Promise<void> {
    const id = PostId.create(postId);

    const exists = await this.repo.exists(id);
    if (!exists) throw new DomainError("Post not found");

    await this.repo.delete(id);
  }
}
