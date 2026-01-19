import { Caption, MediaUrl, PostId, UserId, Visibility, Year, PostType as posttype } from "../value-objects";

export type TPostType = {
  post_id: PostId;
  user_id: UserId;
  caption: Caption;
  created_at: Date;
  type: posttype;
  media_url?: MediaUrl[] | null;
  event?: string | null;
  location?: string | null;
  year?: Year | null;
  visibility: Visibility;
};

export class Post {
  private constructor(private readonly props: TPostType) {}

    static create(props: TPostType): Post {
    return new Post(props);
  }

  get post_id() {
    return this.props.post_id.getValue();
  }

  get user_id() {
    return this.props.user_id.getValue();
  }

  get caption() {
    return this.props.caption.getValue();
  }

  get created_at() {
    return this.props.created_at;
  }

  get type() {
    return this.props.type.getValue();
  }

  get media_url() {
    return this.props.media_url?.map(url => url.getValue())|| null;
  }

  get event() {
    return this.props.event;
  }

  get location() {
    return this.props.location;
  }

  get year() {
    return this.props.year?.getValue() || null;
  }

  get visibility() {
    return this.props.visibility.getValue();
  }
}
