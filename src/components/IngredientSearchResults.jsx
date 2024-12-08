import { useEffect, useState, useMemo, useRef, createRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecipeCard from "./RecipeCard";
import IngredientSearchForm from "./IngredientSearchForm";
import Pagination from "./Pagination";
import SearchChooser from "./SearchChooser";
import SearchForm from "./SearchForm";
import NutrientSearchForm from "./NutrientSearchForm";

const IngredientSearchResults = () => {
  const [tab, setTab] = useState("ingredients");
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
  const nodeRefs = useRef({});

  useEffect(() => {
    const fetchIngredientSearchResults = async () => {
      try {
        const url = `/.netlify/functions/fetchIngredientSearchResults?ingredients=${ingredients}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
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

    fetchIngredientSearchResults();
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

  const getNodeRef = (key) => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = createRef();
    }
    return nodeRefs.current[key];
  };

  return (
    <div>
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
                <IngredientSearchForm prevIngredients={ingredients} />
              ) : tab === "nutrients" ? (
                <NutrientSearchForm />
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
