module.exports = async (req, res) => {
    const { quiz_id } = req.params;

    //Get quiz information
    const getQuiz = `SELECT * FROM quizzes WHERE id = ${quiz_id}`;
    connection.query(getQuiz, (errorQuiz, rowsQuiz) => {
        if (errorQuiz) {
            res.json({
                success: false,
                data: null,
                message: errorQuestions.message,
            });
        } else {
            //Get tags
            const getTags = `SELECT * FROM tags WHERE quiz_id = ${quiz_id}`;
            connection.query(getTags, (errorTags, rowsTags) => {
                if (errorTags) {
                    res.json({
                        success: false,
                        data: null,
                        message: errorQuestions.message,
                    });
                } else {
                    //Get questions
                    const getQuestions = `SELECT * FROM questions WHERE quiz_id = ${quiz_id}`;
                    connection.query(
                        getQuestions,
                        (errorQuestions, rowsQuestions) => {
                            if (errorQuestions) {
                                res.json({
                                    success: false,
                                    data: null,
                                    message: errorQuestions.message,
                                });
                            } else {
                                //Get options
                                const getOptions = `SELECT * FROM options WHERE quiz_id = ${quiz_id}`;
                                connection.query(
                                    getOptions,
                                    (errorOptions, rowsOptions) => {
                                        if (errorOptions) {
                                            res.json({
                                                success: false,
                                                data: null,
                                                message: errorOptions.message,
                                            });
                                        } else {
                                            const modList = rowsQuestions.map(
                                                (question) => {
                                                    const options =
                                                        rowsOptions.filter(
                                                            (option) =>
                                                                option.question_id ===
                                                                question.id
                                                        );
                                                    return {
                                                        id: question.id,
                                                        quiz_id:
                                                            question.quiz_id,
                                                        text: question.text,
                                                        options: options,
                                                    };
                                                }
                                            );
                                            res.json({
                                                ...rowsQuiz[0],
                                                tags: rowsTags,
                                                questions: modList,
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
    });
};
