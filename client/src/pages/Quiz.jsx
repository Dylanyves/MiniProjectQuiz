import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import Axios from "../share/axios";
import ReactLoading from "react-loading";

// import ButtonPrimary from "../components/ButtonPrimary";

function Quiz(props) {
    const navigate = useNavigate();
    const currentPath = useParams();

    const [quiz, setQuiz] = useState();
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    const routeChange = () => {
        const path = `/quiz/${currentPath.id}/play`;
        navigate(path);
    };

    const navigateHome = () => {
        navigate("/");
    };

    useEffect(() => {
        Axios.get("/me", { withCredentials: true }).then((response) => {
            if (!response.data.success) {
                navigate("/login");
            } else {
                setTimeout(() => {
                    Axios.get(`/quiz/${currentPath.id}`).then((res) => {
                        if (res.data.data) {
                            setLoading(false);
                            setFound(true);
                            setQuiz(res.data.data.quizzes[0]);
                        } else {
                            setLoading(false);
                        }
                    });
                }, 1500);
            }
        });
    }, []);

    const renderBody = () => {
        if (!loading && found) {
            return (
                <div className="p-5 py-7 mx-4 bg-dark-gray text-white rounded-md">
                    <h1 className="text-xl mb-2">{quiz.title}</h1>
                    <p className="font-light text-light-dark-gray mb-4">
                        {quiz.description}
                    </p>
                    <ul className="space-x-3 mb-4">
                        {quiz.tags.map((tag, key) => {
                            return (
                                <li
                                    key={key}
                                    className="inline text-sm font-light text-primary"
                                >
                                    {tag}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center space-x-2 mb-4">
                        <i className="fa-solid fa-user text-xs"></i>
                        <p className="text-sm font-light">{quiz.username}</p>
                    </div>
                    <p className="text-sm font-light text-right mb-16">
                        {quiz.total_questions} Questions
                    </p>
                    <div onClick={routeChange}>
                        <ButtonPrimary text="Start Quiz" />
                    </div>
                </div>
            );
        } else if (!loading && !found) {
            return (
                <div className="text-white text-center ">
                    <p className="text-7xl font-bold pt-20 mb-4 text-primary">
                        Error
                    </p>
                    <p className="font-light mb-20">
                        Cannot find quiz. Probably invalid code
                    </p>
                    <div onClick={navigateHome}>
                        <ButtonPrimary text="Return to home" />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="max-w-md m-auto relative top-16">
            {renderBody()}
            {loading ? (
                <div className="relative top-32 left-[30%] ">
                    <ReactLoading type="bubbles" color="#C13DFF" width="30%" />
                </div>
            ) : null}
        </div>
    );
}

export default Quiz;
