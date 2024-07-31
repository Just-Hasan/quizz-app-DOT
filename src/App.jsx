import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" index element={<Login />}></Route>
        <Route path="/signup" index element={<SignUp />}></Route>
        <Route path="/home" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/home/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </>
  );
}
