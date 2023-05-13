module.exports = async (req, res) => {
    const { question_id, option_id, newText } = req.body.data;

    const updateOption = `UPDATE options SET text = "${newText}" WHERE question_id = ${question_id} AND id = ${option_id}`;
    connection.query(updateOption, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({
                success: true,
                message: "Option text has been updated",
            });
        }
    });
};
