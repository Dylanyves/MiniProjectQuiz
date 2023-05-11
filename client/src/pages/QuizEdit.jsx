import React, { useState, useEffect } from "react";
import ButtonPrimary from "../components/ButtonPrimary";

import Axios from "../share/axios";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function QuizEdit(props) {
    const [title, setTitle] = useState();
    const [tags, setTags] = useState(["General", "Geography"]);
    const [description, setDescription] = useState();

    const [questions, setQuestions] = useState();

    const navigate = useNavigate();
    const currentPath = useParams();
    useEffect(() => {
        Axios.get("/me", { withCredentials: true }).then((response) => {
            if (!response.data.success) {
                navigate("/login");
            } else {
                Axios.get(`/getQuizData/${currentPath.quiz_id}`).then((res) => {
                    console.log(res);
                    setQuestions(res.data);
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                });
            }
        });
    }, []);

    // const [questions, setQuestions] = useState([
    //     {
    //         id: 1,
    //         text: "What is the capital of Japan",
    //         options: [
    //             { text: "Kobe", correct: false },
    //             { text: "Hiroshima", correct: false },
    //             { text: "Tokyo", correct: true },
    //             { text: "Nagasaki", correct: false },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         text: "What is the capital of Indonesia",
    //         options: [
    //             { text: "Jakarta", correct: true },
    //             { text: "Bandung", correct: false },
    //             { text: "Surbaya", correct: false },
    //             { text: "Bali", correct: false },
    //         ],
    //     },
    // ]);

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    const [tagError, setTagError] = useState(false);
    const [inputTag, setInputTag] = useState("");

    const addTag = () => {
        const tagsLower = tags.map((tag) => tag.toLowerCase());
        if (
            inputTag !== "" &&
            tags.length < 5 &&
            !tagsLower.includes(inputTag.toLowerCase())
        ) {
            const capitalizedInput =
                inputTag.charAt(0).toUpperCase() +
                inputTag.slice(1).toLowerCase();
            setInputTag("");
            setTags([...tags, capitalizedInput]);
            setTagError(false);
        } else {
            setTagError(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTag(inputTag);
        }
    };

    const deleteTag = (index) => {
        if (tags.length > 1) {
            const filteredTags = tags.filter((_, i) => i !== index);
            setTags(filteredTags);
        }
    };

    const radioHandler = (questionId, optionIndex) => {
        const modifiedList = [];
        questions.forEach((question) => {
            if (questionId === question.id) {
                const modifiedOptions = [];
                question.options.forEach((option, index) => {
                    if (index === optionIndex) {
                        modifiedOptions.push({
                            text: option.text,
                            correct: true,
                        });
                    } else {
                        modifiedOptions.push({
                            text: option.text,
                            correct: false,
                        });
                    }
                });
                modifiedList.push({
                    id: question.id,
                    text: question.text,
                    options: modifiedOptions,
                });
            } else {
                modifiedList.push(question);
            }
        });
        setQuestions(modifiedList);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: uuidv4(),
                text: "Your question",
                options: [{ text: "Option 1", correct: true }],
            },
        ]);
        console.log(questions);
    };

    const deleteQuestion = (questionId) => {
        if (questions.length > 1) {
            setQuestions(
                questions.filter((question) => question.id !== questionId)
            );
        }
    };

    const addOption = (questionId) => {
        const modifiedList = [];
        questions.forEach((question) => {
            if (question.id === questionId && question.options.length < 6) {
                const modifiedOptions = [
                    ...question.options,
                    {
                        text: `Option ${question.options.length + 1}`,
                        correct: false,
                    },
                ];
                modifiedList.push({
                    id: question.id,
                    text: question.text,
                    options: modifiedOptions,
                });
            } else {
                modifiedList.push({
                    id: question.id,
                    text: question.text,
                    options: question.options,
                });
            }
        });
        setQuestions(modifiedList);
    };

    const deleteOption = (questionId, optionIndex) => {
        const modifiedList = [];
        questions.forEach((question) => {
            if (question.id === questionId) {
                if (question.options.length > 1) {
                    let modifiedOptions = question.options.filter(
                        (_, index) => index !== optionIndex
                    );
                    modifiedList.push({
                        id: question.id,
                        text: question.text,
                        options: modifiedOptions,
                    });
                }
            } else {
                modifiedList.push({
                    id: question.id,
                    text: question.text,
                    options: question.options,
                });
            }
        });
        setQuestions(modifiedList);
    };

    return (
        <div className="max-w-3xl m-auto p-6 pb-20">
            {questions ? (
                <form action="" className="text-white space-y-10">
                    <div>
                        <input
                            id="title"
                            type="text"
                            defaultValue={title}
                            placeholder="Enter quiz title"
                            className="block bg-black pl-0 w-full mb-1 border-r-0 border-t-0 border-l-0"
                            required
                        />
                        <label
                            htmlFor="title"
                            className="uppercase text-sm text-light-gray"
                        >
                            Title
                        </label>
                    </div>
                    <div>
                        <textarea
                            defaultValue={description}
                            name=""
                            id="description"
                            cols=""
                            rows="7"
                            className="text-black w-full min-h-[8rem] max-h-[15rem]"
                        ></textarea>
                        <label
                            htmlFor="description"
                            className="uppercase text-sm text-light-gray"
                        >
                            Description
                        </label>
                    </div>
                    <div>
                        <ul
                            id="tags"
                            className="flex flex-wrap items-center gap-x-4 gap-y-4"
                        >
                            {tags.map((tag, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="border-2 h-10 inline-flex items-center px-3 space-x-2 text-primary border-primary rounded-full"
                                    >
                                        <p className="inline">{tag}</p>
                                        <i
                                            onClick={(e) => deleteTag(index)}
                                            className="fa-solid fa-xmark cursor-pointer text-lg"
                                        ></i>
                                    </li>
                                );
                            })}
                            <div className="relative">
                                <input
                                    value={inputTag}
                                    onChange={(e) =>
                                        setInputTag(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    placeholder="Enter tag"
                                    className="bg-black pl-0 w-full mb-1 border-r-0 border-t-0 border-l-0 focus:placeholder-white focus:border-white focus:ring-0"
                                />
                                <i
                                    onClick={addTag}
                                    className="fa-solid fa-plus absolute right-0 top-4 cursor-pointer"
                                ></i>
                                {tagError ? (
                                    <p className="text-xs font-light text-warning">
                                        This field is empty or has a non-unique
                                        value
                                    </p>
                                ) : null}
                            </div>
                        </ul>
                        <p className="uppercase text-sm text-light-gray mt-1">
                            Tags
                        </p>
                    </div>
                    <div className="space-y-8">
                        {questions.map((question) => {
                            return (
                                <div
                                    key={question.id}
                                    className="bg-dark-gray p-4 rounded-sm"
                                >
                                    <div className="mb-2">
                                        <input
                                            id={`question_${question.id}`}
                                            type="text"
                                            defaultValue={question.text}
                                            className="bg-dark-gray pl-0 w-full mb-1 border-r-0 border-t-0 border-l-0 focus:placeholder-white focus:border-white focus:ring-0"
                                            placeholder="Enter question here"
                                        />
                                        <label
                                            className="uppercase text-sm text-light-gray mt-1"
                                            htmlFor={`question_${question.id}`}
                                        >
                                            Question
                                        </label>
                                    </div>
                                    <ul>
                                        {question.options.map((option, i) => {
                                            return (
                                                <li
                                                    key={`${question.id}_${i}`}
                                                    className="flex items-center gap-x-3 relative"
                                                >
                                                    <input
                                                        onClick={(e) =>
                                                            radioHandler(
                                                                question.id,
                                                                i
                                                            )
                                                        }
                                                        className="relative top-[-2px]"
                                                        type="radio"
                                                        name={`question_${question.id}`}
                                                        id=""
                                                        defaultChecked={
                                                            option.correct
                                                        }
                                                        checked={option.correct}
                                                    />
                                                    <input
                                                        type="text"
                                                        defaultValue={
                                                            option.text
                                                        }
                                                        className={
                                                            option.correct
                                                                ? "bg-dark-gray text-tertiary-g pl-0 w-full mb-1 border-transparent border-x-0 border-t-0 focus:placeholder-white focus:border-light-gray focus:ring-0"
                                                                : "bg-dark-gray pl-0 w-full mb-1 border-transparent border-x-0 border-t-0 focus:placeholder-white focus:border-light-gray focus:ring-0"
                                                        }
                                                    />
                                                    <i
                                                        onClick={(e) =>
                                                            deleteOption(
                                                                question.id,
                                                                i
                                                            )
                                                        }
                                                        className="fa fa-xmark absolute right-0 cursor-pointer text-light-gray opacity-50 hover:opacity-100 hover:text-white ease duration-100"
                                                    ></i>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div
                                        onClick={(e) => addOption(question.id)}
                                        className="text-primary text-sm flex items-center gap-x-2 cursor-pointer mt-2 hover:text-primary-dark ease duration-200"
                                    >
                                        <p className="">Add Option</p>
                                        <i className="fa-solid fa-plus text-xs"></i>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <div
                                            onClick={(e) =>
                                                deleteQuestion(question.id)
                                            }
                                            className="text-tertiary-r flex gap-x-2 items-center w-min cursor-pointer hover:text-warning ease duration-200"
                                        >
                                            <p>Delete</p>
                                            <i className="fa-solid fa-trash text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </form>
            ) : null}
            <div className="space-y-16 mt-8">
                <div
                    onClick={addQuestion}
                    className="group text-white bg-dark-gray rounded-md h-20 inline-flex items-center w-full justify-center uppercase tracking-widest cursor-pointer hover:text-primary-dark ease duration-200"
                >
                    <p className="border-b-2 pb-1 border-primary group-hover:border-primary-dark">
                        Add Question
                    </p>
                </div>
                <div>
                    <ButtonPrimary text="Done" />
                </div>
            </div>
        </div>
    );
}

export default QuizEdit;
