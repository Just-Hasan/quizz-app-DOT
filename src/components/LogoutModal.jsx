import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const LogoutModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const { setData: setCurrentUser } = useLocalStorage(
    { username: null, email: null },
    "dot_quizz_current_user"
  );

  function logout() {
    setCurrentUser({ username: null, email: null });
    setTimeout(() => navigate("/login", 1000));
  }

  return (
    <div className="flex flex-col gap-8">
      <b className="text-3xl">Logout from DOT Quizz App?</b>
      <div className="flex gap-4">
        <button
          onClick={logout}
          className="bg-red-600 text-4xl px-6 py-4  text-red-50 rounded-md"
        >
          Yes
        </button>
        <button
          onClick={handleClose}
          className="text-4xl px-6 py-4  text-[#1c1c1c] rounded-md"
        >
          No
        </button>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  handleClose: PropTypes.func,
};

export default LogoutModal;
