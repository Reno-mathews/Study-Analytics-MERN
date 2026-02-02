const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ status: "ok" });
});

app.use(authRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

