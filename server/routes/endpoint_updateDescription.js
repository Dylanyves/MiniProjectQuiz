module.exports = async (req, res) => {
    const { quiz_id } = req.params;
    const { description } = req.body;

    const updateDescription = "UPDATE quizzes SET description = ? WHERE id = ?";
    connection.query(updateDescription, [description, quiz_id], (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: "Description has been updated",
                res: description,
            });
        }
    });
};
