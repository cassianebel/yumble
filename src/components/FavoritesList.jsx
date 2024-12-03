import { NavLink } from "react-router-dom";
import SmallRecipeCard from "./SmallRecipeCard";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const FavoritesList = ({ favorites, setFavorites }) => {
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
      <h2 className="font-display text-2xl">
        <NavLink
          to="/favorites"
          className=" text-apple-700 rounded-full hover:text-apple-600 focus:text-apple-600 transition-all duration-200 ease-in-out"
        >
          Favorite Recipes
        </NavLink>
      </h2>
      <div className="flex items-center overflow-hidden relative w-full">
        <button
          className="hidden absolute md:flex items-center justify-center left-0 text-3xl text-apple-500 rounded-full m-2 border-2 focus:outline-none  focus:border-apple-300 focus:scale-110"
          onClick={scrollLeft}
        >
          <IoIosArrowDropleftCircle />
        </button>
        <div
          id="randomRecipeRow"
          className="flex gap-6 overflow-x-auto scroll-smooth p-4 md:mx-14"
        >
          {favorites.map((recipe) => (
            <SmallRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <button
          className="hidden absolute md:flex items-center justify-center right-0 text-3xl text-apple-500 rounded-full m-2 border-2 focus:outline-none  focus:border-apple-300 focus:scale-110"
          onClick={scrollRight}
        >
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
};

export default FavoritesList;
