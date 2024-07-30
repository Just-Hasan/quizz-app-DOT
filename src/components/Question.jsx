import { useQuiz } from "../hooks/useQuiz";
import he from "he";
export default function Question() {
  const { question, index, questions } = useQuiz();
  const questionStr = `${he.decode(question.question)}`;

  return (
    <div className="bg-[#f8f9fa] w-full relative border-blue-500 border-[0.5px] shadow-xl text-[#1c1c1c] p-24 rounded-xl  mb-16 ">
      <h2 className="leading-[1.5] text-5xl ">{questionStr}</h2>
      <p className="absolute top-[0] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-blue-500 text-2xl py-2 px-4 rounded-full text-[#f8f9fa] border-[#f8f9fa] border-4">
        Question {index + 1} of {questions.length}
      </p>
    </div>
  );
}
