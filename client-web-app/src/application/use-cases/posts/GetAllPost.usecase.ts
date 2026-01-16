import { Post } from "@/src/domain/entities/Post";
import { PostRepository } from "@/src/domain/repositories/PostRepository";

export class GetAllPostsUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(): Promise<Post[]> {
    return await this.repo.findAll();
  }
}
