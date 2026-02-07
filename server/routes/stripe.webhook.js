const express = require("express");
const Stripe= require("stripe");
const pool = require("../db");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    
)