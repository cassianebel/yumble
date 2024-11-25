import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import NutrientSearchForm from "./NutrientSearchForm";
import Pagination from "./Pagination";

const NutrientSearchResults = () => {
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
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
    const url = `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${calories[0]}&maxCalories=${calories[1]}&minCarbs=${carbs[0]}&maxCarbs=${carbs[1]}&minProtein=${protein[0]}&maxProtein=${protein[1]}&minFat=${fat[0]}&maxFat=${fat[1]}&number=100&apiKey=${apiKey}`;

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
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [calories, carbs, protein, fat]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedResults(results.slice(indexOfFirstItem, indexOfLastItem));
  }, [results, currentPage]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const goToPage = (page) => {
    setSearchParams({
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
    <div>
      <div className="m-5 max-w-xl md:mx-auto">
        <NutrientSearchForm
          prevCalories={calories}
          prevCarbs={carbs}
          prevProtein={protein}
          prevFat={fat}
        />
      </div>
      <h2 className="sr-only">Search Results</h2>
      <div ref={resultsRef} className="flex flex-wrap gap-6">
        {displayedResults.map((recipe) => (
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

export default NutrientSearchResults;
