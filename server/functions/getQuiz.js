const getQuiz = async (quiz_id) => {
    return new Promise((resolve, reject) => {
        let getQuery;

        if (quiz_id === "all") {
            getQuery = `SELECT quizzes.id, quizzes.user_id, quizzes.description, quizzes.title, quizzes.total_questions, users.username
            FROM quizzes 
            JOIN users ON quizzes.user_id = users.id`;
        } else {
            getQuery = `SELECT quizzes.id, quizzes.user_id, quizzes.description, quizzes.title, quizzes.total_questions, users.username
            FROM quizzes 
            JOIN users ON quizzes.user_id = users.id WHERE quizzes.id = ${quiz_id}`;
        }

        connection.query(getQuery, (err, rows) => {
            if (err) {
                reject({ success: false, data: null, message: err.message });
            } else {
                console.log(rows);
                const getTags = `SELECT * FROM tags`;

                connection.query(getTags, (error, tags) => {
                    if (error) {
                        reject({
                            success: false,
                            data: null,
                            message: error.message,
                        });
                    } else {
                        const quizzes = rows.map((quiz) => {
                            const keys = tags
                                .filter((tag) => tag.quiz_id === quiz.id)
                                .map((tag) => tag.text);
                            return { ...quiz, tags: keys };
                        });

                        resolve({ success: true, data: { quizzes } });
                    }
                });
            }
        });
    });
};

module.exports = getQuiz;
