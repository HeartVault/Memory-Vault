import { DomainError } from "../../errors/Errors";

type TPostType = "moment" | "memory";

export class PostType {
  private constructor(private readonly value: TPostType) {}

  static create(type: string): PostType {
    if (type !== "moment" && type !== "memory") {
      throw new DomainError("Invalid PostType");
    }

    return new PostType(type);
  }

  getValue(): TPostType {
    return this.value;
  }

  equals(other: PostType): boolean {
    return this.value === other.value;
  }
}
