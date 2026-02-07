const express = require("express");
const Stripe= require("stripe");
const pool = require("../db");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch(err) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if(event.type === "checkout.session.completed") {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const customerId = session.customer;
            const

            try {
                await pool.query(
                    "UPDATE users SET is_pro = true WHERE id = $1",
                    [userId]
                );
            } catch (dbErr) {
                console.error("DB update failed:", dbErr);
            }
        }

        res.json({ received: true});
    }
);

module.exports = router;