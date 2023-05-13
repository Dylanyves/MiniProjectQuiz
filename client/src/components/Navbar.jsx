import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Axios from "../share/axios";
import { useCookies } from "react-cookie";

function Navbar(props) {
    const [navActive, setNavActive] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        setNavActive(false);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(user);
        }
    }, []);

    const [cookies, setCookie, removeCookie] = useCookies();

    const navigate = useNavigate();

    const logout = () => {
        Object.keys(cookies).forEach((cookieName) => {
            removeCookie(cookieName);
        });
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="text-white max-w-7xl m-auto mb-10">
            {user ? (
                <div className="relative flex justify-between items-center py-6 mx-6 border-b border-opacity-70 border-light-gray">
                    <Link to="/">
                        <span className="text-primary tracking-[0.3em]">
                            QUIZR
                        </span>
                    </Link>
                    <div
                        onClick={(e) => setNavActive(!navActive)}
                        className="md:hidden"
                    >
                        {navActive ? (
                            <i className="fa-solid fa-xmark cursor-pointer text-lg"></i>
                        ) : (
                            <i className="fa-solid fa-bars cursor-pointer"></i>
                        )}
                    </div>
                    <ul className="space-x-4 hidden md:block">
                        <li className="inline font-light text-primary hover:text-primary-dark ease duration-200">
                            <Link to={`/${user.username}/profile`}>
                                <span className="">Profile</span>
                            </Link>
                        </li>
                        <li className="inline font-light text-primary hover:text-primary-dark ease duration-200">
                            <Link to={`/${user.username}/quizzes`}>
                                <span>My Quizzes</span>
                            </Link>
                        </li>
                        <li
                            onClick={logout}
                            className="cursor-pointer inline font-light text-primary hover:text-primary-dark ease duration-200"
                        >
                            <span>Logout</span>
                        </li>
                    </ul>
                    {!navActive ? null : (
                        <ul className="absolute top-[4.5rem] bg-dark-gray w-full md:hidden">
                            <li className="">
                                <Link to={`/${user.username}/profile`}>
                                    <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                        Profile
                                    </span>
                                </Link>
                            </li>
                            <li className="">
                                <Link to={`/${user.username}/quizzes`}>
                                    <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                        My Quizzes
                                    </span>
                                </Link>
                            </li>
                            <li onClick={logout} className="">
                                <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                    Logout
                                </span>
                            </li>
                        </ul>
                    )}
                </div>
            ) : null}
        </nav>
    );
}

export default Navbar;
