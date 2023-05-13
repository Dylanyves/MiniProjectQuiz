const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(password, salt);

    const now = new Date();
    const created_at = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const getQuery = `SELECT * FROM users WHERE username = "${username}"`;

    connection.query(getQuery, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            if (rows.length === 0) {
                const postQuery = mysql.format(
                    "INSERT INTO users (username, hashed_password, created_at) VALUES (?, ?, ?)",
                    [username, hashed_password, created_at]
                );
                connection.query(postQuery, (err2, result) => {
                    if (err2) {
                        res.json({ success: false, message: err2.message });
                    } else {
                        const getUser = mysql.format(
                            "SELECT * FROM users WHERE username = ?",
                            [username]
                        );

                        connection.query(
                            getUser,
                            [result.insertId],
                            (err3, result1) => {
                                if (err3) {
                                    res.json({
                                        success: false,
                                        message: err3.message,
                                    });
                                } else {
                                    const token = jwt.sign(
                                        {
                                            userId: result1[0].id,
                                        },
                                        "ZJGX1QL7ri6BGJWj3t",
                                        { expiresIn: "24h" }
                                    );
                                    res.cookie("user", token, {
                                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                                        // Add more options if needed (e.g., secure: true for HTTPS)
                                    });
                                    res.json({
                                        success: true,
                                        message:
                                            "Register credential is correct",
                                        data: result1[0],
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: "Username is already used",
                });
                console.log("Username is already used");
            }
        }
    });
};
