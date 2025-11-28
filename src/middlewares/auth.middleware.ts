import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Formato de autorización inválido." });
  }

  try {
    const payload = verifyToken(token) as {
      id: string;
      email: string;
      permissions: string[];
    };

    req.authUser = {
      id: payload.id,
      email: payload.email,
      permissions: payload.permissions,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}

