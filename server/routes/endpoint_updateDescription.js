module.exports = async (req, res) => {
    const { quiz_id } = req.params;
    const { description } = req.body;

    const updateTitle = `UPDATE quizzes SET description = "${description}" WHERE id = ${quiz_id}`;
    connection.query(updateTitle, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.mesage });
        } else {
            res.json({
                success: true,
                message: "Description has been updated",
            });
        }
    });
};
