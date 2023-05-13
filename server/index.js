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
app.post("/addTag", require("./routes/endpoint_addTag"));
app.post("/addQuestion", require("./routes/endpoint_addQuestion"));
app.post("/addOption", require("./routes/endpoint_addOption"));
app.post("/createQuiz", require("./routes/endpoint_createQuiz"));

app.get("/quiz/:quiz_id", require("./routes/endpoint_quiz_quizId"));
app.get("/getQuizData/:quiz_id", require("./routes/endpoint_getQuizData"));
app.get("/:userId/quizzes", require("./routes/endpoint_myquizzes"));
app.get("/me", require("./routes/endpoint_me"));
app.get("/", require("./routes/endpoint_home"));

app.patch("/updateTitle/:quiz_id", require("./routes/endpoint_updateTitle"));
app.patch(
    "/updateDescription/:quiz_id",
    require("./routes/endpoint_updateDescription")
);
app.patch(
    "/updateQuestionText",
    require("./routes/endpoint_updateQuestionText")
);
app.patch("/updateOptionText", require("./routes/endpoint_updateOptionText"));
app.patch(
    "/updateOptionBoolean",
    require("./routes/endpoint_updateOptionBoolean")
);

app.delete("/deleteQuestion", require("./routes/endpoint_deleteQuestion"));
app.delete("/deleteOption", require("./routes/endpoint_deleteOption"));
app.delete("/deleteTag", require("./routes/endpoint_deleteTag"));
app.delete("/deleteQuiz", require("./routes/endpoint_deleteQuiz"));

app.listen(port, () => {
    console.log("App is running at port " + port);
});
