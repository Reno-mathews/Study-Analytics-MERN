const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const authMiddleware = require("./middleware/auth.middleware");

const sessionsRoutes = require("./routes/sessions.routes");

const PORT = process.env.PORT || 5000;
app.use("/stripe", require("./routes/stripe.webhook"));

app.use(cors());
app.use(express.json());
app.use("/sessions", sessionsRoutes);

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

app.use("/billing", require("./routes/billing.routes"));

app.listen(PORT, () => {
    console.log("Server running on http://localhost:5000");
});

