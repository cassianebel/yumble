import { useState, useEffect } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import Home from "./components/Home";
import RecipePage from "./components/RecipePage";
import SearchResults from "./components/SearchResults";
import "./App.css";

function App() {
  return (
    <>
      <header>Yumble</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
