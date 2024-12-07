import { NavLink } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <NavLink
      to={`/recipe/${recipe.id}`}
      className=" bg-zinc-50 dark:bg-zinc-800 shadow rounded-xl hover:scale-105 focus:scale-105 focus:outline-none focus:border-2 focus:border-apple-400 transition-all duration-300 ease-in-out"
    >
      <div className="grid grid-cols-2 items-center md:block">
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-xl rounded-r-none md:rounded-b-none md:rounded-xl"
          />
        </div>
        <h2 className="m-4 text-lg text-zinc-800 dark:text-zinc-300 md:text-center text-balance">
          {recipe.title}
        </h2>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
