module.exports = async (req, res) => {
    const { quiz_id } = req.params;
    const { title } = req.body;

    const updateTitle = `UPDATE quizzes SET title = "${title}" WHERE id = ${quiz_id}`;
    connection.query(updateTitle, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.mesage });
        } else {
            res.json({ success: true, message: "Title has been updated" });
        }
    });
};
