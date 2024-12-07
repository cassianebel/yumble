import { useState, useCallback } from "react";
import RangeSlider from "./RangeSlider";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import ContentCard from "./ContentCard";

const NutrientSearchForm = ({
  prevCalories,
  prevCarbs,
  prevFat,
  prevProtein,
  prevQuery,
}) => {
  const [query, setQuery] = useState(prevQuery || "");
  const [calorieValues, setCalorieValues] = useState(prevCalories || [0, 500]);
  const [carbValues, setCarbValues] = useState(prevCarbs || [0, 50]);
  const [proteinValues, setProteinValues] = useState(prevProtein || [0, 50]);
  const [fatValues, setFatValues] = useState(prevFat || [0, 50]);
  const navigate = useNavigate();

  const handleCalorieChange = useCallback((values) => {
    setCalorieValues(values);
  }, []);

  const handleCarbChange = useCallback((values) => {
    setCarbValues(values);
  }, []);

  const handleProteinChange = useCallback((values) => {
    setProteinValues(values);
  }, []);

  const handleFatChange = useCallback((values) => {
    setFatValues(values);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(
      `/searchbynutrients?q=${encodeURIComponent(
        query
      )}&calories=${calorieValues.join(",")}&carbs=${carbValues.join(
        ","
      )}&protein=${proteinValues.join(",")}&fat=${fatValues.join(",")}`
    );
  };

  return (
    <ContentCard>
      <form onSubmit={handleSearch} className="text-center">
        <SearchInput
          name="q"
          query={query}
          setQuery={setQuery}
          placeholder="Search for recipes..."
        />
        <p className="text-center my-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400 text-balance">
          Adjust the values to fit your macro nutrient goals
        </p>
        <fieldset>
          <legend className="w-full m-3 text-center">
            <span className="font-bold">Calories</span>{" "}
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              (kcals)
            </span>
          </legend>
          <RangeSlider
            min={0}
            max={1000}
            step={1}
            initialValues={calorieValues}
            onValuesChange={handleCalorieChange}
          />
        </fieldset>
        <fieldset>
          <legend className="w-full m-3 text-center">
            <span className="font-bold">Carbs</span>{" "}
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              (grams)
            </span>
          </legend>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            initialValues={carbValues}
            onValuesChange={handleCarbChange}
          />
        </fieldset>
        <fieldset>
          <legend className="w-full m-3 text-center">
            <span className="font-bold">Protein</span>{" "}
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              (grams)
            </span>
          </legend>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            initialValues={proteinValues}
            onValuesChange={handleProteinChange}
          />
        </fieldset>
        <fieldset>
          <legend className="w-full m-3 text-center">
            <span className="font-bold">Fat</span>{" "}
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              (grams)
            </span>
          </legend>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            initialValues={fatValues}
            onValuesChange={handleFatChange}
          />
        </fieldset>
        <SearchButton />
      </form>
    </ContentCard>
  );
};

export default NutrientSearchForm;
