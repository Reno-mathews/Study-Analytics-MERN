const express = require("express");
const Stripe = require("stripe");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
    "/create-checkout-session",
    authMiddleware,
    async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: process.env.STRIPE_PRICE_ID,
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.CLIENT_URL}/upgrade-success`,
                cancel_url: `${process.env.CLIENT_URL}/upgrade`,
                metadata: {
                    userId: req.user.userId,
                }
            });

            res.json({ url: session.url });
        } catch (err) {
            console.error("Stripe error:", err);
            res.status(500).json({ error: "Failed to create checkout session" });
        }
    }
);

module.exports = router;