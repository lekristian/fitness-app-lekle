import { z } from "zod";
import { USER_ROLE } from "../models/user";

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    surname: z
      .string()
      .min(2, "Surname must be at least 2 characters")
      .optional(),
    nickName: z
      .string()
      .min(3, "Nickname must be at least 3 characters")
      .optional(),
    email: z.email("Invalid email address").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    age: z.number().int().positive("Age must be a positive integer").optional(),
    role: z
      .enum(USER_ROLE, {
        message: "Invalid role",
      })
      .optional(),
  }),
});
