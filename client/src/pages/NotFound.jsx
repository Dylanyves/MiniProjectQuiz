import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center px-8">
                <h1 className="text-4xl sm:text-6xl font-bold text-purple-500">
                    404
                </h1>
                <p className="text-lg sm:text-2xl mt-4">
                    Oops! The page you are looking for could not be found.
                </p>
                <p className="text-base sm:text-lg mt-8">
                    Go back to{" "}
                    <Link
                        to="/"
                        className="text-purple-500 hover:text-purple-600"
                    >
                        homepage
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

export default NotFound;
