import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, questionLength } = useQuiz();

  if (answer === null) return;

  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        index > 13
          ? dispatch({ type: "finish" })
          : dispatch({ type: "nextQuestion" });
      }}
    >
      {index === questionLength - 1 ? "Finish Quiz" : "Next"}
    </button>
  );
}

export default NextButton;
