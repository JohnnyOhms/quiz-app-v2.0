import React from "react";

export default function Home(props) {
  return (
    <div className="home">
      <div className="home__start">
        <h2>Categorized Quiz Questions</h2>
        <h3>Attempt all</h3>
        <button className="start__btn" onClick={props.startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
