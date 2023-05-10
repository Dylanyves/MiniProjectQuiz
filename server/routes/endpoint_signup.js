const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(password, salt);

    const now = new Date();
    const created_at = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const getQuery = `SELECT * FROM users WHERE username = "${username}"`;

    connection.query(getQuery, (err, rows) => {
        if (err) {
            res.json({ error: true, message: err.message });
        } else {
            if (rows.length == 0) {
                const postQuery = mysql.format(
                    "INSERT INTO users (username, hashed_password, created_at) VALUES (?, ?, ?)",
                    [username, hashed_password, created_at]
                );
                connection.query(postQuery, (err, rows) => {
                    if (err) {
                        res.json({ success: "false", message: err.message });
                    } else {
                        res.json({ success: true, message: "successful" });
                    }
                });
            } else {
                res.json({ error: false, message: "Username is already used" });
                console.log("Username is already used");
            }
        }
    });
};
