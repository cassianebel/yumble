import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import NutrientSearchForm from "./NutrientSearchForm";

const NutrientSearchResults = () => {
  const [results, setResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
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
        console.log("Recipe data:", data);
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
    console.log(calories, carbs, protein, fat);
    setSearchParams({
      calories: calories.join(","),
      carbs: carbs.join(","),
      protein: protein.join(","),
      fat: fat.join(","),
      page,
    });
  };

  return (
    <div>
      <NutrientSearchForm
        prevCalories={calories}
        prevCarbs={carbs}
        prevProtein={protein}
        prevFat={fat}
      />
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

export default NutrientSearchResults;
