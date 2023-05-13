import { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [textValue, setTextValue] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (textValue === "confirmDelete") {
            onSubmit(textValue);
            setTextValue("");
            onClose();
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ease duration-300">
                {" "}
                {/* Set the width of the modal */}
                <button
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.348 4.848a1 1 0 011.415 1.415L11.414 10l4.35 4.35a1 1 0 01-1.415 1.415L10 11.415l-4.35 4.35a1 1 0 01-1.415-1.415L8.586 10 4.236 5.65a1 1 0 011.415-1.415L10 8.586l4.35-4.35z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="text-sm text-red-500" htmlFor="input">
                        type <strong>"confirmDelete"</strong> to delete this
                        quiz
                    </label>
                    <input
                        id="input"
                        type="text"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${
                            isError ? "border-red-500" : ""
                        }`}
                        placeholder="Enter text"
                        required
                    />
                    {isError && (
                        <p className="text-red-500 mt-2 text-sm">Wrong input</p>
                    )}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
