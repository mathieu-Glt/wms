import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pitichat";
const JWT_EXPIRES_IN = "24h";
const JWT_REFRESH_EXPIRES_IN = "7d";

export interface JwtPayload {
  userId: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function decodeToken(token: string): JwtPayload {
  return jwt.decode(token) as JwtPayload;
}
