import { useState } from "react";
import RandomRecipes from "./randomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";
import SearchChooser from "./SearchChooser";
import FavoritesList from "./FavoritesList";

const Home = ({ favorites, setFavorites }) => {
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
      {favorites.length > 0 && (
        <div className="m-5">
          <FavoritesList favorites={favorites} setFavorites={setFavorites} />
        </div>
      )}
      <div className="m-5 mb-20">
        <RandomRecipes />
      </div>
    </div>
  );
};

export default Home;
