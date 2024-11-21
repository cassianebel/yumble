import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import IngredientSearchForm from "./IngredientSearchForm";

const IngredientSearchResults = () => {
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const ingredients = params.get("ingredients");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Error response body:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
        console.log("Recipe data:", data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [ingredients]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedResults(results.slice(indexOfFirstItem, indexOfLastItem));
  }, [results, currentPage]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const goToPage = (page) => {
    setSearchParams({ ingredients, page });
    navigate(`?ingredients=${ingredients}&page=${page}`);
  };

  return (
    <div>
      <IngredientSearchForm prevIngredients={ingredients} />
      <h2>Search Results</h2>
      <div className="flex flex-wrap gap-4">
        {displayedResults.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IngredientSearchResults;
