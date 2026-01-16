import { DomainError } from "../errors/Errors";

export type TVisibility = "public" | "friends" | "family";

export class Visibility {
  private constructor(private readonly value: TVisibility) {}

  static create(visibility: string): Visibility {
    if (visibility !== "public" && visibility !== "friends" && visibility !== "family") {
      throw new DomainError("Invalid Visibility");
    }
    return new Visibility(visibility);
  }

  getValue(): TVisibility {
    return this.value;
  }

  equals(other: Visibility): boolean {
    return this.value === other.value;
  }
}
