import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import SearchResults from "./components/SearchResults";
import IngredientSearchResults from "./components/IngredientSearchResults";
import NutrientSearchResults from "./components/NutrientSearchResults";
import "./App.css";

function App() {
  return (
    <>
      <header className="">
        <NavLink
          to="/"
          className="inline-block font-display text-apple-400 drop-shadow-md text-2xl m-2 rotate-[-6deg] hover:rotate-0 transition-all duration-200 ease-in-out"
        >
          yumble
        </NavLink>
      </header>
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/searchbyingredients"
            element={<IngredientSearchResults />}
          />
          <Route
            path="/searchbynutrients"
            element={<NutrientSearchResults />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
