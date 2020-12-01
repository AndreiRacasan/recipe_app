import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  return (
    <div className="recipe">
      <h2>{label}</h2>
      <img src={image} alt={label} />
      <div className="buttons">
        <a href={url} target="_blank" rel="noopener noreferrer" id="url">
          Source
        </a>
        <button id="ingredients" onClick={() => setShow(!show)}>Ingredients</button>
      </div>
      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;