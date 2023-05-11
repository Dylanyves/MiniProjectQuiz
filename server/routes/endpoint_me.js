var jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    try {
        const user = req.cookies.user;
        var decoded = jwt.verify(user, "ZJGX1QL7ri6BGJWj3t");
        res.json({ success: true, message: "Invalid user", user: user });
    } catch {
        res.json({ success: false, message: "Invalid user" });
    }
};
