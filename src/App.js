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
    shuffleOne: false,
  });
  const [formData, updateformData] = useState({
    difficulty: "",
    category: "",
  });
  const [score, setScore] = useState({
    totalScore: 0,
    on: false,
  });
  const [ques, setQues] = useState([]);
  let quizQuestions = undefined;

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

  function shuffle(array) {
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
  }

  (() => {
    quizQuestions = ques.map((data) => {
      const { correct_answer, incorrect_answers, question } = data;
      let choices = [...incorrect_answers, correct_answer];
      if (quiz.shuffleOne) {
        // return choices;
      } else {
        shuffle(choices);
        start((quiz) => ({
          ...quiz,
          shuffleOne: true,
        }));
        console.log("shuffled");
      }

      function checkChoices(selected) {
        if (selected === data.correct_answer) {
          setScore((prevScore) => prevScore + 1);
          console.log("correct");
        }
      }
      return (
        <Quiz
          key={nanoid()}
          question={question}
          correct_answer={correct_answer}
          choices={choices}
          checkChoices={checkChoices}
        />
      );
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
