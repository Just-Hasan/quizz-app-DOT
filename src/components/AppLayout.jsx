import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
    <div>
      <Outlet />
    </div>
  );
}
