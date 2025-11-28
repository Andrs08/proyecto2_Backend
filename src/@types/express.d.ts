import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    authUser?: {
      id: string;
      email: string;
      permissions: string[];
    };
  }
}
