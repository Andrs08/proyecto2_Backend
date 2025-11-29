import { Request, Response, NextFunction } from "express";

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {

    const user = req.authUser;

    if (!user) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    if (!user.permissions.includes(permission)) {
      return res.status(403).json({
        error: "No tienes permisos suficientes."
      });
    }

    next();
  };
}
