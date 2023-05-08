import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import QuizPlay from "./pages/QuizPlay";
import QuizResult from "./pages/QuizResult";
import Profile from "./pages/Profile";
import MyQuizzes from "./pages/MyQuizzes";
import QuizEdit from "./pages/QuizEdit";

import { useEffect } from "react";
import Axios from "./share/axios";

function App() {
    useEffect(() => {
        // Axios.get("/api").then((res) => console.log(res.data));
    }, []);
    return (
        <div className="App bg-black min-h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:id" element={<Quiz />} />
                <Route path="/:id/play" element={<QuizPlay />} />
                <Route path="/:id/result" element={<QuizResult />} />
                <Route path="/:username/profile" element={<Profile />} />
                <Route path="/:username/quizzes" element={<MyQuizzes />} />
                <Route path="/:username/:quid_id/edit" element={<QuizEdit />} />
            </Routes>
        </div>
    );
}

export default App;
