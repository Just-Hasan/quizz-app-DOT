import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(
    localStorage.getItem("dot_quizz_current_user")
  );

  useEffect(() => {
    if (!currentUser?.username && !currentUser?.email) {
      navigate("/login");
    }
  }, [currentUser?.username, navigate, currentUser?.email]);

  return (
    <div className="w-[55%] mx-auto  overflow-hidden">
      <div className="h-[100dvh] relative flex flex-col gap-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
