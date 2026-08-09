import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as any;

if (!JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
}

export function generateAccessToken(userId: string) {
    return jwt.sign(
        {
            userId,
        },
        JWT_ACCESS_SECRET,
        {
            expiresIn: "15m",
        }
    );


}
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as any;

if (!JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
}

export function generateRefreshToken(userId: string) {
    return jwt.sign(
        {
            userId,
        },
        JWT_REFRESH_SECRET,
        {
            expiresIn: "30d",
        }
    );
}

export function verifyRefreshToken(
  token: string
): JwtPayload {
  const decoded = jwt.verify(
    token,
    JWT_REFRESH_SECRET
  );

  if (typeof decoded === "string") {
    throw new Error("Invalid refresh token");
  }

  return decoded as JwtPayload;
}