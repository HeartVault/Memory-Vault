import { Post } from "@/src/domain/entities/Post";
import { PostId, UserId, Caption, MediaUrl, PostType, Visibility, Year } from "@/src/domain";
import { PostResponseDto } from "../dto/posts/PostResponseDto";

export type PostRow = {
    post_id:string;
    user_id:string;
    caption:string;
    media_url:string | null;
    type:string;
    visibility:string;
    location:string | null;
    event:string | null;
    year:number | null;
    created_at:string;
}


export class PostMapper {

    static toDomain(row :PostRow) : Post {
        return Post.create({
            post_id: PostId.create(row.post_id),
            user_id: UserId.create(row.user_id),
            caption: Caption.create(row.caption),
            media_url: row.media_url ? MediaUrl.create(row.media_url) : null,
            type: PostType.create(row.type),
            visibility: Visibility.create(row.visibility),
            location: row.location,
            event: row.event,
            year: row.year ? Year.create(row.year) : null,
            created_at: new Date(row.created_at),
           
        })

    }


    static toPersistence(post: Post) : PostRow {
        return{
            post_id: post.post_id,
            user_id: post.user_id,
            caption: post.caption,
            media_url: post.media_url ? post.media_url : null,
            type: post.type,
            visibility: post.visibility,
            location:post.location ? post.location : null,
            event: post.event ? post.event : null,
            year: post.year ? post.year : null,
            created_at: post.created_at.toISOString(),
        }
    }

    static toResponseDto(post: Post) : PostResponseDto {
        return {
            post_id: post.post_id,
            user_id: post.user_id,
            caption: post.caption,
            media_url: post.media_url ? post.media_url : null,
            type: post.type,
            visibility: post.visibility,
            location:post.location ? post.location : null,
            event: post.event ? post.event : null,
            year: post.year ? post.year : null,
            created_at: post.created_at.toISOString(),
          
        }
    }



}