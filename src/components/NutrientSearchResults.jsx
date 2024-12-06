import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecipeCard from "./RecipeCard";
import NutrientSearchForm from "./NutrientSearchForm";
import Pagination from "./Pagination";
import SearchChooser from "./SearchChooser";
import SearchForm from "./SearchForm";
import IngredientSearchForm from "./IngredientSearchForm";

const NutrientSearchResults = () => {
  const [tab, setTab] = useState("nutrients");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  //const [displayedResults, setDisplayedResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("q");
  const calories = useMemo(
    () => searchParams.get("calories").split(","),
    [searchParams]
  );
  const carbs = useMemo(
    () => searchParams.get("carbs").split(","),
    [searchParams]
  );
  const protein = useMemo(
    () => searchParams.get("protein").split(","),
    [searchParams]
  );
  const fat = useMemo(() => searchParams.get("fat").split(","), [searchParams]);

  useEffect(() => {
    console.log("Search params:", calories, carbs, protein, fat);
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const offset = (currentPage - 1) * 10;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&minCalories=${calories[0]}&maxCalories=${calories[1]}&minCarbs=${carbs[0]}&maxCarbs=${carbs[1]}&minProtein=${protein[0]}&maxProtein=${protein[1]}&minFat=${fat[0]}&maxFat=${fat[1]}&offset=${offset}&apiKey=${apiKey}`;

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
        setLoading(false);
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [query, calories, carbs, protein, fat]);

  // useEffect(() => {
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   setDisplayedResults(results.slice(indexOfFirstItem, indexOfLastItem));
  // }, [results, currentPage]);

  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (page) => {
    setSearchParams({
      q: query,
      calories: calories.join(","),
      carbs: carbs.join(","),
      protein: protein.join(","),
      fat: fat.join(","),
      page,
    });
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="m-5 max-w-xl md:mx-auto">
        <SearchChooser tab={tab} setTab={setTab} />
        <TransitionGroup>
          <CSSTransition key={tab} timeout={300} classNames="zoom">
            <div>
              {tab === "ingredients" ? (
                <IngredientSearchForm />
              ) : tab === "nutrients" ? (
                <NutrientSearchForm
                  prevQuery={query}
                  prevCalories={calories}
                  prevCarbs={carbs}
                  prevProtein={protein}
                  prevFat={fat}
                />
              ) : (
                <SearchForm />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <h1 className="sr-only">Search Results</h1>
      {loading ? (
        <div className="mt-10 flex justify-center items-center">
          <div className="dot-hourglass">Loading...</div>
        </div>
      ) : totalResults === 0 ? (
        <div>
          <p className="text-center">No results found.</p>
        </div>
      ) : (
        <>
          <div
            ref={resultsRef}
            className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1700px] px-5 mx-auto"
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
        </>
      )}
    </>
  );
};

export default NutrientSearchResults;
