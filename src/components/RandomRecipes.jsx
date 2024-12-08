import { useState, useEffect } from "react";
import SmallRecipeCard from "./SmallRecipeCard";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const RandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await fetch("/.netlify/functions/fetchRandomRecipes");
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRandomRecipes(data.recipes);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchRandomRecipes();
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
      <h2 className="font-display text-2xl text-zinc-700 dark:text-zinc-300">
        Random Recipes
      </h2>
      <div className="flex items-center overflow-hidden relative w-full">
        <button
          className="hidden absolute md:flex items-center justify-center left-0 text-3xl text-apple-500 rounded-full m-2 border-2 border-transparent focus:outline-none focus:border-apple-300 focus:scale-110"
          onClick={scrollLeft}
        >
          <IoIosArrowDropleftCircle />
        </button>
        <div
          id="randomRecipeRow"
          className="flex gap-6 overflow-x-auto scroll-smooth p-4 md:mx-14"
        >
          {randomRecipes.map((recipe) => (
            <SmallRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <button
          className="hidden absolute md:flex items-center justify-center right-0 text-3xl text-apple-500 rounded-full m-2 border-2 border-transparent focus:outline-none focus:border-apple-300 focus:scale-110"
          onClick={scrollRight}
        >
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
};

export default RandomRecipes;
