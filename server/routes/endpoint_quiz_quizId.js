const getQuiz = require("../functions/getQuiz");

module.exports = async (req, res) => {
    try {
        const { quiz_id } = req.params;

        const data = await getQuiz(quiz_id);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};
