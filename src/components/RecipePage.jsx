import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";

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

  const healthScore = Math.round(recipe.healthScore);
  const spoonacularScore = Math.round(recipe.spoonacularScore);

  return (
    <>
      <div className="grid md:grid-cols-2">
        <img src={recipe.image} alt={recipe.title} className="" />
        <div>
          <h1 className="text-2xl font-display text-zinc-800 text-center text-balance">
            {recipe.title}
          </h1>
          <div className="flex justify-center text-center">
            <div>
              <div>{healthScore}</div>
              <div className="text-xs">Health Score</div>
            </div>
            <div>
              <div>{spoonacularScore}</div>
              <div className="text-xs">Spoonacular Score</div>
            </div>
            <div>
              <div>{recipe.servings}</div>
              <div className="text-xs">Servings</div>
            </div>
            <div>
              <div>{time}</div>
              <div className="text-xs">Ready In</div>
            </div>
          </div>
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

      <p className="text-xs text-zinc-700">
        Recipe sourced from{" "}
        <a
          href={recipe.sourceUrl}
          className="text-apple-700 hover:text-apple-600 focus:text-apple-600"
        >
          {recipe.sourceName}
        </a>
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        <ContentCard>
          <h2 className="text-xl font-display text-zinc-800">Ingredients</h2>
          <p>Serves: {recipe.servings}</p>
          <ul className="text-zinc-800 text-lg">
            {recipe.extendedIngredients?.map((ingredient) => (
              <li
                key={ingredient.id}
                className="py-2 border-b border-zinc-300 last:border-none"
              >
                {ingredient.original}
              </li>
            ))}
          </ul>
        </ContentCard>
        <ContentCard>
          <h2 className="text-xl font-display text-zinc-800">Instructions</h2>
          <p>Ready in: {time}</p>
          <ol className="list-decimal ps-4 text-zinc-800">
            {instructions.map((step) => (
              <li className="py-2" key={step.number}>
                {step.step}
              </li>
            ))}
          </ol>
        </ContentCard>
        <ContentCard>
          <h2 className="text-xl font-display text-zinc-800">Nutrition</h2>
          <p>
            Serving Size: {recipe.nutrition?.weightPerServing.amount}
            {recipe.nutrition?.weightPerServing.unit}
          </p>
          <ul>
            <li className="grid grid-cols-3 gap-2 py-2 border-b border-zinc-300 text-xs mt-auto">
              <div>NUTRIENT</div>
              <div>AMOUNT</div>
              <div>% DAILY NEEDS</div>
            </li>
            {recipe.nutrition?.nutrients.map((nutrient) => (
              <li
                key={nutrient.name}
                className="grid grid-cols-3 gap-2 py-2 text-sm border-b border-zinc-300 last:border-none"
              >
                <div>{nutrient.name}</div>
                <div>
                  {nutrient.amount} {nutrient.unit}
                </div>
                <div>{nutrient.percentOfDailyNeeds}%</div>
              </li>
            ))}
          </ul>
        </ContentCard>
      </div>
    </>
  );
};

export default RecipePage;
