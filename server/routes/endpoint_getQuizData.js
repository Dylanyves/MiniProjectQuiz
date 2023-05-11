module.exports = async (req, res) => {
    const { quiz_id } = req.params;

    const getQuestions = `SELECT * FROM questions WHERE quiz_id = ${quiz_id}`;

    connection.query(getQuestions, (errQ, rowsQ) => {
        if (errQ) {
            res.json({ success: false, data: null, message: errQ.message });
        } else {
            const getOptions = `SELECT * FROM options WHERE quiz_id = ${quiz_id}`;

            connection.query(getOptions, (errO, rowsO) => {
                if (errO) {
                    res.json({
                        success: false,
                        data: null,
                        message: errO.message,
                    });
                } else {
                    const modList = rowsQ.map((question) => {
                        const options = rowsO.filter(
                            (option) => option.question_id === question.id
                        );
                        return {
                            id: question.id,
                            quiz_id: question.quiz_id,
                            text: question.text,
                            options: options,
                        };
                    });
                    res.json(modList);
                }
            });
        }
    });
};
