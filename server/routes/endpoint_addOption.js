module.exports = async (req, res) => {
    const { quiz_id, question_id, text } = req.body.data;

    const query =
        "INSERT INTO options (quiz_id, question_id, text, correct) VALUES (?, ?, ?, ?)";

    connection.query(query, [quiz_id, question_id, text, 0], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            const newOption = {
                id: result.insertId,
                quiz_id: quiz_id,
                question_id: question_id,
                text: text,
                correct: 0,
            };

            res.json({
                success: true,
                message: "New option has been added!",
                question_id: question_id,
                newOption: newOption,
            });
        }
    });
};
