import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const diets = params.get("diet")?.split(",") || [];
  const currentPage = parseInt(params.get("page")) || 1;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const offset = (currentPage - 1) * 10;
    const dietParam = diets.length > 0 ? `&diet=${diets.join(",")}` : "";
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&offset=${offset}${dietParam}&apiKey=${apiKey}`;

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
        setResults(data.results);
        setTotalResults(data.totalResults);
        console.log("Recipe data:", data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [query, currentPage, diets]);

  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (page) => {
    navigate(`?q=${query}&page=${page}`);
  };

  return (
    <div>
      <h2>Search Results</h2>
      <div className="flex flex-wrap gap-4">
        {results.map((recipe) => (
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

export default SearchResults;
