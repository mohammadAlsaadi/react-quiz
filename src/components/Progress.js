import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { questionLength, index, point, maxPointPossible, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={questionLength}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1}/{questionLength}
        </strong>
      </p>

      <p>
        <strong>
          {point}/{maxPointPossible}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
