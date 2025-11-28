import { z } from "zod";
import { EXERCISE_DIFFICULTY } from "../../types/exercise/enums";

export const createExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    difficulty: z.enum(EXERCISE_DIFFICULTY, {
      message: "Invalid difficulty level",
    }),
    programID: z.coerce
      .number()
      .int()
      .positive("Program ID must be a positive integer"),
  }),
});

export const updateExerciseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    difficulty: z
      .enum(EXERCISE_DIFFICULTY, {
        message: "Invalid difficulty level",
      })
      .optional(),
    programID: z.coerce
      .number()
      .int()
      .positive("Program ID must be a positive integer")
      .optional(),
  }),
});

export const deleteExerciseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
});
