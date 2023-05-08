import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
    const [navActive, setNavActive] = useState(true);

    useEffect(() => {
        setNavActive(false);
    }, []);

    return (
        <nav className="text-white max-w-7xl m-auto mb-10">
            <div className="relative flex justify-between items-center py-6 mx-6 border-b border-opacity-70 border-light-gray">
                <Link to="/">
                    <span className="text-primary tracking-[0.3em]">QUIZR</span>
                </Link>
                <div
                    onClick={(e) => setNavActive(!navActive)}
                    className="md:hidden"
                >
                    {navActive ? (
                        <i class="fa-solid fa-xmark cursor-pointer text-lg"></i>
                    ) : (
                        <i className="fa-solid fa-bars cursor-pointer"></i>
                    )}
                </div>
                <ul className="space-x-4 hidden md:block">
                    <li className="inline font-light text-primary hover:text-primary-dark ease duration-200">
                        <Link to={`/asdfasd/profile`}>
                            <span className="">Profile</span>
                        </Link>
                    </li>
                    <li className="inline font-light text-primary hover:text-primary-dark ease duration-200">
                        <Link to={`/asdfasd/quizzes`}>
                            <span>My Quizzes</span>
                        </Link>
                    </li>
                    <li className="inline font-light text-primary hover:text-primary-dark ease duration-200">
                        <Link to={`/login`}>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
                {!navActive ? null : (
                    <ul className="absolute top-[4.5rem] bg-dark-gray w-full md:hidden">
                        <li className="">
                            <Link to={`/asdfasd/profile`}>
                                <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li className="">
                            <Link to={`/asdfasd/quizzes`}>
                                <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                    My Quizzes
                                </span>
                            </Link>
                        </li>
                        <li className="">
                            <Link to={`/login`}>
                                <span className="block p-3 cursor-pointer font-light text-primary hover:text-white hover:bg-primary-dark ease duration-200">
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
