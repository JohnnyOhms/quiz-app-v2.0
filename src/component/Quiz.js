import React from "react";

export default function Quiz(props) {
  console.log(props);
  return (
    <div className="quiz-container">
      <div className="quiz-container__questions">
        <span className="question">{props.question}</span>
        <div className="options">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
