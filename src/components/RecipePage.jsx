import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;
    const instructionsUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;

    fetch(recipeUrl)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Error response body:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
        console.log("Recipe data:", data);
      })
      .catch((error) => console.error("Fetch error:", error));

    fetch(instructionsUrl)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Error response body:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setInstructions(data[0].steps);
        console.log("Instructions data:", data[0].steps);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [recipeId]);

  const convertToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours and ${remainingMinutes} minutes`;
  };

  let time;
  if (recipe.reacyInMinutes >= 60) {
    time = convertToHours(recipe.readyInMinutes);
  } else {
    time = `${recipe.readyInMinutes} minutes`;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>
        Recipe sourced from <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
      </p>
      <p>Health score: {recipe.healthScore}</p>
      <p>Spoonacular score: {recipe.spoonacularScore}</p>
      <img src={recipe.image} alt={recipe.title} />
      <div>
        <h2>Ingredients</h2>
        <p>Serves: {recipe.servings}</p>
        <ul>
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Instructions</h2>
        <p>Ready in: {time}</p>
        <ol className="list-decimal ps-4">
          {instructions.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      </div>
      <div>
        <h2>Nutrition</h2>
        <p>
          Serving Size: {recipe.nutrition?.weightPerServing.amount}
          {recipe.nutrition?.weightPerServing.unit}
        </p>
        <ul>
          {recipe.nutrition?.nutrients.map((nutrient) => (
            <li key={nutrient.name}>
              {nutrient.name}: {nutrient.amount} {nutrient.unit}{" "}
              {nutrient.percentOfDailyNeeds}%
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {recipe.dairyFree && <li>Dairy Free</li>}
          {recipe.glutenFree && <li>Gluten Free</li>}
          {recipe.vegan && <li>Vegan</li>}
          {recipe.vegetarian && <li>Vegetarian</li>}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
