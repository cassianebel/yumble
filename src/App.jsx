import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import SearchResults from "./components/SearchResults";
import IngredientSearchResults from "./components/IngredientSearchResults";
import NutrientSearchResults from "./components/NutrientSearchResults";
import "./App.css";

function App() {
  return (
    <>
      <header>Yumble</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/searchbyingredients"
          element={<IngredientSearchResults />}
        />
        <Route path="/searchbynutrients" element={<NutrientSearchResults />} />
      </Routes>
    </>
  );
}

export default App;
