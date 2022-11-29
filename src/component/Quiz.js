import React, { useEffect } from "react";

export default function Quiz(props) {
  useEffect(() => {});
  let choice = props.choices.map((choice, index) => (
    <button
      disabled={props.score.ids.includes(props.id)}
      className="btn"
      key={index + 1}
      onClick={(event) => props.checkChoices(event, choice, props.id)}
    >
      {choice}
    </button>
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
