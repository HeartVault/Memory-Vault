import { DomainError } from "../errors/Errors";

export class MediaUrl {
  private constructor(private readonly value: string) {}

  static create(url: string): MediaUrl {
    if (!url) throw new DomainError("MediaUrl cannot be empty");

    const trimmed = url.trim();

    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new DomainError("MediaUrl must be a valid URL");
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new DomainError("MediaUrl must use http or https");
    }

    return new MediaUrl(trimmed);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: MediaUrl): boolean {
    return this.value === other.value;
  }
}
