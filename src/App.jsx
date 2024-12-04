import { useState, useEffect } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import SearchResults from "./components/SearchResults";
import IngredientSearchResults from "./components/IngredientSearchResults";
import NutrientSearchResults from "./components/NutrientSearchResults";
import FavoritesPage from "./components/FavoritesPage";
import SearchPage from "./components/SearchPage";
import { FaHeart } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import "./App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("yumbleFavs")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <>
      <header className="bg-zinc-100 shadow ">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className="inline-block font-display text-apple-500 text-3xl m-4 px-2 rounded-full border-2 border-transparent rotate-[-6deg] hover:rotate-0 hover:text-apple-400 focus:outline-none focus:border-apple-400 focus:rotate-0 focus:text-apple-400  transition-all duration-200 ease-in-out"
          >
            yumble
          </NavLink>
          <div className="flex justify-center items-center gap-4 mx-4 text-3xl">
            <NavLink
              to="/newsearch"
              className="text-apple-500 rotate-12 p-2 rounded-full border-2 border-transparent hover:text-apple-400 hover:rotate-0 focus:text-apple-400 focus:rotate-0 focus:outline-none focus:border-apple-400 transition-all duration-200 ease-in-out"
            >
              <IoSearch />
            </NavLink>
            <NavLink
              to="/favorites"
              className="text-apple-500 rotate-12 p-2 rounded-full border-2 border-transparent hover:text-apple-400 hover:rotate-0 focus:text-apple-400 focus:rotate-0 focus:outline-none focus:border-apple-400 transition-all duration-200 ease-in-out"
            >
              <FaHeart />
            </NavLink>
          </div>
        </div>
      </header>
      <main className="mt-8">
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} setFavorites={setFavorites} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={
              <RecipePage favorites={favorites} setFavorites={setFavorites} />
            }
          />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/searchbyingredients"
            element={<IngredientSearchResults />}
          />
          <Route
            path="/searchbynutrients"
            element={<NutrientSearchResults />}
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/newsearch" element={<SearchPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
