import { useQuiz } from "../context/QuizContext";
import Options from "./Options";
function Question() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
