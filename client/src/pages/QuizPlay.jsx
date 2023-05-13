import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useNavigation } from "react-router-dom";

import "../../src/index.css";

import Axios from "../share/axios";

function QuizPlay(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, settotalIncorrect] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    const navigate = useNavigate();
    const currentPath = useParams();
    const [finished, setFinished] = useState(false);

    const [questions, setQuestions] = useState();

    useEffect(() => {
        Axios.get("/me", { withCredentials: true }).then((response) => {
            if (!response.data.success) {
                navigate("/login");
            } else {
                Axios.get(`/getQuizData/${currentPath.id}`).then((res) => {
                    setQuestions(res.data.questions);
                });
            }
        });
    }, []);

    useEffect(() => {
        if (finished) {
            const path = `/quiz/${currentPath.id}/result`;
            navigate(path, {
                state: {
                    totalQuestions: questions.length,
                    totalCorrect: totalCorrect,
                    totalIncorrect: totalIncorrect,
                    userAnswers: userAnswers,
                    quiz: questions,
                },
            });
        }
    }, [finished]);

    const checkAnswer = (questionId, answer, userAnswer) => {
        if (userAnswer === answer) {
            setUserAnswers((prevState) => ({
                ...prevState,
                [questionId]: { userAnswer: userAnswer, correct: true },
            }));
            setTotalCorrect(totalCorrect + 1);
        } else {
            setUserAnswers((prevState) => ({
                ...prevState,
                [questionId]: { userAnswer: userAnswer, correct: false },
            }));
            settotalIncorrect(totalIncorrect + 1);
        }
    };

    const handleOptionClick = (e) => {
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            const answer = questions[currentQuestion].options.filter(
                (e) => e.correct === 1
            )[0].text;

            const questionId = questions[currentQuestion].id;
            const userAnswer = e.target.textContent;

            if (nextQuestion < questions.length) {
                checkAnswer(questionId, answer, userAnswer);
                setCurrentQuestion(nextQuestion);
            } else {
                checkAnswer(questionId, answer, userAnswer);
                setFinished(true);
            }
        }, 0);
    };

    return (
        <div>
            {finished ? null : (
                <div className="text-white text-center max-w-lg m-auto h-[38rem] relative top-10">
                    {questions ? (
                        <div
                            key={currentQuestion}
                            className="bg-dark-gray mx-4 rounded-sm p-5 h-full card-animation"
                        >
                            <div>
                                <p className="font-light text-sm mb-6">
                                    {currentQuestion + 1} of {questions.length}
                                </p>
                                <h4 className="text-xl mb-16">
                                    {questions[currentQuestion].text}
                                </h4>
                            </div>
                            <ul className="space-y-4">
                                {questions[currentQuestion].options.map(
                                    (i, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={(e) =>
                                                    handleOptionClick(e)
                                                }
                                                className="text-primary border-2 border-primary rounded-full py-2 cursor-pointer hover:bg-primary hover:text-white ease duration-200"
                                            >
                                                {i.text}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default QuizPlay;
