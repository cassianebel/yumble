import { useEffect, useState, useMemo, useRef, createRef } from "react";
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
  const nodeRefs = useRef({});

  useEffect(() => {
    const fetchNutrientSearchResults = async () => {
      try {
        const offset = (currentPage - 1) * 10;
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&minCalories=${calories[0]}&maxCalories=${calories[1]}&minCarbs=${carbs[0]}&maxCarbs=${carbs[1]}&minProtein=${protein[0]}&maxProtein=${protein[1]}&minFat=${fat[0]}&maxFat=${fat[1]}&offset=${offset}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
        setTotalResults(data.totalResults);
        setLoading(false);
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchNutrientSearchResults();
  }, [query, calories, carbs, protein, fat]);

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

  const getNodeRef = (key) => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = createRef();
    }
    return nodeRefs.current[key];
  };

  return (
    <>
      <div className="m-5 max-w-xl md:mx-auto">
        <SearchChooser tab={tab} setTab={setTab} />
        <TransitionGroup>
          <CSSTransition
            key={tab}
            timeout={300}
            classNames="zoom"
            nodeRef={getNodeRef(tab)}
          >
            <div ref={getNodeRef(tab)}>
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
