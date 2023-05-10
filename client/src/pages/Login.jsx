import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";

import Axios from "../share/axios";
import Swal from "sweetalert2";

function Login() {
    const submitHandle = (e) => {
        e.preventDefault();

        if (input.username.trim() === "") {
            setIsBlanks((e) => {
                return { ...e, username: true };
            });
        } else {
            setIsBlanks((e) => {
                return { ...e, username: false };
            });
        }

        if (input.password.trim() === "") {
            setIsBlanks((e) => {
                return { ...e, password: true };
            });
        } else {
            setIsBlanks((e) => {
                return { ...e, password: false };
            });
        }
    };

    const [isBlanks, setIsBlanks] = useState({
        username: true,
        password: false,
    });

    const [input, setInput] = useState({ username: "", password: "" });

    useEffect(() => {
        fetchData();
    }, [isBlanks]);

    const navigate = useNavigate();

    const fetchData = async () => {
        if (!isBlanks.username && !isBlanks.password) {
            const res = await Axios.post("/login", input, {
                withCredentials: true,
            });

            if (!res.data.success) {
                Swal.fire(res.data.message);
            } else {
                navigate("/");
            }
        }
    };

    return (
        <div className="text-white">
            <div className="m-auto relative top-12 max-w-md p-8">
                <h1 className="text-3xl text-center text-primary mb-24">
                    Login
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
                                    placeholder="Username"
                                    className="bg-black w-full font-light rounded-full border-gray-500 py-2 pl-10 pr-6 focus:outline-none focus:border-white focus:placeholder:text-white"
                                />
                                <i className="fa-solid fa-user absolute top-1 left-3 translate-y-1/2 mt-1 ml-1"></i>
                            </div>
                            <p className="text-xs font-light text-warning mt-1">
                                <span
                                    className={
                                        isBlanks.username ? "block" : "hidden"
                                    }
                                >
                                    Input field cannot be empty!
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
                                    placeholder="Enter your password"
                                    className="bg-black w-full font-light rounded-full py-2 pl-10 pr-6 focus:outline-none focus:border-white focus:placeholder:text-white"
                                />
                                <i className="fa-solid fa-lock absolute top-1 left-3 translate-y-1/2 mt-1 ml-1"></i>
                            </div>
                            <p className="text-xs font-light text-warning mt-1">
                                <span
                                    className={
                                        isBlanks.password ? "block" : "hidden"
                                    }
                                >
                                    Input field cannot be empty!
                                </span>
                            </p>
                        </div>
                    </div>
                    <ButtonPrimary text="Login" />
                </form>
                <div className="text-center mt-20">
                    <p className="text-sm font-light">Don't have an account?</p>
                    <span className="text-primary underline text-sm tracking-wide">
                        <Link to="/signup">Sign up</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
