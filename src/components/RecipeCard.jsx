import { NavLink } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <NavLink to={`/recipe/${recipe.id}`}>
      <div className="w-[150px] grow-0 shrink-0 flex-auto">
        <img src={recipe.image} alt={recipe.title} />
        <h3>{recipe.title}</h3>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
