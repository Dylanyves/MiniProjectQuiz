var jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var getquery = mysql.format("SELECT * FROM users WHERE username = ?", [
        username,
    ]);

    connection.query(getquery, async (err, rows) => {
        if (err) {
            res.json({ error: true, message: err.message });
        } else {
            if (rows.length != 0) {
                const hp = rows[0].hashed_password;
                const valid = await bcrypt.compare(password, hp);

                if (valid) {
                    const token = jwt.sign(
                        {
                            userId: rows[0].id,
                        },
                        "ZJGX1QL7ri6BGJWj3t",
                        { expiresIn: "1h" }
                    );
                    res.cookie("user", token);
                    res.json({
                        success: true,
                        message: "Login credential is correct",
                        data: rows[0],
                    });
                } else {
                    res.json({ success: false, message: "Invalid password" });
                }
            } else {
                res.json({ success: false, message: "User does not exist" });
            }
        }
    });
};
