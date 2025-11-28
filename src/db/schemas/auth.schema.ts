import { z } from "zod";
import { USER_ROLE } from "../models/user";

export const loginUserSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const getUserByEmailSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
});

export const registerUserSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    surname: z
      .string()
      .min(2, "Surname must be at least 2 characters")
      .optional(),
    nickName: z
      .string()
      .min(3, "Nickname must be at least 3 characters")
      .optional(),
    age: z.number().optional(),
    role: z.enum(USER_ROLE).default(USER_ROLE.USER),
  }),
});
