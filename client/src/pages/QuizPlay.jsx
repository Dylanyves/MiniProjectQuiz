import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useNavigation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

function QuizPlay(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, settotalIncorrect] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        console.log(userAnswers);
    }, [userAnswers]);

    const questions = [
        {
            id: 1,
            questionText: "What is the capital of Japan",
            options: [
                { optionText: "Kobe", correct: false },
                { optionText: "Hiroshima", correct: false },
                { optionText: "Tokyo", correct: true },
                { optionText: "Nagasaki", correct: false },
            ],
        },
        {
            id: 2,
            questionText: "What is the capital of Indonesia",
            options: [
                { optionText: "Jakarta", correct: true },
                { optionText: "Bandung", correct: false },
                { optionText: "Surbaya", correct: false },
                { optionText: "Bali", correct: false },
            ],
        },
        {
            id: 3,
            questionText: "What is the capital of The US",
            options: [
                { optionText: "Oklahoma", correct: false },
                { optionText: "Washington", correct: true },
                { optionText: "New York", correct: false },
                { optionText: "California", correct: false },
            ],
        },
    ];

    const navigate = useNavigate();
    const currentPath = useParams();
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished) {
            const path = `/${currentPath.id}/result`;
            navigate(path, {
                state: {
                    totalQuestions: questions.length,
                    totalCorrect: totalCorrect,
                    totalIncorrect: totalIncorrect,
                    timeTaken: 6,
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
                [questionId]: { userAnswer: userAnswer, isCorrect: true },
            }));
            setTotalCorrect(totalCorrect + 1);
        } else {
            setUserAnswers((prevState) => ({
                ...prevState,
                [questionId]: { userAnswer: userAnswer, isCorrect: false },
            }));
            settotalIncorrect(totalIncorrect + 1);
        }
    };

    const handleOptionClick = (e) => {
        const nextQuestion = currentQuestion + 1;

        const answer = questions[currentQuestion].options.filter(
            (e) => e.correct === true
        )[0].optionText;

        const questionId = questions[currentQuestion].id;
        const userAnswer = e.target.textContent;

        if (nextQuestion < questions.length) {
            checkAnswer(questionId, answer, userAnswer);
            setCurrentQuestion(nextQuestion);
        } else {
            checkAnswer(questionId, answer, userAnswer);
            setFinished(true);
        }
    };

    return (
        <div>
            {finished ? null : (
                <div className="text-white text-center max-w-lg m-auto h-[38rem] relative top-10">
                    <div className="bg-dark-gray mx-4 rounded-sm p-5 h-full">
                        <div>
                            <p className="font-light text-sm mb-6">
                                {currentQuestion + 1} of {questions.length}
                            </p>
                            <h4 className="text-xl mb-16">
                                {questions[currentQuestion].questionText}
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
                                            {i.optionText}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizPlay;
