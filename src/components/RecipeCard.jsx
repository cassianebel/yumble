import { NavLink } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <NavLink to={`/recipe/${recipe.id}`}>
      <div className="min-w-[150px] max-w-[312px]">
        <img src={recipe.image} alt={recipe.title} className="" />
        <h3 className="m-1">{recipe.title}</h3>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
