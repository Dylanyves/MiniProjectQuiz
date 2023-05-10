// Import
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Database Connection
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
global.connection = connection;

// Create express app
const app = express();
const port = 5000;

var corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/json" }));

// Routes
app.post("/signup", require("./routes/endpoint_signup"));
app.post("/login", require("./routes/endpoint_login"));
app.get("/quiz/:quiz_id", require("./routes/endpoint_quiz_quizId"));
app.get("/me", require("./routes/endpoint_me"));
app.get("/", require("./routes/endpoint_home"));

app.listen(port, () => {
    console.log("App is running at port " + port);
});
