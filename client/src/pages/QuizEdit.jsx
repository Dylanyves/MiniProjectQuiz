import React, { useState, useEffect } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import Modal from "../components/Modal";

import Axios from "../share/axios";
import { useNavigate, useParams } from "react-router-dom";

function QuizEdit(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitModal = (text) => {
        Axios.delete("/deleteQuiz", { data: { quiz_id: data.id } }).then(
            (res) => {
                const user = JSON.parse(localStorage.getItem("user")).username;
                navigate(`/${user}/quizzes`);
            }
        );
    };

    let [data, setData] = useState();
    const [title, setTitle] = useState();
    const [tags, setTags] = useState();
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
                    if (res.data.id) {
                        setData(res.data);
                        setQuestions(res.data.questions);
                        setTags(res.data.tags);
                        setTitle(res.data.title);
                        setDescription(res.data.description);
                    } else {
                        navigate("/notFound");
                    }
                });
            }
        });
    }, []);

    const [tagError, setTagError] = useState(false);
    const [inputTag, setInputTag] = useState("");

    const addTag = () => {
        if (
            inputTag.trim() !== "" &&
            tags.length < 5 &&
            !tags
                .map((tag) => tag.text.toLowerCase())
                .includes(inputTag.toLowerCase())
        ) {
            const capitalizedInput =
                inputTag.charAt(0).toUpperCase() +
                inputTag.slice(1).toLowerCase();
            Axios.post("/addTag", {
                data: { quiz_id: data.id, text: capitalizedInput },
            }).then((res) => {
                setTags([...tags, res.data.newTag]);
                setInputTag("");
                setTagError(false);
            });
        } else {
            setTagError(true);
        }
    };

    const deleteTag = (id) => {
        if (tags.length > 1) {
            Axios.delete("/deleteTag", { data: { tag_id: id } }).then(
                (res) => {}
            );
            setTags(tags.filter((tag) => tag.id !== id));
        }
    };

    const radioHandler = (questionId, optionId, isCorrect) => {
        if (!isCorrect) {
            const oldOption = questions
                .find((question) => question.id === questionId)
                .options.find((option) => option.correct === 1);

            Axios.patch("/updateOptionBoolean", {
                data: {
                    updated_option_id: optionId,
                    old_option_id: oldOption.id,
                },
            }).then((res) => {
                setQuestions(
                    questions.map((question) => {
                        if (question.id === questionId) {
                            return {
                                ...question,
                                options: question.options.map((option) => {
                                    if (
                                        option.id === res.data.updated_option_id
                                    )
                                        return { ...option, correct: 1 };
                                    else return { ...option, correct: 0 };
                                }),
                            };
                        } else return question;
                    })
                );
            });
        }
    };

    const addQuestion = () => {
        Axios.post("/addQuestion", { data: { quiz_id: data.id } }).then(
            (res) => {
                setQuestions([
                    ...questions,
                    { ...res.data.newQuestion, options: [res.data.newOption] },
                ]);
            }
        );
    };

    const deleteQuestion = (questionId) => {
        if (questions.length > 1) {
            setQuestions(
                questions.filter((question) => question.id !== questionId)
            );

            Axios.delete("/deleteQuestion", {
                data: { quiz_id: data.id, question_id: questionId },
            }).then((res) => {
                // console.log(res.data);
            });
        }
    };

    const addOption = (questionId) => {
        const question = questions.find((q) => q.id === questionId);
        const optionsLength = question.options.length;

        if (optionsLength >= 6) {
            return;
        }

        Axios.post("/addOption", {
            data: {
                quiz_id: data.id,
                question_id: questionId,
                text: `Option ${optionsLength + 1}`,
            },
        }).then((res) => {
            setQuestions(
                questions.map((question) => {
                    if (question.id === res.data.question_id) {
                        return {
                            ...question,
                            options: [...question.options, res.data.newOption],
                        };
                    } else {
                        return question;
                    }
                })
            );
        });
    };

    const deleteOption = (questionId, optionId, optionText) => {
        const question = questions.find((q) => q.id === questionId);
        const optionsLength = question.options.length;

        if (optionsLength <= 1) {
            return;
        } else {
            const correct = questions
                .find((question) => question.id === questionId)
                .options.find((option) => option.id === optionId).correct;

            if (correct) {
                const incorrectOptions = questions
                    .find((question) => question.id === questionId)
                    .options.filter((option) => option.correct === 0);

                Axios.patch("/updateOptionBoolean", {
                    data: {
                        updated_option_id: incorrectOptions[0].id,
                    },
                }).then((res) => {
                    const modifiedList = questions.map((question) => {
                        if (question.id === questionId) {
                            const modifiedOptions = question.options
                                .map((option) => {
                                    if (option.id === res.data.updatedOption.id)
                                        return { ...option, correct: 1 };
                                    else return option;
                                })
                                .filter((item) => item.id !== optionId);
                            return {
                                ...question,
                                options: modifiedOptions,
                            };
                        } else return question;
                    });
                    setQuestions(modifiedList);
                });
            }
            Axios.delete("/deleteOption", {
                data: { question_id: questionId, option_id: optionId },
            }).then((res) => {
                setQuestions(
                    questions.map((question) => {
                        if (question.id === questionId) {
                            return {
                                ...question,
                                options: question.options.filter(
                                    (option) => option.id !== optionId
                                ),
                            };
                        } else {
                            return question;
                        }
                    })
                );
            });
        }
    };

    const optionTextHandler = (question_id, option_id, text) => {
        setQuestions(
            questions.map((question) => {
                if (question.id === question_id) {
                    const updatedOptions = question.options.map((option) => {
                        if (option.id === option_id) {
                            return { ...option, text: text };
                        } else {
                            return option;
                        }
                    });
                    return {
                        ...question,
                        options: updatedOptions,
                    };
                } else {
                    return question;
                }
            })
        );
    };

    const optionTextSubmit = (question_id, option_id, newText) => {
        Axios.patch("/updateOptionText", {
            data: {
                question_id: question_id,
                option_id: option_id,
                newText: newText,
            },
        }).then((res) => {
            // console.log(res);
        });
    };

    const updateTitle = () => {
        //Check if title changes
        if (title.trim() === data.title) {
            //If input is the same we don't need to change the data
            return;
        } else {
            //Update the title
            Axios.patch(`/updateTitle/${data.id}`, { title: title }).then(
                (res) => {
                    setTitle(res.data.title);
                }
            );
        }
    };

    const updateDescription = () => {
        //Check if description changes
        if (description.trim() === data.description) {
            //If description is the same we don't need to change the data
            return;
        } else {
            //Update the description
            Axios.patch(`/updateDescription/${data.id}`, {
                description: description,
            }).then((res) => {
                setDescription(res.data.description);
            });
        }
    };

    const questionInputHandler = (question_id, text, newText) => {
        if (text !== newText.trim()) {
            Axios.patch("/updateQuestionText", {
                data: {
                    quiz_id: data.id,
                    question_id: question_id,
                    newText: newText,
                },
            }).then((res) => {
                // console.log(res);
            });
        }
    };

    const updateTotalQuestions = () => {
        Axios.patch("/updateTotalQuestions", {
            data: { quiz_id: data.id, total_questions: questions.length },
        }).then((res) => {
            // console.log(res);
        });
    };

    const submitQuiz = (e) => {
        e.preventDefault();

        updateTitle();
        updateDescription();
        addTag();
        updateTotalQuestions();

        const user = JSON.parse(localStorage.getItem("user")).username;
        navigate(`/${user}/quizzes`);
    };

    return (
        <div className="max-w-3xl m-auto p-6 pb-6">
            {questions ? (
                <>
                    <form
                        onSubmit={submitQuiz}
                        action=""
                        className="text-white space-y-10"
                    >
                        <div>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
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
                                onChange={(e) => setDescription(e.target.value)}
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
                                            key={tag.id}
                                            className="border-2 h-10 inline-flex items-center px-3 space-x-2 text-primary border-primary rounded-full"
                                        >
                                            <p className="inline">{tag.text}</p>
                                            <i
                                                onClick={(e) =>
                                                    deleteTag(tag.id)
                                                }
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
                                        // onKeyDown={handleKeyDown}
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
                                            This field is empty or has a
                                            non-unique value, or max
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
                                                onBlur={(e) =>
                                                    questionInputHandler(
                                                        question.id,
                                                        question.text,
                                                        e.currentTarget.value
                                                    )
                                                }
                                                id={`question_${question.id}`}
                                                type="text"
                                                defaultValue={question.text}
                                                className="bg-dark-gray pl-0 w-full mb-1 border-r-0 border-t-0 border-l-0 focus:placeholder-white focus:border-white focus:ring-0"
                                                placeholder="Enter question here"
                                                required
                                            />

                                            <label
                                                className="uppercase text-sm text-light-gray mt-1"
                                                htmlFor={`question_${question.id}`}
                                            >
                                                Question
                                            </label>
                                        </div>
                                        <ul>
                                            {question.options.map(
                                                (option, i) => {
                                                    return (
                                                        <li
                                                            key={`${question.id}_${option.id}`}
                                                            className="flex items-center gap-x-3 relative"
                                                        >
                                                            <input
                                                                onChange={(e) =>
                                                                    radioHandler(
                                                                        question.id,
                                                                        option.id,
                                                                        option.correct
                                                                    )
                                                                }
                                                                className="relative top-[-2px]"
                                                                type="radio"
                                                                name={`question_${question.id}`}
                                                                id=""
                                                                checked={
                                                                    option.correct
                                                                }
                                                            />
                                                            <input
                                                                onBlur={() =>
                                                                    optionTextSubmit(
                                                                        question.id,
                                                                        option.id,
                                                                        option.text
                                                                    )
                                                                }
                                                                type="text"
                                                                value={
                                                                    option.text
                                                                }
                                                                onChange={(e) =>
                                                                    optionTextHandler(
                                                                        question.id,
                                                                        option.id,
                                                                        e
                                                                            .currentTarget
                                                                            .value
                                                                    )
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
                                                                        option.id,
                                                                        option.text
                                                                    )
                                                                }
                                                                className="fa fa-xmark absolute right-0 cursor-pointer text-light-gray opacity-50 hover:opacity-100 hover:text-white ease duration-100"
                                                            ></i>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                        <div
                                            onClick={(e) =>
                                                addOption(question.id)
                                            }
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
                        <div className="space-y-16 mt-8">
                            <div
                                onClick={addQuestion}
                                className="group text-white bg-dark-gray rounded-md h-20 inline-flex items-center w-full justify-center uppercase tracking-widest cursor-pointer hover:text-primary-dark ease duration-200"
                            >
                                <p className="border-b-2 pb-1 border-primary group-hover:border-primary-dark">
                                    Add Question
                                </p>
                            </div>
                        </div>
                        <div>
                            <ButtonPrimary text="Done" />
                        </div>
                    </form>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmitModal}
                    />
                    <div
                        onClick={handleOpenModal}
                        className="relative bottom-0 mt-52 text-white bg-red-600 rounded-md h-20 inline-flex items-center w-full justify-center uppercase tracking-widest cursor-pointer hover:bg-red-700 ease duration-200"
                    >
                        <p className="">Delete quiz</p>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default QuizEdit;
