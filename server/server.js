const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const authMiddleware = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ status: "ok" });
});

app.use(authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated",
        userId: req.userId,
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

