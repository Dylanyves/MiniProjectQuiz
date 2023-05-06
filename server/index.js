const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/api", (req, res) => {
    // res.json({ foo: "bar" });
    res.send("hey");
});

app.get("/quiz/:id", (req, res) => {
    res.json(req.params.id);
});

app.listen(port, () => {
    console.log("App is running at port " + port);
});
