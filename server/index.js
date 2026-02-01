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
        console.error("DB ERROR: ",err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        const token = JsonWebTokenError.sign(
            { userId: result.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );
        
    }
})

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

