const getQuiz = require("../functions/getQuiz");

module.exports = async (req, res) => {
    try {
        const type = 1;
        const data = await getQuiz(1);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};
