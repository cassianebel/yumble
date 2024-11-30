import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import Stat from "./Stat";

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
      <div className="grid md:grid-cols-2 ">
        <div className="flex justify-center items-center md:mx-5">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="md:rounded-2xl "
          />
        </div>
        <div className="flex flex-col gap-6 justify-center items-center m-5">
          <div>
            <ul className="flex justify-center items-center gap-4">
              {recipe.dairyFree && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-apple-200 border-apple-400 text-apple-800">
                  Dairy Free
                </li>
              )}
              {recipe.glutenFree && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-apple-200 border-apple-400 text-apple-800">
                  Gluten Free
                </li>
              )}
              {recipe.vegan && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-apple-200 border-apple-400 text-apple-800">
                  Vegan
                </li>
              )}
              {recipe.vegetarian && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-apple-200 border-apple-400 text-apple-800">
                  Vegetarian
                </li>
              )}
            </ul>
          </div>
          <h1 className="text-3xl font-display text-zinc-700 text-center text-balance">
            {recipe.title}
          </h1>
          <p className="text-xs text-zinc-700">
            Recipe sourced from{" "}
            <a
              href={recipe.sourceUrl}
              className="text-apple-700 hover:text-apple-600 focus:text-apple-600"
            >
              {recipe.sourceName}
            </a>
          </p>
          <div className="flex justify-center items-center gap-4">
            <Stat number={healthScore} text="Health" />
            <Stat number={spoonacularScore} text="Rating" />
            <Stat number={recipe.servings} text="Servings" />
            <Stat number={recipe.readyInMinutes} text="Minutes" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        <ContentCard>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display text-zinc-700">Ingredients</h2>
            <Stat number={recipe.servings} text="Servings" />
          </div>
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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display text-zinc-700">
              Instructions
            </h2>
            <Stat number={recipe.readyInMinutes} text="Minutes" />
          </div>
          <ol className="list-decimal ps-4 text-zinc-800">
            {instructions.map((step) => (
              <li className="py-2" key={step.number}>
                {step.step}
              </li>
            ))}
          </ol>
        </ContentCard>
        <ContentCard>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display text-zinc-700">
              Nutrition Facts
            </h2>
            <Stat
              number={
                recipe.nutrition?.weightPerServing.amount +
                recipe.nutrition?.weightPerServing.unit
              }
              text="Serving Size"
            />
          </div>
          <p className="text-zinc-800 text-sm">Amount per serving.</p>
          <ul>
            <li className="grid grid-cols-3 gap-2 py-2 border-b border-zinc-300 text-xs mt-auto">
              <div>NUTRIENT</div>
              <div>AMOUNT</div>
              <div>% DAILY VALUE</div>
            </li>
            {recipe.nutrition?.nutrients.map((nutrient) => (
              <li
                key={nutrient.name}
                className="grid grid-cols-3 gap-2 py-2 text-sm border-b border-zinc-300 last:border-none"
              >
                {nutrient.name === "Calories" ? (
                  <div className="font-black">{nutrient.name}</div>
                ) : nutrient.name === "Fat" ||
                  nutrient.name === "Cholestoral" ||
                  nutrient.name === "Sodium" ||
                  nutrient.name === "Carbohydrates" ||
                  nutrient.name === "Protein" ? (
                  <div className="font-bold">{nutrient.name}</div>
                ) : (
                  <div>{nutrient.name}</div>
                )}
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
