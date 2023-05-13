module.exports = async (req, res) => {
    const { quiz_id } = req.body.data;
    const defaultText = "Your question";
    let newQuestionId; // To store the generated question_id

    const insertQuestionQuery =
        "INSERT INTO questions (quiz_id, text) VALUES (?, ?)";
    const insertOptionQuery =
        "INSERT INTO options (quiz_id, question_id, text, correct) VALUES (?, ?, ?, ?)";

    // Insert into the questions table
    connection.query(
        insertQuestionQuery,
        [quiz_id, defaultText],
        (err, questionResult) => {
            if (err) {
                res.json({ success: false, message: err.message });
            } else {
                newQuestionId = questionResult.insertId; // Store the generated question_id

                // Insert into the options table with the foreign key
                connection.query(
                    insertOptionQuery,
                    [quiz_id, newQuestionId, "Option 1", true],
                    (optionErr, optionResult) => {
                        if (optionErr) {
                            res.json({
                                success: false,
                                message: optionErr.message,
                            });
                        } else {
                            const newQuestion = {
                                id: newQuestionId,
                                quiz_id: quiz_id,
                                text: defaultText,
                            };

                            const newOption = {
                                id: optionResult.insertId,
                                quiz_id: quiz_id,
                                question_id: newQuestionId,
                                text: "Option 1",
                                correct: true,
                            };

                            res.json({
                                success: true,
                                message:
                                    "New question and option have been added!",
                                newQuestion: newQuestion,
                                newOption: newOption,
                            });
                        }
                    }
                );
            }
        }
    );
};
