function Progress({ questionLength, index, point, maxPointPossible, answer }) {
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
