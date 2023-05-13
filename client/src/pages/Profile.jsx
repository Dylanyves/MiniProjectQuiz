import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { useCookies } from "react-cookie";

import ReactLoading from "react-loading";

function Profile(props) {
    const navigate = useNavigate();
    const params = useParams();

    const quizNavigate = () => {
        navigate(`/${params.username}/quizzes`);
    };
    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {
        Object.keys(cookies).forEach((cookieName) => {
            removeCookie(cookieName);
        });
        localStorage.clear();
        navigate("/login");
    };

    const [user, setUser] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(user);
        }
    }, []);

    return (
        <div className="text-white max-w-lg m-auto relative top-16">
            {user ? (
                <div className="mx-8">
                    <div className="border-b text-center pb-12">
                        <p className="text-xl"> {user.username}</p>
                        <i className="fa-regular fa-circle-user text-[7rem] my-6"></i>
                        <p className="font-light text-sm">Authentic user :D</p>
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
            ) : (
                <ReactLoading type="bubbles" color="#C13DFF" width="30%" />
            )}
        </div>
    );
}

export default Profile;
