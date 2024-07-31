import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import useLocalStorage from "../hooks/useLocalStorage";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { createPortal } from "react-dom";

export default function Results() {
  const {
    correctAnswer,
    incorrectAnswer,
    questions,
    dispatch,
    QuizState,
    state,
    secondsRemaining,
  } = useQuiz();

  ////////[Local Storage Essentials]
  const { data: users, setData: setUsers } = useLocalStorage(
    [],
    "dot_quizz_user"
  );
  const { data: usersHighscore, setData: setUsersHighscore } = useLocalStorage(
    [],
    "dot_quizz_user_highscore"
  );
  const { data: currentUser } = useLocalStorage([], "dot_quizz_current_user");

  const { width, height } = useWindowSize();

  let score;

  if (secondsRemaining >= 1) {
    score = secondsRemaining * correctAnswer;
  } else {
    score = correctAnswer * (100 / 15);
  }

  const currentUserHighscore = usersHighscore.find((user) => {
    return (
      user.username === currentUser.username && user.email === currentUser.email
    );
  })?.highscore;

  useEffect(() => {
    if (score >= currentUserHighscore && currentUserHighscore !== undefined) {
      let updatedUsers = users.map((user) =>
        user.username === currentUser.username &&
        user.email === currentUser.email
          ? {
              ...user,
              quiz: {
                ...state,
                highscore: score,
              },
            }
          : user
      );
      const updateHighscore = usersHighscore.map((user) =>
        user.username === currentUser.username &&
        user.email === currentUser.email
          ? { ...user, highscore: score }
          : user
      );
      setUsers(updatedUsers);
      setUsersHighscore(updateHighscore);
    }
  }, []);

  return (
    <>
      {score >= currentUserHighscore &&
        createPortal(<Confetti width={width} height={height} />, document.body)}
      <div className="bg-transparent grid border-blue-500 border-[0.5px] rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-[#1e266e] text-5xl pb-8 border-b-2 font-semibold border-[#1864ab] mb-12">
          Results
        </h2>
        <ul className="text-3xl items-center justify-center text-[#1e266e] gap-8 grid grid-cols-3">
          {score >= currentUserHighscore && (
            <li className="col-span-3 mb-8 font-bold">
              Wow {currentUser.username}, you set a new Highscore🔥🔥🔥
            </li>
          )}
          <li>Correct Answer</li>
          <li>:</li>
          <li>{correctAnswer}</li>
          <li>Incorrect Answer</li>
          <li>:</li>
          <li>{incorrectAnswer}</li>
          <li>Answered Questions</li>
          <li>:</li>
          <li>
            {correctAnswer + incorrectAnswer} of {questions.length}
          </li>
          <li>Score</li>
          <li>:</li>
          <li>{score ?? 0}</li>
          <li>Highscore</li>
          <li>:</li>
          <li>{currentUserHighscore}</li>
        </ul>
        <button
          onClick={() => dispatch({ type: QuizState.RETAKE })}
          className="mt-16 text-3xl hover:bg-[#f4f4f4] hover:text-[#1e266e] text[#fff2f7] rounded-full px-6 py-4 bg-[#1e266e]"
        >
          Retake Quiz
        </button>
      </div>
    </>
  );
}

// Results.jsx:60 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
