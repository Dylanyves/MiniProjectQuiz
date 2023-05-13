module.exports = async (req, res) => {
    const { question_id, option_id } = req.body;

    const deleteOption = `DELETE FROM options WHERE question_id = ${question_id} AND id = ${option_id}`;

    connection.query(deleteOption, (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({ success: true, message: "Option has been deleted" });
        }
    });
};
