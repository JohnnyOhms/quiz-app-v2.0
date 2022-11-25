import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Home from "./component/Home";
import Start from "./component/Start";
import Quiz from "./component/Quiz";

function App() {
  const [quiz, start] = useState({
    introPage: true,
    selectPage: false,
    questionPage: false,
    fetchData: false,
  });
  const [formData, updateformData] = useState({
    difficulty: "",
    category: "",
  });
  const [ques, setQues] = useState([]);

  useEffect(() => {
    if (!quiz.fetchData) return;
    fetch(
      `https://opentdb.com/api.php?amount=5&category=31&difficulty=${formData.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => setQues(data.results));
  }, [quiz.fetchData]);

  function startQuiz() {
    start((quiz) => ({
      ...quiz,
      introPage: false,
      selectPage: true,
    }));
  }

  function handleChange(Event) {
    const { name, value } = Event.target;
    updateformData((form) => ({
      ...form,
      [name]: value,
    }));
  }

  function submitForm(Event) {
    Event.preventDefault();
    if (formData.difficulty === "" || formData.category === "") return;
    start((quiz) => ({
      ...quiz,
      questionPage: true,
      fetchData: true,
      selectPage: false,
    }));
  }
  let quizQuestions = undefined;
  (() => {
    quizQuestions = ques.map((data) => {
      return <Quiz key={nanoid()} {...data} />;
    });
  })();

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
      <div className="quiz-main">
        {ques.length > 0 && <h1>{ques[0].category}</h1>}
        {ques.length > 0 && <h3>{ques[0].difficulty}</h3>}
        {quiz.questionPage && quizQuestions}
      </div>
    </div>
  );
}

export default App;
