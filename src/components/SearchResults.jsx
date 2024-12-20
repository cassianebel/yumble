import { useEffect, useState, useMemo, useRef, createRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecipeCard from "./RecipeCard";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import SearchChooser from "./SearchChooser";
import IngredientSearchForm from "./IngredientSearchForm";
import NutrientSearchForm from "./NutrientSearchForm";

const SearchResults = () => {
  const [tab, setTab] = useState("diet");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
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
  const nodeRefs = useRef({});

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const offset = (currentPage - 1) * 10;
        const url = `/.netlify/functions/fetchSearchResults?query=${query}&offset=${offset}${dietParam}`;
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

    fetchSearchResults();
  }, [query, currentPage, diets]);

  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (page) => {
    navigate(`?q=${query}${dietParam}&page=${page}`);
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
                <IngredientSearchForm />
              ) : tab === "nutrients" ? (
                <NutrientSearchForm />
              ) : (
                <SearchForm prevQuery={query} prevDiets={diets} />
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
    </div>
  );
};

export default SearchResults;
