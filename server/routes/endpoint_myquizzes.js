const getQuiz = require("../functions/getQuiz");

module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const type = 3;

        const data = await getQuiz(type, userId);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message,
        });
    }
};
