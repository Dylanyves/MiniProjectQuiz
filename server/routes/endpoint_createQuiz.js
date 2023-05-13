module.exports = async (req, res) => {
    const { user_id, title, description, total_question } = req.body.data;

    const createQuiz = `
        INSERT INTO quizzes (user_id, title, description, total_questions)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        createQuiz,
        [user_id, title, description, total_question],
        (err, result) => {
            if (err) {
                res.json({ success: false, message: err.message });
            } else {
                const newQuizId = result.insertId;
                const createTag = `INSERT INTO tags (quiz_id, text) VALUES (?, ?)`;
                connection.query(createTag, [newQuizId, "Tag"], (et, etr) => {
                    if (et) {
                        res.json({ success: false, message: et.message });
                    } else {
                        const createQuestion = `INSERT INTO questions (quiz_id, text) VALUES (?, ?)`;
                        connection.query(
                            createQuestion,
                            [newQuizId, "Your question"],
                            (eq, eqr) => {
                                if (eq) {
                                    res.json({
                                        success: false,
                                        message: eq.message,
                                    });
                                } else {
                                    const newQuestionId = eqr.insertId;
                                    const createOption = `INSERT INTO options (quiz_id, question_id, text, correct) VALUES (?, ?, ?, ?)`;
                                    connection.query(
                                        createOption,
                                        [
                                            newQuizId,
                                            newQuestionId,
                                            "Option 1",
                                            1,
                                        ],
                                        (eo, eor) => {
                                            if (eo) {
                                                res.json({
                                                    success: false,
                                                    message: eo.message,
                                                });
                                            } else {
                                                res.json({
                                                    success: true,
                                                    message:
                                                        "Quiz has been created",
                                                    quizId: newQuizId,
                                                });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            }
        }
    );
};
