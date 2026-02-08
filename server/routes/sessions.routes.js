const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
    getSessions,
    createSession,
} = require("../controllers/sessions.controller");

router.get("/", auth, getSessions);
router.post("/", auth, createSession);

module.exports = router;




