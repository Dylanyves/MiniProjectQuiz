import React from "react";

function ButtonPrimary({ text }) {
    return (
        <button className="bg-primary text-white w-full rounded-full h-11 text-base hover:bg-primary-dark ease duration-200">
            {text}
        </button>
    );
}

export default ButtonPrimary;
