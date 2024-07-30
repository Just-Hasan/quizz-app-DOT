import { useContext } from "react";
import { QuizContext } from "../context/QuizProvider";

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("context is used outside of its scope");
  }
  return context;
}
