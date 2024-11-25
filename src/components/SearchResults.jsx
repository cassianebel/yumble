import { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsRef = useRef(null);
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
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [query, currentPage, diets]);

  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (page) => {
    navigate(`?q=${query}${dietParam}&page=${page}`);
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <div className="m-5 max-w-xl md:mx-auto">
        <SearchForm prevQuery={query} prevDiets={diets} />
      </div>
      <h2 className="sr-only">Search Results</h2>
      <div
        ref={resultsRef}
        className="flex flex-wrap gap-6 justify-center max-w-[1700px] mx-auto"
      >
        {results.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </div>
  );
};

export default SearchResults;
