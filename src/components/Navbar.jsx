import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const currentUser = JSON.parse(
    localStorage.getItem("dot_quizz_current_user")
  );

  return (
    <nav>
      <ul className="py-4 px-8 relative mt-8 rounded-full grid text-left grid-cols-3 items-center  gap-4  h-min backdrop-blur-md bg-transparent border[#ffe6e8] border-2 text-[#f4f4f4] ">
        <li className="text-4xl font-semibold justify-start ">
          <NavLink to={"/home"}>DOT Quizz App</NavLink>
        </li>
        <li className="text-4xl text-center">
          <NavLink to={"leaderboard"}>Leaderboards</NavLink>
        </li>
        <li className="text-4xl relative flex justify-end gap-4 items-center">
          <span>{currentUser?.username}</span>

          <ProfileMenu />
        </li>
      </ul>
    </nav>
  );
}
