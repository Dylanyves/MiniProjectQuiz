import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

function Profile(props) {
    const navigate = useNavigate();
    const params = useParams();

    const quizNavigate = () => {
        navigate(`/${params.username}/quizzes`);
    };

    const logout = () => {
        navigate("/login");
    };

    return (
        <div className="text-white max-w-lg m-auto relative top-16">
            <div className="mx-8">
                <div className="border-b text-center pb-12">
                    <p className="text-xl">Dylan Mac Yves</p>
                    <i className="fa-regular fa-circle-user text-[7rem] my-6"></i>
                    <p className="font-light text-sm">macyvesdylan@gmail.com</p>
                </div>
                <div className="pt-12 space-y-6">
                    <div onClick={quizNavigate}>
                        <ButtonPrimary text="My Quizzes" />
                    </div>
                    <div onClick={logout}>
                        <ButtonSecondary text="Logout" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
