import React from "react";
import Navbar from "../components/Navbar";
import ButtonPrimary from "../components/ButtonPrimary";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function MyQuizzes(props) {
    const items = [
        {
            id: "f2adfl9nqfeijf",
            name: "Barbara Oakley",
            title: "Guess The Capital City",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ut expedita autem dicta praesentium libero earum soluta aut non. Laudantium sit corporis, numquam tempora necessitatibus qui quisquam fuga sapiente pariatur.",
            tags: ["General", "Geography"],
            numOfQuestions: 10,
        },
        {
            id: "po4nadfdobqfnbi4",
            name: "Kimberley Brehm",
            title: "Basic 10th Grade Math",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ut expedita autem dicta praesentium libero earum soluta aut non. Laudantium sit corporis, numquam tempora necessitatibus qui quisquam fuga sapiente pariatur.",
            tags: ["Logic", "Math"],
            numOfQuestions: 15,
        },
        {
            id: "iooaadfibnefnbkd",
            name: "Mike Tyson",
            title: "Everything About Boxing Knowledge",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ut expedita autem dicta praesentium libero earum soluta aut non. Laudantium sit corporis, numquam tempora necessitatibus qui quisquam fuga sapiente pariatur.",
            tags: ["Sports", "Boxing"],
            numOfQuestions: 20,
        },
    ];

    const navigate = useNavigate();
    const params = useParams();

    const routeChange = (id) => {
        navigate(`/${params.username}/${id}/edit`);
    };

    const buttonHandle = () => {
        navigate(`${params.username}/asdf/edit`);
    };

    return (
        <>
            <Navbar />
            <div className="p-8 max-w-7xl m-auto">
                <h1 className="text-white text-3xl mb-12">My Quizzes</h1>
                <div className="text-white gap-y-14 sm:gap-x-14 grid md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                onClick={(e) => routeChange(item.id)}
                                className="h-full w-full m-auto border-b cursor-pointer pb-4 border-gray-500 hover:border-white duration-200"
                            >
                                <div>
                                    <div className="mb-4">
                                        <div className="mb-2">
                                            <h4 className="text-xl font-light">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <p className="font-light text-light-gray">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <ul className="space-x-3">
                                            {item.tags.map((tag, index) => {
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
                                            {item.numOfQuestions} Questions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div onClick={buttonHandle} className="mt-12">
                    <ButtonPrimary text="Create Quiz" />
                </div>
            </div>
        </>
    );
}

export default MyQuizzes;
