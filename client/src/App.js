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
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="App bg-black min-h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/quiz/:id/play" element={<QuizPlay />} />
                <Route path="/quiz/:id/result" element={<QuizResult />} />
                <Route path="/:username/profile" element={<Profile />} />
                <Route path="/:username/quizzes" element={<MyQuizzes />} />
                <Route path="/:username/:quiz_id/edit" element={<QuizEdit />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
