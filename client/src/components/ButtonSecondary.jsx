import React from "react";

function ButtonSecondary({ text }) {
    return (
        <button className="text-primary w-full border-2 border-primary rounded-full h-11 text-base hover:bg-primary-dark hover:border-primary-dark hover:text-white ease duration-200">
            {text}
        </button>
    );
}

export default ButtonSecondary;
