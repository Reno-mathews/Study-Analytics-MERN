const express = require("express");
const Stripe= require("stripe");
const { pool } = require("../db");

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

            if (!session.metadata?.userId) {
                console.warn("Missing userId metadata");
                return res.json({ received: true });
            }

            const userId = session.metadata.userId;
            const customerId = session.customer;
            const subscriptionId = session.subscription;

            console.log("SESSION METADATA:", session.metadata);

            try {
                await pool.query(
                    `UPDATE users SET 
                                    is_pro = true,
                                    stripe_customer_id =$1, 
                                    stripe_subscription_id = $2
                                WHERE id = $3
                    `,
                    [customerId, subscriptionId, userId]
                );
            } catch (dbErr) {
                console.error("DB update failed:", dbErr);
            }
        }

        if (event.type === "customer.subscription.deleted") {
            try {
                const subscription = event.data.object;

            await pool.query(
                `UPDATE users
                SET is_pro = false
                WHERE stripe_subscription_id = $1
                `,
                [subscription.id]
            );
        } catch (err) {
            console.error("Subscription delete DB error:", err);
        }
        }

        res.json({ received: true});
    }
);

module.exports = router;
