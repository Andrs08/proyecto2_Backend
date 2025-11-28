import jwt from "jsonwebtoken";

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1m" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
