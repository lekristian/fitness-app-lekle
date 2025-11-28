import { z } from "zod";

export const getProgramByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
});

export const createProgramSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
  }),
});

export const updateProgramSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
  }),
});

export const deleteProgramSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  }),
});

export const addExerciseToProgramSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Program ID must be a valid number"),
  }),
  body: z.object({
    exerciseId: z.coerce
      .number()
      .int()
      .positive("Exercise ID must be a positive integer"),
  }),
});

export const removeExerciseFromProgramSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Program ID must be a valid number"),
    exerciseId: z.string().regex(/^\d+$/, "Exercise ID must be a valid number"),
  }),
});
