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