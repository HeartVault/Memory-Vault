import { createSupabaseServer } from "../supabase";
import { PostRepository } from "@/src/domain";
import { PostMapper, PostRow } from "@/src/application";
import { DomainError } from "@/src/domain";
import { PostId, UserId } from "@/src/domain";
import { Post } from "@/src/domain";

export class SupabasePostRepository  implements PostRepository {
  private readonly table = "post";

  async save(post: Post): Promise<void> {
    const supabase = await createSupabaseServer();

    const payload = PostMapper.toPersistence(post);

    const { error } = await supabase.from(this.table).upsert(payload,{onConflict:'post_id'});

    if (error) {
      throw new DomainError(error.message);
    }
  }

  async findById(id: PostId): Promise<Post | null> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("post_id", id.getValue())
      .maybeSingle();

    if (error) {
      throw new DomainError(error.message);
    }
    if (!data) return null;

    return PostMapper.toDomain(data as PostRow);
  }

  async findAll(): Promise<Post[]> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.from(this.table).select("*").order('created_at', {ascending:false})
    if (error) {
      throw new DomainError(error.message);
    }

    return (data ?? []).map((row) => PostMapper.toDomain(row as PostRow));
  }

  async findByUserId(userId: UserId): Promise<Post[]> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("user_id", userId.getValue()).order('created_at', {ascending:false});
    if (error) {
      throw new DomainError(error.message);
    }

    return (data ?? []).map((row) => PostMapper.toDomain(row as PostRow));
  }

  async delete(id: PostId): Promise<void> {
    const supabase = await createSupabaseServer();

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq("post_id", id.getValue());

    if (error) throw new DomainError(error.message);
  }

  async exists(id: PostId): Promise<boolean> {
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
      .from(this.table)
      .select("post_id")
      .eq("post_id", id.getValue()).maybeSingle();
    if (error) throw new DomainError(error.message);

    return !!data;
  }
}
