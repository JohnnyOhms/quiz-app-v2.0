import React, { useEffect } from "react";

export default function Quiz(props) {
  useEffect(() => {});
  let choice = props.choices.map((choice, index) => (
    <p key={index + 1} onClick={() => props.checkChoices(choice)}>
      {choice}
    </p>
  ));
  return (
    <div className="quiz-container">
      <div className="quiz-container__questions">
        <span className="question">{props.question}</span>
        <div className="options">{choice}</div>
      </div>
    </div>
  );
}
