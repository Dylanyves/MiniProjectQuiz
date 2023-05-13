module.exports = async (req, res) => {
    const { quiz_id } = req.body;

    const deleteTagsQuery = "DELETE FROM tags WHERE quiz_id = ?";

    connection.query(deleteTagsQuery, [quiz_id], (err, result1) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            const deleteOptionsQuery = "DELETE FROM options WHERE quiz_id = ?";
            connection.query(deleteOptionsQuery, [quiz_id], (err1, result2) => {
                if (err1) {
                    res.json({ success: false, message: err1.message });
                } else {
                    const deleteQuestionsQuery =
                        "DELETE FROM questions WHERE quiz_id = ?";
                    connection.query(
                        deleteQuestionsQuery,
                        [quiz_id],
                        (err2, result3) => {
                            if (err2) {
                                res.json({
                                    success: false,
                                    message: err2.message,
                                });
                            } else {
                                const deleteQuizQuery =
                                    "DELETE FROM quizzes WHERE id = ?";
                                connection.query(
                                    deleteQuizQuery,
                                    [quiz_id],
                                    (err3, result4) => {
                                        if (err3) {
                                            res.json({
                                                success: false,
                                                message: err3.message,
                                            });
                                        } else {
                                            res.json({
                                                success: true,
                                                message:
                                                    "Quiz has been successfully deleted",
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
