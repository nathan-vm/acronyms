import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    verify(token, "secret");

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT Token", 401);
  }
}
