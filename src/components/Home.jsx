import RandomRecipes from "./randomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";

const Home = () => {
  return (
    <div>
      <div className="m-5">
        <SearchForm />
      </div>
      <div className="m-5">
        <IngredientSearchForm />
      </div>
      <div className="m-5">
        <NutrientSearchForm />
      </div>
      <div className="m-5">
        {
          //<RandomRecipes />
        }
      </div>
    </div>
  );
};

export default Home;
