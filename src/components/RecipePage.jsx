import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentCard from "./ContentCard";
import Stat from "./Stat";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const RecipePage = ({ favorites, setFavorites }) => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        window.scrollTo(0, 0);
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
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [recipeId]);

  const healthScore = Math.round(recipe.healthScore);
  const spoonacularScore = Math.round(recipe.spoonacularScore);

  function addFavorite() {
    const newFavorite = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    };
    const newFavorites = [...favorites, newFavorite];
    setFavorites(newFavorites);
    localStorage.setItem("yumbleFavs", JSON.stringify(newFavorites));
  }

  function removeFavorite() {
    const newFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    setFavorites(newFavorites);
    localStorage.setItem("yumbleFavs", JSON.stringify(newFavorites));
  }

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="dot-hourglass">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
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
            <ul className="flex flex-wrap justify-center items-center gap-4">
              {recipe.dairyFree && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-zinc-100 border-zinc-300">
                  Dairy Free
                </li>
              )}
              {recipe.glutenFree && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-zinc-100 border-zinc-300">
                  Gluten Free
                </li>
              )}
              {recipe.vegan && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-zinc-100 border-zinc-300">
                  Vegan
                </li>
              )}
              {recipe.vegetarian && (
                <li className="p-2 px-3 rounded-full uppercase font-light text-xs border bg-zinc-100 border-zinc-300">
                  Vegetarian
                </li>
              )}
            </ul>
          </div>
          <h1 className="text-3xl font-display text-zinc-700 text-center text-balance">
            {recipe.title}{" "}
            {isFavorite ? (
              <button
                onClick={removeFavorite}
                className="text-apple-500 text-2xl hover:text-apple-400 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaHeart />
              </button>
            ) : (
              <button
                onClick={addFavorite}
                className="text-apple-500 text-2xl hover:text-apple-400 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <FaRegHeart />
              </button>
            )}
          </h1>
          <p className="text-xs">
            Recipe sourced from{" "}
            <a
              href={recipe.sourceUrl}
              className="text-apple-700 hover:text-apple-600 focus:text-apple-600"
            >
              {recipe.sourceName}
            </a>
          </p>
          <div className="flex justify-center items-center gap-4">
            <Stat number={recipe.servings} text="Servings" />
            <Stat number={recipe.readyInMinutes} text="Minutes" />
            <Stat number={healthScore} text="Health" />
            <Stat number={spoonacularScore} text="Rating" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        <ContentCard>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display text-zinc-700">Ingredients</h2>
            <Stat number={recipe.servings} text="Servings" />
          </div>
          <ul className="text-lg">
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
          <ol className="list-decimal ps-4">
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
          <p className="text-sm">Amount per serving.</p>
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
                  {Math.round(nutrient.amount)} {nutrient.unit}
                </div>
                <div>{Math.round(nutrient.percentOfDailyNeeds)}%</div>
              </li>
            ))}
          </ul>
        </ContentCard>
      </div>
    </div>
  );
};

export default RecipePage;
