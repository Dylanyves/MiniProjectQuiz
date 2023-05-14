import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";

import Axios from "../share/axios";
import Swal from "sweetalert2";

function Signup(props) {
    const submitHandle = (e) => {
        e.preventDefault();
        // console.log(input);

        if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{4,}$/.test(input.username)) {
            setIsBlanks((e) => {
                return { ...e, username: true };
            });
        } else {
            setIsBlanks((e) => {
                return { ...e, username: false };
            });
        }

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(input.password)) {
            setIsBlanks((e) => {
                return { ...e, password: true };
            });
        } else {
            setIsBlanks((e) => {
                return { ...e, password: false };
            });
        }

        if (input.confirmPassword !== input.password) {
            setIsBlanks((e) => {
                return { ...e, confirmPassword: true };
            });
        } else {
            setIsBlanks((e) => {
                return { ...e, confirmPassword: false };
            });
        }
    };

    const [isBlanks, setIsBlanks] = useState({
        username: true,
        password: false,
        confirmPassword: false,
    });

    const [input, setInput] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (
            !isBlanks.username &&
            !isBlanks.password &&
            !isBlanks.confirmPassword
        ) {
            postData();
        }
    }, [isBlanks]);

    const navigate = useNavigate();

    const postData = async () => {
        const res = await Axios.post("/signup", input);

        const valid = res.data.success;
        console.log(valid);
        if (!valid) {
            Swal.fire(res.data.message);
        } else {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: res.data.data.id,
                    username: res.data.data.username,
                })
            );
            Swal.fire({
                icon: "success",
                title: "Your account has been created",
                timer: 2000,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    return (
        <div className="text-white">
            <div className="m-auto relative top-12 max-w-md p-8">
                <h1 className="text-3xl text-center text-primary mb-24">
                    Sign up
                </h1>
                <form
                    action="submit"
                    onSubmit={submitHandle}
                    className="text-sm"
                >
                    <div className="space-y-7 mb-14">
                        <div>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    value={input.username}
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            username: e.target.value,
                                        })
                                    }
                                    placeholder="Create username"
                                    className="bg-black w-full rounded-full font-light border-b border-gray-500 py-2 pl-10 pr-6 focus:outline-none focus:border-white focus:placeholder:text-white"
                                />
                                <i className="fa-solid fa-user absolute top-1 left-3 translate-y-1/2 mt-1 ml-1"></i>
                            </div>
                            <p className="text-xs font-light text-warning mt-1">
                                <span
                                    className={
                                        isBlanks.username ? "block" : "hidden"
                                    }
                                >
                                    Empty or username contains less than 4
                                    letters
                                </span>
                            </p>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    value={input.password}
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="Create password"
                                    className="bg-black w-full rounded-full font-light border-b border-gray-500 py-2 pl-10 pr-6 focus:outline-none focus:border-white focus:placeholder:text-white"
                                />
                                <i className="fa-solid fa-lock absolute top-1 left-3 translate-y-1/2 mt-1 ml-1"></i>
                            </div>
                            <p className="text-xs font-light text-warning mt-1">
                                <span
                                    className={
                                        isBlanks.password ? "block" : "hidden"
                                    }
                                >
                                    Empty or password is less than 8 letters
                                    long, does not have at least one uppercase,
                                    one lowercase, and a number
                                </span>
                            </p>
                        </div>
                        <div>
                            <div className="relative">
                                <input
                                    id="confimPassword"
                                    type="password"
                                    value={input.confirmPassword}
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    placeholder="Confirm password"
                                    className="bg-black w-full rounded-full font-light border-b border-gray-500 py-2 pl-10 pr-6 focus:outline-none focus:border-white focus:placeholder:text-white"
                                />
                                <i className="fa-solid fa-lock absolute top-1 left-3 translate-y-1/2 mt-1 ml-1"></i>
                            </div>
                            <p className="text-xs font-light text-warning mt-1">
                                <span
                                    className={
                                        isBlanks.confirmPassword
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    Empty or password is not the same
                                </span>
                            </p>
                        </div>
                    </div>
                    <ButtonPrimary text="Create an account" />
                </form>
                <div className="text-center mt-20">
                    <p className="text-sm font-light">
                        Already have an account?
                    </p>
                    <span className="text-primary underline text-sm tracking-wide">
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
