import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ButtonPrimary from "../components/ButtonPrimary";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Axios from "../share/axios";

function MyQuizzes(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [quizzes, setQuizzes] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [newQuizId, setNewQuizId] = useState();

    useEffect(() => {
        Axios.get("/me", { withCredentials: true }).then((response) => {
            if (!response.data.success) {
                navigate("/login");
            } else {
                const user = JSON.parse(localStorage.getItem("user"));

                Axios.get(`/${user.id}/quizzes`).then((res) => {
                    if (res.data.success && res.data.data) {
                        setQuizzes(res.data.data.quizzes);
                    } else {
                        setIsEmpty(true);
                    }
                });
            }
        });
    }, []);

    const buttonHandle = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        Axios.post("/createQuiz", {
            data: {
                user_id: user.id,
                title: "Your quiz title here",
                description: "Your quiz description here",
                total_question: 1,
            },
        }).then((res) => {
            navigate(`/${params.username}/${res.data.quizId}/edit`);
        });
    };

    const routeChange = (id) => {
        navigate(`/${params.username}/${id}/edit`);
    };

    return (
        <>
            <Navbar />
            <div className="p-8 max-w-7xl m-auto">
                <h1 className="text-white text-3xl mb-12">My Quizzes</h1>
                {isEmpty ? (
                    <p className="text-primary">You don't have any quiz</p>
                ) : null}
                {quizzes ? (
                    <div className="text-white gap-y-14 sm:gap-x-14 grid md:grid-cols-2 xl:grid-cols-3">
                        {quizzes.map((quiz, index) => {
                            return (
                                <div
                                    key={quiz.id}
                                    onClick={(e) => routeChange(quiz.id)}
                                    className="h-full w-full m-auto border-b cursor-pointer pb-4 border-gray-500 hover:border-white duration-200"
                                >
                                    <div>
                                        <div className="mb-4">
                                            <div className="mb-2">
                                                <h4 className="text-xl font-light">
                                                    {quiz.title}
                                                </h4>
                                            </div>
                                            <p className="font-light text-light-gray">
                                                {quiz.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <ul className="space-x-3">
                                                {quiz.tags.map((tag, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className="inline text-sm font-light text-primary"
                                                        >
                                                            {tag}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <p className="text-sm font-light">
                                                {quiz.total_questions} Questions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <div onClick={buttonHandle} className="mt-12">
                    <ButtonPrimary text="Create Quiz" />
                </div>
            </div>
        </>
    );
}

export default MyQuizzes;
