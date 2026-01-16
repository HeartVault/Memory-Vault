import { DomainError } from "../errors/Errors";

export class Year {
  private constructor(private readonly value: number) {}

  static create(year: number): Year {
    if (year === null || year === undefined)
      throw new DomainError("Year cannot be empty");

    if (!Number.isInteger(year)) {
      throw new DomainError("Year must be an integer");
    }

    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear) {
      throw new DomainError(`Year must be between 1900 and ${currentYear}`);
    }

    return new Year(year);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Year): boolean {
    return this.value === other.value;
  }
}
