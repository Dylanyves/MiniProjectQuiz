import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import Axios from "../share/axios";

function Quiz(props) {
    const navigate = useNavigate();
    const currentPath = useParams();

    const routeChange = () => {
        const path = `/${currentPath.id}/play`;
        navigate(path);
    };
    useEffect(() => {
        console.log("rendered");
        Axios.get(`/quiz/${currentPath.id}`).then((res) => console.log(res));
    }, []);

    return (
        <div className="max-w-md m-auto relative top-16">
            <div className="p-5 py-7 mx-4 bg-dark-gray text-white rounded-md">
                <h1 className="text-xl mb-2">Guess the Capital City</h1>
                <p className="font-light text-light-dark-gray mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Qui, dolor officia? Laboriosam ipsum ea, natus,
                    necessitatibus hic quae ducimus earum asperiores est at
                    laborum numquam aperiam alias qui error eius? Nesciunt rerum
                    quas temporibus voluptatum quidem aspernatur, cum
                    exercitationem possimus.
                </p>
                <ul className="space-x-3 mb-4">
                    <li className="inline text-sm font-light text-primary">
                        General
                    </li>
                    <li className="inline text-sm font-light text-primary">
                        Geography
                    </li>
                </ul>
                <div className="flex items-center space-x-2 mb-4">
                    <i className="fa-solid fa-user text-xs"></i>
                    <p className="text-sm font-light">Barbara Oakley</p>
                </div>
                <p className="text-sm font-light text-right mb-16">
                    10 Questions
                </p>
                <div onClick={routeChange}>
                    <ButtonPrimary text="Start Quiz" />
                </div>
            </div>
        </div>
    );
}

export default Quiz;
