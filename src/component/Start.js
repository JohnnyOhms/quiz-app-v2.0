import React from "react";

export default function Start(props) {
  return (
    <div className="start-select">
      <form className="form-select" onSubmit={props.submitForm}>
        <input
          type="radio"
          name="difficulty"
          id="easy"
          value="easy"
          checked={props.formData.difficulty === "easy"}
          onChange={props.handleChange}
        />
        <label htmlFor="easy">easy</label> <br />
        <input
          type="radio"
          name="difficulty"
          id="medium"
          value="medium"
          checked={props.formData.difficulty === "medium"}
          onChange={props.handleChange}
        />
        <label htmlFor="medium">medium</label> <br />
        <input
          type="radio"
          name="difficulty"
          id="hard"
          value="hard"
          checked={props.formData.difficulty === "hard"}
          onChange={props.handleChange}
        />
        <label htmlFor="hard">hard</label> <br />
        <label htmlFor="category">select question category</label>
        <select
          value={props.formData.category}
          onChange={props.handleChange}
          name="category"
        >
          <option value=""></option>
          <option value="computer">Computer</option>
          <option value="sports">Sports</option>
          <option value="history">History</option>
          <option value="animals">Animals</option>
          <option value="vehicles">Vehicles</option>
          <option value="Anime">Animes & Manga</option>
          <option value="music">Musics</option>
        </select>
        <button className="btn">Show Questions</button>
      </form>
    </div>
  );
}
