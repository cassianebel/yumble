import { NavLink } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <NavLink
      to={`/recipe/${recipe.id}`}
      className="min-w-[212px] max-w-[312px] bg-zinc-50 shadow rounded-xl pb-1 hover:scale-105 focus:scale-105 focus:outline-none focus:border-2 focus:border-apple-400 transition-all duration-300 ease-in-out"
    >
      <div className=" ">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-xl rounded-b-none"
        />
        <h3 className="m-2 text-sm text-zinc-800 text-center text-balance">
          {recipe.title}
        </h3>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
