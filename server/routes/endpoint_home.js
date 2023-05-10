const getQuiz = require("../functions/getQuiz");

module.exports = async (req, res) => {
    try {
        const data = await getQuiz("all");
        res.json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};
