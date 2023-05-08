const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = 5000;

app.use(cors());

const connection = mysql.createConnection({
    host: "server2.bsthun.com",
    port: "6105",
    user: "lab_7witp",
    password: "Z25ML7qJAosXGt0s",
    database: "lab_blank01_73zxme",
});

connection.connect(() => {
    console.log("Database is connected");
});

app.use(bodyParser.json({ type: "application/json" }));

app.post("/signup", async (req, res) => {
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
            }
        }
    });
});

app.post("/login", (req, res) => {
    if (req.body) {
        return res.json({
            success: true,
            data: req.body,
        });
    } else {
        return res.json({ success: false, data: null });
    }
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log("App is running at port " + port);
});
