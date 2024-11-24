import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

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
    <form
      onSubmit={handleSearch}
      className="text-center bg-zinc-200 rounded-2xl p-5"
    >
      <label
        htmlFor="ingredients"
        className="text-center my-2 text-sm text-zinc-600"
      >
        Enter the ingredients you want to cook with
      </label>
      <SearchInput
        name="ingredients"
        query={ingredients}
        setQuery={setIngredients}
        placeholder="apples, flour, sugar..."
      />
      <SearchButton />
    </form>
  );
};

export default IngredientSearchForm;
