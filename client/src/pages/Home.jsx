import React, { useState, useEffect, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtonPrimary from "../components/ButtonPrimary";

import Axios from "../share/axios";

function Home(props) {
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState();

    useEffect(() => {
        Axios.get("/me", { withCredentials: true }).then((response) => {
            if (!response.data.success) {
                navigate("/login");
            } else {
                const _ = Axios.get("/").then((response) => {
                    setQuizzes(response.data.data.quizzes);
                });
            }
        });
    }, []);

    const inputCode = useRef();

    const submitHandle = (e) => {
        e.preventDefault();
        const path = `/quiz/${inputCode.current.value}`;
        navigate(path);
    };

    const routeChange = (id) => {
        const path = `/quiz/${id}`;
        navigate(path);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl m-auto p-6 pb-20">
                <form
                    action="submit"
                    className="mb-20 md:mb-4 grid md:grid-cols-5 md:gap-x-4"
                    onSubmit={submitHandle}
                >
                    <input
                        ref={inputCode}
                        type="text"
                        placeholder="Enter Quiz Code"
                        className="w-full md:col-span-4 text-white bg-black rounded-full mb-8 py-2 px-4 text-xl focus:border-white focus:outline-none focus:placeholder:text-white placeholder:text-gray-400"
                    />
                    <ButtonPrimary text="Enter Quiz" />
                </form>
                <div className="">
                    <h3 className="text-white text-xl mb-8">
                        Available Quizzes
                    </h3>
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
                                                <div className="text-end mb-2 space-x-2">
                                                    <i className="fa-solid fa-user text-xs text-light-gray"></i>
                                                    <p className="text-sm font-light text-light-gray inline">
                                                        {quiz.username}
                                                    </p>
                                                </div>
                                                <div className="mb-2 items-center justify-between flex">
                                                    <h4 className="text-lg font-light">
                                                        {quiz.title}
                                                    </h4>
                                                </div>
                                                <p className="font-light text-light-gray">
                                                    {quiz.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <ul className="space-x-3">
                                                    {quiz.tags.map(
                                                        (tag, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    className="inline text-sm font-light text-primary"
                                                                >
                                                                    {tag}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                                <p className="text-sm font-light">
                                                    {quiz.total_questions}{" "}
                                                    Questions
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Home;
