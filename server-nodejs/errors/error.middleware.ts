// src/errors/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("UNHANDLED ERROR:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
}
