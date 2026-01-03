import { AuthError, DomainError, NotFoundError, UnauthorizedError, ValidationError } from "@/src/domain/errors/Errors";

export function toHttpError(error: unknown) {
  if (error instanceof UnauthorizedError) return { status: 401, body: { error: error.message } };
  if (error instanceof NotFoundError) return { status: 404, body: { error: error.message } };
  if (error instanceof ValidationError) return { status: 400, body: { error: error.message } };
  if (error instanceof DomainError) return { status: 400, body: { error: error.message } };
  if(error instanceof AuthError) return {status: 400, body: {error:error.message}}
  return { status: 500, body: { error: "Internal Server Error" } };
}
