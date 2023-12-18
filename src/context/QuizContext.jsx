import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContex = createContext();

const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // status options : 'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };
    case "reset":
      // return { ...state, index: 0, status: "ready", answer: null, point: 0 };
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Don't define");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    point,
    highscore,
    secondsRemaining,
  } = state;
  const questionLength = questions.length;
  const hasAnswered = answer !== null;
  const maxPointPossible = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContex.Provider
      value={{
        questions,
        status,
        index,
        answer,
        point,
        highscore,
        secondsRemaining,
        questionLength,
        maxPointPossible,
        index,

        dispatch,
      }}
    >
      {children}
    </QuizContex.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContex);
  if (context === undefined)
    throw new Error("context does not inside provider");
  return context;
}

export { QuizProvider, useQuiz };
