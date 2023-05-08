import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

function QuizResult(props) {
    const { state } = useLocation();

    const score = Math.round((100 / state.totalQuestions) * state.totalCorrect);
    console.log(state);

    const navigate = useNavigate();
    const param = useParams();

    const restartButton = () => {
        navigate(`/${param.id}`);
    };

    const homeButton = () => {
        navigate("/");
    };

    const reviewClasses = "bg-dark-gray px-3 py-4 border-l-4 rounded-sm";
    const correctClasses = "border-tertiary-g " + reviewClasses;
    const incorrectClasses = "border-tertiary-r " + reviewClasses;

    const renderOption = (option, { userAnswer, isCorrect }) => {
        if (userAnswer == option.optionText && isCorrect) {
            return (
                <>
                    <i className="fa-regular fa-circle-dot mr-2 text-tertiary-g"></i>
                    <p className="inline text-tertiary-g">
                        {option.optionText}
                    </p>
                </>
            );
        } else if (userAnswer == option.optionText && !isCorrect) {
            return (
                <>
                    <i className="fa-regular fa-circle-dot mr-2 text-tertiary-r"></i>
                    <p className="inline text-tertiary-r">
                        {option.optionText}
                    </p>
                </>
            );
        } else if (!isCorrect && option.correct) {
            return (
                <>
                    <i className="fa-regular fa-circle mr-2 text-tertiary-g"></i>
                    <p className="inline text-tertiary-g">
                        {option.optionText}
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <i className="fa-regular fa-circle mr-2"></i>
                    <p className="inline">{option.optionText}</p>
                </>
            );
        }
    };

    return (
        <div className="max-w-4xl text-white m-auto">
            <div className="mx-6 py-8">
                <div className="pb-12 border-b border-light-gray border-opacity-30">
                    <p className="font-light text-center mb-8">Summary</p>
                    <p className="text-6xl md:text-7xl xl:text-8xl text-center ease duration-200">
                        {score}
                        <span className="text-xl font-light">%</span>
                    </p>
                    <div className="mt-6">
                        <p className="text-sm font-light mb-1">Accuracy</p>
                        <div className="w-full h-4 bg-gray rounded-sm relative">
                            <div className="absolute top-0 left-0 h-4 w-[100%] bg-primary rounded-sm"></div>
                            <div className="absolute w-6 h-6 top-[-3px] left-[95%] bg-primary rounded-sm"></div>
                        </div>
                    </div>
                    <div className="flex justify-between my-12">
                        <div className="w-[48%] border-2 border-tertiary-g rounded-sm relative text-right py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 ease duration-200">
                            <p className="text-4xl sm:text-5xl lg:text-6xl pr-5">
                                {state.totalCorrect}
                            </p>
                            <p className="font-light text-sm">Correct</p>
                            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-tr-full bg-tertiary-g"></div>
                        </div>
                        <div className="w-[48%] border-2 border-tertiary-r rounded-sm relative text-right py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 ease duration-200">
                            <p className="text-4xl sm:text-5xl lg:text-6xl pr-5">
                                {state.totalIncorrect}
                            </p>
                            <p className="font-light text-sm">Incorrect</p>
                            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-tr-full bg-tertiary-r"></div>
                        </div>
                    </div>
                    <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6">
                        <div onClick={restartButton}>
                            <ButtonPrimary text="Start Over" />
                        </div>
                        <div onClick={homeButton}>
                            <ButtonSecondary text="Back to home" />
                        </div>
                    </div>
                </div>
                <div className="pt-12">
                    <p className="font-light mb-8">Review Questions</p>
                    <div className="space-y-4">
                        {state.quiz.map((question) => {
                            return (
                                <div
                                    className={
                                        state.userAnswers[question.id].isCorrect
                                            ? correctClasses
                                            : incorrectClasses
                                    }
                                    key={question.id}
                                >
                                    <p className="font-light mb-3 border-b border-light-gray border-opacity-30 pb-3">
                                        {question.questionText}
                                    </p>
                                    <ul className="space-y-2">
                                        {question.options.map(
                                            (option, optionIndex) => {
                                                return (
                                                    <li
                                                        key={optionIndex}
                                                        className="font-light"
                                                    >
                                                        {renderOption(
                                                            option,
                                                            state.userAnswers[
                                                                question.id
                                                            ]
                                                        )}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizResult;
