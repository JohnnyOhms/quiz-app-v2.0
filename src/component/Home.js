import React from "react";

export default function Home(props) {
  return (
    <div className="home">
      <div className="home__start">
        <h2>Quiz Questions</h2>
        <h3>Attempt all</h3>
        <div className="start__btn">
          <button className="button-89" onClick={props.startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
