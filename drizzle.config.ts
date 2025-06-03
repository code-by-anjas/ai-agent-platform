import config from "@/lib/config";
import { config as Config } from "dotenv";
import { defineConfig } from "drizzle-kit";

Config({ path: ".env" });

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.env.databaseUrl,
  },
});
