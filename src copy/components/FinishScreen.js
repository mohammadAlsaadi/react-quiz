function FinishScreen({ point, maxPointPossible, highscore, dispatch }) {
  const percentage = (point / maxPointPossible) * 100;
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 20 && percentage < 50) emoji = "🤏";
  if (percentage >= 0 && percentage < 20) emoji = "🤦‍♂️";

  return (
    <div>
      <p className="result">
        <span>{emoji}</span>
        You scored{" "}
        <strong>
          {point} out of {maxPointPossible} ({Math.ceil(percentage)}%)
        </strong>
      </p>
      <p className="highscore">(Highscore : {highscore} points )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
