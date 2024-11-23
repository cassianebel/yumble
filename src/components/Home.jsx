import RandomRecipes from "./randomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";

const Home = () => {
  return (
    <div>
      <div className="p-10">
        <SearchForm />
      </div>
      <div className="p-10">
        <IngredientSearchForm />
      </div>
      <div className="p-10">
        <NutrientSearchForm />
      </div>
      <div className="p-10">
        {
          // <RandomRecipes />
        }
      </div>
    </div>
  );
};

export default Home;
