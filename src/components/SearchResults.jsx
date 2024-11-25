import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import SearchForm from "./SearchForm";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const query = params.get("q");
  const diets = useMemo(() => params.get("diet")?.split(",") || [], [params]);
  const dietParam = diets.length > 0 ? `&diet=${diets.join(",")}` : "";
  const currentPage = parseInt(params.get("page")) || 1;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const offset = (currentPage - 1) * 10;
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
    navigate(`?q=${query}&${dietParam}&page=${page}`);
  };

  return (
    <div>
      <div className="m-5 max-w-xl md:mx-auto">
        <SearchForm prevQuery={query} prevDiets={diets} />
      </div>
      <h2>Search Results</h2>
      <div className="flex flex-wrap gap-6 justify-center max-w-[1700px] mx-auto">
        {results.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="flex gap-3 justify-center m-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-zinc-300 h-10 px-4 rounded-md"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={
              currentPage === index + 1
                ? "bg-apple-300 w-10 h-10 rounded-md"
                : "bg-zinc-300 w-10 h-10 rounded-md"
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-zinc-300 h-10 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
