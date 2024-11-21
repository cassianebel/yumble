import RandomRecipes from "./randomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";

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
        <RandomRecipes />
      </div>
    </div>
  );
};

export default Home;
