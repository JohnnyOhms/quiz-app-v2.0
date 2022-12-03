import React from "react";

export default function Quiz(props) {
  const style = {
    correct: {
      // color: "#cf9634",
      color: "#3f2b0a",
      border: "2px solid #cf9634",
    },
  };
  let choice = props.choices.map((choice, index) => (
    <button
      disabled={props.score.ids.includes(props.id)}
      className="button-62"
      key={index + 1}
      onClick={(event) =>
        props.checkChoices(event, choice, props.id, props.correctBtn)
      }
      style={style.correct}
    >
      {choice}
    </button>
  ));
  return (
    <div className="quiz__container">
      <span className="question">{props.question}</span>
      <div className="options">{choice}</div>
    </div>
  );
}
