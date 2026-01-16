import { Post } from "../entities/Post";
import { PostId, UserId } from "../value-objects";

export interface PostRepository {
  save(post: Post): Promise<void>;

  findById(id: PostId): Promise<Post | null>;

  findAll(): Promise<Post[]>;

  findByUserId(userId: UserId): Promise<Post[]>;

  delete(id: PostId): Promise<void>;

  exists(id: PostId): Promise<boolean>;
}
