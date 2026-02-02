const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
            [email, hashedPassword]
        );

        const token = jwt.sign(
            { userId: result.rows[0].id },
            process.env.JWT_SECRET,
            { expires: "7d"}
        );

        res.status(201).json({ token });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "Email already exists "});
        }
        console.error(err);
        res.status(500).json({ error: "Signup failed" });
    }
};