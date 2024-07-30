import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Modal } from "./Modal";
import LogoutModal from "./LogoutModal";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const currentUser = JSON.parse(
    localStorage.getItem("dot_quizz_current_user")
  );
  return (
    <nav>
      <ul className="p-8 relative mt-8 rounded-full grid text-left grid-cols-3 items-center  gap-4  h-min backdrop-blur-md bg-transparent border[#ffe6e8] border-2 text-[#f4f4f4] ">
        <li className="text-4xl font-semibold justify-start ">DOT Quizz App</li>
        <li className="text-4xl text-center">
          <NavLink to={"/leaderboards"}>Leaderboards</NavLink>
        </li>
        <li className="text-4xl relative flex justify-end gap-4">
          <span>{currentUser?.username}</span>
          <button onClick={() => setShow((show) => !show)}>
            <BsThreeDots />
          </button>

          <Modal
            openBtn={
              <button
                className={`absolute ${
                  !show && "hidden"
                } text-[16px] p-4 bg-white bottom-[-56px] rounded-md right-0 text-[#1c1c1c]`}
              >
                Logout
              </button>
            }
            ModalToShow={LogoutModal}
          ></Modal>
        </li>
      </ul>
    </nav>
  );
}
