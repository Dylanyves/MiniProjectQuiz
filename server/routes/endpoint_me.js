var jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    const user = req.cookies.user;
    var decoded = jwt.verify(user, "ZJGX1QL7ri6BGJWj3t");
    res.json({ success: true, message: "valid user" });

    if (decoded) {
        res.json({ success: true, message: "Valid user" });
    } else {
        res.json({ success: false, message: "Invalid user" });
    }
};
