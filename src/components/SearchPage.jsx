import { useState } from "react";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";
import SearchChooser from "./SearchChooser";

const SearchPage = () => {
  const [tab, setTab] = useState("diet");

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <SearchChooser tab={tab} setTab={setTab} />
        <div className="m-5 max-w-xl md:mx-auto">
          {tab === "ingredients" ? (
            <IngredientSearchForm />
          ) : tab === "nutrients" ? (
            <NutrientSearchForm />
          ) : (
            <SearchForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
