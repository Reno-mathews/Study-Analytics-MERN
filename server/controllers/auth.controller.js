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
            { 
                userId: result.rows[0].id,
            isPro: false
        },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
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

// Login

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        // Find user
        const result = await pool.query(
            "SELECT id, password, is_pro FROM users WHERE email = $1",
            [email]
        );
    if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Comapre password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create token

    const token = jwt.sign(
        { userId: user.id, 
            isPro: user.is_pro
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    // Return token
    res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
};