import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";

export default function Timer() {
  const { secondsRemaining, dispatch, QuizState } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      return dispatch({ type: QuizState.TICK });
    }, 1000);

    return () => clearInterval(id);
  }, [QuizState.TICK, dispatch]);
  return (
    <div className="text-[#f8f9fa] text-3xl absolute bottom-[10%] left-[50%] translate-x-[-50%]">
      {mins.toString().padStart(2, "0")} : {seconds.toString().padStart(2, "0")}
    </div>
  );
}
