import z from "zod";

const userSchemaBase = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const signInSchema = userSchemaBase.omit({ name: true });

export const signUpSchema = userSchemaBase.clone();

export const createUserSchema = userSchemaBase.clone();

export const editUserSchema = userSchemaBase.omit({ password: true });
