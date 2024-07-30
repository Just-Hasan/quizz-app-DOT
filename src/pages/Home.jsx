import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import StartButton from "../components/StartButton";
import axios from "axios";
import Question from "../components/Question";
import QuestionAnswerOptions from "../components/QuestionAnswerOptions";
import Results from "../components/Results";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Beforeunload } from "react-beforeunload";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const { QuizState, dispatch, status, state } = useQuiz();

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("dot_quizz_current_user")
  );
  const { data: users, setData: setUsers } = useLocalStorage(
    [],
    "dot_quizz_user"
  );

  const { data: usersHighscore, setData: setUsersHighscore } = useLocalStorage(
    [],
    "dot_quizz_user_highscore"
  );

  useEffect(() => {
    const userExist = usersHighscore.find((user) => {
      return (
        user.username === currentUser.username &&
        user.email === currentUser.email
      );
    });
    if (!userExist) {
      setUsersHighscore((user) => [...user, { ...currentUser, highscore: 0 }]);
    }
  }, [currentUser, setUsersHighscore, usersHighscore]);

  useEffect(() => {
    if (!currentUser?.username && !currentUser?.email) {
      navigate("/login");
    }
  }, [currentUser?.username, navigate, currentUser?.email]);

  useEffect(() => {
    async function getQuestions() {
      try {
        if (state.questions.length !== 0) {
          dispatch({
            type: QuizState.DATA_RECEIVED,
            payload: { data: state.questions },
          });
          return;
        }

        const { data } = await axios.get(
          "https://opentdb.com/api.php?amount=15&category=20&difficulty=easy&type=multiple"
        );

        dispatch({
          type: QuizState.DATA_RECEIVED,
          payload: { data: data.results },
        });
      } catch (error) {
        dispatch({
          type: QuizState.DATA_FAILED,
          payload: { message: "error getting data" },
        });
        throw new Error(error.message);
      }
    }
    getQuestions();
  }, [
    QuizState.DATA_RECEIVED,
    dispatch,
    QuizState.DATA_FAILED,
    state.questions,
  ]);

  function handleBeforeUnload() {
    let updatedUsers = users.map((user) =>
      user.username === currentUser.username && user.email === currentUser.email
        ? {
            ...user,
            quiz: {
              ...state,
              status: state.status !== "active" ? state.status : "pause",
            },
          }
        : { ...user }
    );
    setUsers(updatedUsers);
  }

  return (
    <div className="w-[55%] mx-auto  overflow-hidden">
      <Beforeunload onBeforeunload={handleBeforeUnload} />
      <div className="h-[100dvh] relative flex flex-col gap-4">
        <Navbar />
        <div className=" text-[#f4f4f4] text-center  h-[100%] grid place-content-center">
          <div>
            {/* Ready State */}
            {status === "ready" && (
              <div>
                <h1 className=" text-7xl font-semibold text-[#1e266e] p-4">
                  Are you ready to start your quizz?
                </h1>
                <StartButton />
              </div>
            )}

            {/* Active State */}
            {status === "active" && (
              <div className="absolute top-1/2 translate-y-[-50%] w-full left-0">
                <Question />
                <QuestionAnswerOptions />
              </div>
            )}

            {/* Finish Status */}
            {status === "finish" && <Results />}

            {/* Pause status */}
            {status === "pause" && (
              <button
                onClick={() => dispatch({ type: QuizState.RESUME })}
                className="text-6xl bg-[#1e266e] px-8 py-6 shadow-xl hover:bg-[#f4f4f4] hover:text-[#1e266e] transition-all ease-in-out rounded-full"
              >
                Resume Quiz
              </button>
            )}
          </div>
        </div>
        {status === "active" && <Timer></Timer>}
      </div>
    </div>
  );
}
