module.exports = async (req, res) => {
    const { quiz_id } = req.params;
    const { title } = req.body;

    const updateTitleQuery = "UPDATE quizzes SET title = ? WHERE id = ?";
    connection.query(updateTitleQuery, [title, quiz_id], (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: "Title has been updated",
                title: title,
            });
        }
    });
};
