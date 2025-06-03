import { createAuthClient } from "better-auth/react";
import config from "./config";

export const authClient = createAuthClient({
  baseURL: config.env.betterAuth.baseUrl,
});
