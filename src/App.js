import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Home from "./component/Home";
import Start from "./component/Start";
import Quiz from "./component/Quiz";
import PlayAgain from "./component/PLayAgain";

function App() {
  const [quiz, start] = useState({
    introPage: true,
    selectPage: false,
    questionPage: false,
    fetchData: false,
    shuffleOne: false,
    shuffleOption: [],
  });
  const [formData, updateformData] = useState({
    difficulty: "",
    category: "",
  });
  const [score, setScore] = useState({
    totalScore: 0,
    ids: [],
    correctBtn: false,
  });
  const [ques, setQues] = useState([]);
  let quizQuestions = undefined;

  useEffect(() => {
    if (!quiz.fetchData) return;
    fetch(
      `https://opentdb.com/api.php?amount=5&category=20&difficulty=${formData.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => setQues(data.results));
  }, [quiz.fetchData]);

  // useEffect(() => displayQues(), []);

  const startQuiz = () => {
    start((quiz) => ({
      ...quiz,
      introPage: false,
      selectPage: true,
    }));
  };

  const handleChange = (Event) => {
    const { name, value } = Event.target;
    updateformData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const submitForm = (Event) => {
    Event.preventDefault();
    formData.difficulty === "" && formData.category === ""
      ? alert("choose a question type")
      : start((quiz) => ({
          ...quiz,
          questionPage: true,
          fetchData: true,
          selectPage: false,
        }));
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  (() => {
    quizQuestions = ques.map((data, index) => {
      const { correct_answer, incorrect_answers, question } = data;
      let choices = [...incorrect_answers, correct_answer];
      shuffle(choices);
      const checkChoices = (event, selected, id, correctBtn) => {
        if (selected === data.correct_answer) {
          setScore((prevScore) => ({
            ...prevScore,
            totalScore: prevScore.totalScore + 1,
          }));
        }
        setScore((prevScore) => ({
          ...prevScore,
          ids: prevScore.ids.includes(id)
            ? prevScore.ids
            : [...prevScore.ids, id],
        }));
      };
      return (
        <Quiz
          key={nanoid()}
          id={index + 1}
          question={question}
          correct_answer={correct_answer}
          choices={choices}
          checkChoices={checkChoices}
          score={score}
          correctBtn={score.correctBtn}
          data={data.correct_answer}
        />
      );
    });
  })();

  function startPage() {
    start((quiz) => ({
      ...quiz,
      selectPage: !quiz.selectPage,
      questionPage: !quiz.questionPage,
      fetchData: !quiz.fetchData,
    }));
    setScore(() => ({
      totalScore: 0,
      ids: [],
    }));
    setQues([]);
  }

  return (
    <div className="App">
      {quiz.introPage && <Home startQuiz={startQuiz} />}
      {quiz.selectPage && (
        <Start
          formData={formData}
          handleChange={handleChange}
          submitForm={submitForm}
        />
      )}
      {ques.length > 0 && <h1>{ques[0].category}</h1>}
      {ques.length > 0 && <h3>LeveL: {ques[0].difficulty}</h3>}
      <div className="quiz-main">{quiz.questionPage && quizQuestions}</div>
      {score.ids.length === 5 ? (
        <h1 className="total-score">{`Your Total score is ${score.totalScore}/5`}</h1>
      ) : (
        ""
      )}
      <div className="start-btn">
        {score.ids.length === 5 ? <PlayAgain startPage={startPage} /> : ""}
      </div>
    </div>
  );
}

export default App;
