import { useState } from "react";
import RandomRecipes from "./randomRecipes";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";

const Home = () => {
  const [tab, setTab] = useState("diet");
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <form className="mt-10">
          <fieldset className="relative grid grid-cols-3 gap-2 bg-zinc-300 shadow-inner rounded-full p-1 max-w-max mx-auto text-center border-2 border-zinc-100 focus-within:border-apple-300">
            <legend className="sr-only">Choose your method of search</legend>
            <div
              className="absolute top-1 w-[113px] h-[36px] bg-zinc-50 shadow-md rounded-full transition-all duration-300 ease-in-out"
              style={
                tab === "ingredients"
                  ? { left: 125 }
                  : tab === "nutrients"
                  ? { left: 245 }
                  : { left: 4 }
              }
            ></div>
            <div>
              <input
                type="radio"
                id="tab-diet"
                name="tab"
                value="diet"
                checked={tab == "diet"}
                onChange={() => setTab("diet")}
                className="sr-only peer"
              />
              <label
                htmlFor="tab-diet"
                className="relative block w-full p-2 px-3 rounded-full cursor-pointer text-sm font-bold uppercase peer-checked:text-apple-700 transition-all duration-300"
              >
                Diets
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="tab-ingredients"
                name="tab"
                value="ingredients"
                checked={tab == "ingredients"}
                onChange={() => setTab("ingredients")}
                className="sr-only peer"
              />
              <label
                htmlFor="tab-ingredients"
                className="relative block w-full p-2 px-3 rounded-full cursor-pointer text-sm font-bold uppercase peer-checked:text-apple-600 transition-all duration-300"
              >
                Ingredients
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="tab-nutrients"
                name="tab"
                value="nutrients"
                checked={tab == "nutrients"}
                onChange={() => setTab("nutrients")}
                className="sr-only peer"
              />
              <label
                htmlFor="tab-nutrients"
                className="relative block w-full p-2 px-3 rounded-full cursor-pointer text-sm font-bold uppercase peer-checked:text-apple-600 transition-all duration-300"
              >
                Nutrients
              </label>
            </div>
          </fieldset>
        </form>
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

      <div className="m-5 mb-20">
        <RandomRecipes />
      </div>
    </div>
  );
};

export default Home;
