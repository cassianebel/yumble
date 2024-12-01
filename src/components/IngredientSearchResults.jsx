import { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import IngredientSearchForm from "./IngredientSearchForm";
import Pagination from "./Pagination";

const IngredientSearchResults = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const resultsRef = useRef(null);
  const location = useLocation();
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
        setLoading(false);
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
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
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <div className="m-5 max-w-xl md:mx-auto">
        <IngredientSearchForm prevIngredients={ingredients} />
      </div>
      <h2 className="sr-only">Search Results</h2>
      {loading ? (
        <div className="mt-10 flex justify-center items-center">
          <div className="dot-hourglass">Loading...</div>
        </div>
      ) : results.length === 0 ? (
        <div>
          <p className="text-center">No results found.</p>
        </div>
      ) : (
        <div
          ref={resultsRef}
          className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1700px] px-5 mx-auto"
        >
          {displayedResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
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

export default IngredientSearchResults;
