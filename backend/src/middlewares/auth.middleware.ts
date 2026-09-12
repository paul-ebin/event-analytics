import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error/UnauthorizedError";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as any;

if (!JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Access token required");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedError(
        "Invalid authorization header"
      );
    }

    const decoded = jwt.verify(
      token,
      JWT_ACCESS_SECRET
    );

    if (typeof decoded === "string") {
      throw new UnauthorizedError(
        "Invalid access token"
      );
      
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(error);
  }
}