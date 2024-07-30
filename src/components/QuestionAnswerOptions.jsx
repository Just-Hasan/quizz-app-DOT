import { useMemo } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { shuffleArr } from "../lib/helper";

export default function QuestionAnswerOptions() {
  const { question, dispatch, QuizState, index } = useQuiz();

  const shuffledAnswers = useMemo(() => {
    return shuffleArr(question?.all_answer);
  }, [index]);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {shuffledAnswers?.map((answer, i) => {
        return (
          <li
            onClick={() =>
              dispatch({ type: QuizState.ANSWER, payload: { answer } })
            }
            key={i}
            className="bg-[#f8f9fa] border-blue-500 border-[0.5px] shadow-md text-[#1c1c1c] text-3xl p-4 rounded-full cursor-pointer hover:bg-blue-200 hover:text-[#1864ab] transition-all"
          >
            {answer}
          </li>
        );
      })}
    </ul>
  );
}
