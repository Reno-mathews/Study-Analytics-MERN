module.exports = function requirePro(req, res, next) {
    if (!req.user?.isPro) {
        return res.status(403).json({
            message: "Pro subscription required"
        });
    }
    next();
}