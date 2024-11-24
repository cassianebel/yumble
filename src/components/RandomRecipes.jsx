import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const RandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Error response body:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => setRandomRecipes(data.recipes))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const scrollRow = (direction) => {
    const row = document.getElementById("randomRecipeRow");
    const scrollAmount = 300; // Adjust based on card width
    direction === "left"
      ? (row.scrollLeft -= scrollAmount)
      : (row.scrollLeft += scrollAmount);
  };

  function scrollLeft() {
    scrollRow("left");
  }

  function scrollRight() {
    scrollRow("right");
  }

  return (
    <div>
      <h2>Random Recipes</h2>
      <div className="flex items-center overflow-hidden relative w-full">
        <button
          className="hidden absolute md:flex items-center justify-center left-0 text-3xl text-apple-400 rounded-full p-2"
          onClick={scrollLeft}
        >
          <IoIosArrowDropleftCircle />
        </button>
        <div
          id="randomRecipeRow"
          className="flex gap-6 overflow-x-auto scroll-smooth p-4 md:mx-14"
        >
          {randomRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <button
          className="hidden absolute md:flex items-center justify-center right-0 text-3xl text-apple-400 rounded-full p-2"
          onClick={scrollRight}
        >
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
};

export default RandomRecipes;
