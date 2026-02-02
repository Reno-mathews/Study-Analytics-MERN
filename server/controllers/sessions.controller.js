const { pool } = require("../db");

// GET /sessions
// GET all sessions for logged-in user

exports.getSessions = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            "SELECT * FROM study_sessions WHERE user_id = $1 ORDER BY created_at DESC",
        [userID]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch sessions" });
    }
};

// POST /sessions 
// Create new session

exports.createSession = async (req, res) => {
    const { subject, duration, session_date } = req.body;
    const userId = req.user.userId;

    if (!subject || !duration || !session_date) {
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        const result = await pool.query()
    }
}