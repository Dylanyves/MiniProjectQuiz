const getQuiz = async (type, id) => {
    return new Promise((resolve, reject) => {
        let getQuery;
        type;
        if (type === 1) {
            getQuery = `SELECT quizzes.id, quizzes.user_id, quizzes.description, quizzes.title, quizzes.total_questions, users.username
            FROM quizzes 
            JOIN users ON quizzes.user_id = users.id`;
        } else if (type === 2) {
            getQuery = `SELECT quizzes.id, quizzes.user_id, quizzes.description, quizzes.title, quizzes.total_questions, users.username
            FROM quizzes 
            JOIN users ON quizzes.user_id = users.id WHERE quizzes.id = ${id}`;
        } else if (type === 3) {
            getQuery = `SELECT quizzes.id, quizzes.user_id, quizzes.description, quizzes.title, quizzes.total_questions, users.username
            FROM quizzes 
            JOIN users ON quizzes.user_id = users.id WHERE quizzes.user_id = ${id}`;
        }

        connection.query(getQuery, (err, rows) => {
            if (err) {
                reject({ success: false, data: null, message: err.message });
            } else if (rows == 0) {
                resolve({
                    success: true,
                    data: null,
                    message: "There is no data",
                });
            } else {
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
