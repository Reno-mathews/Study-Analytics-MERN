import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "study_analytics",
    password: "YOUR_PASSWORD",
    port: 5432,
});
