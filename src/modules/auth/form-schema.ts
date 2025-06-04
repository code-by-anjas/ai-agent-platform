import { z } from "zod";

export const formSchemaSignUp = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const formSchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const defaultValueSignIn = {
  email: "",
  password: "",
};

export const defaultValueSignUp = {
  name: "",
  email: "",
  password: "",
};
