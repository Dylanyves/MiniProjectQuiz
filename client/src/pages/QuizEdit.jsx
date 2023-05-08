import React, { useState, useEffect } from "react";
import ButtonPrimary from "../components/ButtonPrimary";

import { v4 as uuid } from "uuid";

function QuizEdit(props) {
    const [title, setTitle] = useState("Guess The Capital City");
    const [tags, setTags] = useState(["General", "Geography"]);
    const [description, setDescription] = useState(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit ipsum saepe quasi similique molestiae ut iure aliquam expedita? Totam, modi dolore cupiditate minus minima placeat natus ipsum id asperiores"
    );

    const [questions, setQuestion] = useState([
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
    ]);

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
                            optionText: option.optionText,
                            correct: true,
                        });
                    } else {
                        modifiedOptions.push({
                            optionText: option.optionText,
                            correct: false,
                        });
                    }
                });
                modifiedList.push({
                    id: question.id,
                    questionText: question.questionText,
                    options: modifiedOptions,
                });
            } else {
                modifiedList.push(question);
            }
        });
        setQuestion(modifiedList);
    };

    const addQuestion = () => {
        setQuestion([
            ...questions,
            {
                id: uuid(),
                questionText: "Your question",
                options: [{ optionText: "Option 1", correct: true }],
            },
        ]);
        console.log(questions);
    };

    const deleteQuestion = (questionId) => {
        if (questions.length > 1) {
            setQuestion(
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
                        optionText: `Option ${question.options.length + 1}`,
                        correct: false,
                    },
                ];
                modifiedList.push({
                    id: question.id,
                    questionText: question.questionText,
                    options: modifiedOptions,
                });
            } else {
                modifiedList.push({
                    id: question.id,
                    questionText: question.questionText,
                    options: question.options,
                });
            }
        });
        setQuestion(modifiedList);
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
                        questionText: question.questionText,
                        options: modifiedOptions,
                    });
                }
            } else {
                modifiedList.push({
                    id: question.id,
                    questionText: question.questionText,
                    options: question.options,
                });
            }
        });
        setQuestion(modifiedList);
    };

    return (
        <div className="max-w-3xl m-auto p-6 pb-20">
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
                                onChange={(e) => setInputTag(e.target.value)}
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
                                        defaultValue={question.questionText}
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
                                                        option.optionText
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
