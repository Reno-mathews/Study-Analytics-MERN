const express = require("express");
const cors = require("cors");
const { pool } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ status: "ok" });
});

// Test DB connection
app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

