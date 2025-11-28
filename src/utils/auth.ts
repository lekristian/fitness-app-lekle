import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateEnv } from "../configs/env.config";

const env = validateEnv();

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(env?.BCRYPT_ROUNDS || 12);
  return bcrypt.hash(password, salt);
}

export const signJwt = (
  object: object,
  signKey: string,
  options?: jwt.SignOptions | undefined
) =>
  jwt.sign(object, signKey, {
    ...(options && options),
  });
