import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtonPrimary from "../components/ButtonPrimary";

function Home(props) {
    const [code, setCode] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();
        console.log(code);
    };

    const navigate = useNavigate();

    const routeChange = (id) => {
        const path = `/${id}`;
        navigate(path);
    };

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

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl m-auto p-6">
                <form
                    action="submit"
                    className="mb-20 md:mb-4 grid md:grid-cols-5 md:gap-x-4"
                    onSubmit={submitHandle}
                >
                    <input
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
                                            <div className="text-end mb-2 space-x-2">
                                                <i className="fa-solid fa-user text-xs text-light-gray"></i>
                                                <p className="text-sm font-light text-light-gray inline">
                                                    {item.name}
                                                </p>
                                            </div>
                                            <div className="mb-2 items-center justify-between flex">
                                                <h4 className="text-lg font-light">
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
                </div>
            </div>
        </div>
    );
}

export default Home;
