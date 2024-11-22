import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IngredientSearchForm = ({ prevIngredients }) => {
  const [ingredients, setIngredients] = useState(prevIngredients || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      navigate(
        `/searchbyingredients?ingredients=${encodeURIComponent(
          ingredients.replace(/ /g, "")
        )}`
      );
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="ingredients">
        Enter ingredients you have on hand or want to cook with
      </label>
      <input
        type="text"
        placeholder="apples,flour,sugar,..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        name="ingredients"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default IngredientSearchForm;
