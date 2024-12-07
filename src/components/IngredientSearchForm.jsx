import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import ContentCard from "./ContentCard";

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
    <ContentCard>
      <form onSubmit={handleSearch} className="text-center">
        <label
          htmlFor="ingredients"
          className="text-center my-2 text-sm text-zinc-600 dark:text-zinc-400"
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
    </ContentCard>
  );
};

export default IngredientSearchForm;
