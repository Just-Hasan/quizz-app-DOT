import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { shuffleArr } from "../lib/helper";

export const QuizContext = createContext();

const QuizState = {
  DATA_RECEIVED: "dataReceived",
  DATA_FAILED: "dataFailed",
  START: "start",
  ANSWER: "answer",
  TICK: "tick",
  PAUSE: "pause",
  RESUME: "resume",
  RETAKE: "retake",
};

const initialState = {
  questions: [],
  status: "loading",
  secondsRemaining: 0,
  index: 0,
  correctAnswer: 0,
  incorrectAnswer: 0,
};

const SECS_PER_QUESTION = 30;

const currentUser = JSON.parse(localStorage.getItem("dot_quizz_current_user"));

const currentUserQuiz = JSON.parse(
  localStorage.getItem("dot_quizz_user")
)?.find(
  (user) =>
    user.username === currentUser.username && user.email === currentUser.email
)?.quiz;

function reducer(state, action) {
  const question = state?.questions?.at(state.index);
  switch (action.type) {
    case QuizState.DATA_RECEIVED:
      // indicating that there's already questions in the questions array
      if (state.status === "pause") {
        return { ...state };
      }

      return { ...state, questions: action.payload.data, status: "ready" };
    case QuizState.DATA_FAILED:
      return { ...state, status: "error" };
    case QuizState.START:
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        index: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
      };
    case QuizState.ANSWER:
      if (action.payload.answer === question.correct_answer) {
        return {
          ...state,
          correctAnswer: (state.correctAnswer += 1),
          index: (state.index += 1),
          status:
            state.index === state.questions.length ? "finish" : state.status,
        };
      } else if (action.payload.answer !== question.correct_answer) {
        return {
          ...state,
          incorrectAnswer: (state.incorrectAnswer += 1),
          index: (state.index += 1),
          status:
            state.index === state.questions.length ? "finish" : state.status,
        };
      }

      break;
    case QuizState.TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case QuizState.RESUME:
      if (state.index === 15) {
        return initialState;
      } else {
        return { ...state, status: "active" };
      }
    case QuizState.RETAKE:
      return {
        ...state,
        index: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        status: "active",
        questions: shuffleArr(state.questions),
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    default:
      break;
  }
}

function QuizProvider({ children }) {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    reducer,
    currentUserQuiz || initialState
  );

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  });

  let {
    questions = [],
    status = "loading",
    secondsRemaining = 0,
    index = 0,
    correctAnswer = 0,
    incorrectAnswer = 0,
  } = state;

  questions = questions?.map((question) => {
    return {
      all_answer: [...question.incorrect_answers, question.correct_answer],
      ...question,
    };
  });

  const question = questions?.at(state.index);

  const providerValue = {
    state,
    question,
    questions,
    status,
    correctAnswer,
    incorrectAnswer,
    QuizState,
    dispatch,
    secondsRemaining,
    index,
  };

  return (
    <QuizContext.Provider value={providerValue}>
      {children}
    </QuizContext.Provider>
  );
}

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { QuizProvider };
