import bcrypt from "bcryptjs";

export function encrypt(password: string) {
  return bcrypt.hash(password, 10);
}

export function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
