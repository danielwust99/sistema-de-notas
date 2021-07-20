require("dotenv").config();

export const type = process.env.DB_TYPE;
export const host = process.env.DB_HOST;
export const port = process.env.DB_PORT;
export const username = process.env.DB_USER;
export const password = process.env.DB_PASSWORD;
export const database = process.env.DB_DATABASE;
export const synchronize = false;
export const logging = false;
export const entities = ["./src/core/data/database/entities/**/*"];
export const cli = {
  entitiesDir: "./src/core/data/database/entities",
  migrationsDir: "./src/core/data/database/migrations"
};
export const migrations = ["./src/core/data/database/migrations/**/*"];
export const extra = {
  ssl: {
    rejectUnauthorized: false,
  },
};
