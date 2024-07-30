import { useQuiz } from "../hooks/useQuiz";

export default function StartButton() {
  const { dispatch, QuizState } = useQuiz();
  return (
    <button
      onClick={() => dispatch({ type: QuizState.START })}
      className="text-3xl px-8 py-4 text-[#fff2f7] bg-[#1e266e] rounded-full mt-12"
    >
      Play
    </button>
  );
}
