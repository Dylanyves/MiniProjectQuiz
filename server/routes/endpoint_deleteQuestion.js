module.exports = async (req, res) => {
    const { quiz_id, question_id } = req.body;

    const deleteOption =
        "DELETE FROM options WHERE quiz_id = ? AND question_id = ?";
    const deleteQuestion = "DELETE FROM questions WHERE id = ?";

    // Delete the corresponding options
    connection.query(
        deleteOption,
        [quiz_id, question_id],
        (optionErr, optionRows) => {
            if (optionErr) {
                res.json({ success: false, message: optionErr.message });
            } else {
                // Delete the question
                connection.query(
                    deleteQuestion,
                    [question_id],
                    (err, questionRows) => {
                        if (err) {
                            res.json({ success: false, message: err.message });
                        } else {
                            res.json({
                                success: true,
                                message:
                                    "Question and corresponding options have been deleted",
                            });
                        }
                    }
                );
            }
        }
    );
};
