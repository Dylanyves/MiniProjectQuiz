module.exports = async (req, res) => {
    const { total_questions, quiz_id } = req.body.data;

    const query = "UPDATE quizzes SET total_questions = ? WHERE id = ?";
    connection.query(query, [total_questions, quiz_id], (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: "Total questions has been updated",
            });
        }
    });
};
