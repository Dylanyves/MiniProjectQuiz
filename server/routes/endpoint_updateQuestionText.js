module.exports = async (req, res) => {
    const { quiz_id, question_id, newText } = req.body.data;

    const updateQuestion = `UPDATE questions SET text = "${newText}" WHERE id = ${question_id} AND quiz_id = ${quiz_id}`;

    connection.query(updateQuestion, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: "Question text has been updated",
            });
        }
    });
};
