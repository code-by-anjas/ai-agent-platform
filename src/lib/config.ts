const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL as string,
    betterAuth: {
      baseUrl: process.env.BETTER_AUTH_URL as string,
    },
  },
};

export default config;
