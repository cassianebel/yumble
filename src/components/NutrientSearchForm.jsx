import { useState, useCallback } from "react";
import RangeSlider from "./RangeSlider";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";

const NutrientSearchForm = ({
  prevCalories,
  prevCarbs,
  prevFat,
  prevProtein,
}) => {
  const [calorieValues, setCalorieValues] = useState(prevCalories || [0, 500]);
  const [carbValues, setCarbValues] = useState(prevCarbs || [0, 50]);
  const [proteinValues, setProteinValues] = useState(prevProtein || [0, 50]);
  const [fatValues, setFatValues] = useState(prevFat || [0, 50]);
  const navigate = useNavigate();

  const handleCalorieChange = useCallback((values) => {
    console.log("Updated Calorie Values:", values);
    setCalorieValues(values);
  }, []);

  const handleCarbChange = useCallback((values) => {
    console.log("Updated Carb Values:", values);
    setCarbValues(values);
  }, []);

  const handleProteinChange = useCallback((values) => {
    console.log("Updated Protein Values:", values);
    setProteinValues(values);
  }, []);

  const handleFatChange = useCallback((values) => {
    console.log("Updated Fat Values:", values);
    setFatValues(values);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(
      `/searchbynutrients?calories=${calorieValues.join(
        ","
      )}&carbs=${carbValues.join(",")}&protein=${proteinValues.join(
        ","
      )}&fat=${fatValues.join(",")}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="text-center bg-zinc-200 rounded-2xl p-5"
    >
      <fieldset>
        <legend className="m-3">
          Calories <span className="text-xs text-zinc-600">(kcals)</span>
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
        <legend className="m-3">
          Carbs <span className="text-xs text-zinc-600">(grams)</span>
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
        <legend className="m-3">
          Protein <span className="text-xs text-zinc-600">(grams)</span>
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
        <legend className="m-3">
          Fat <span className="text-xs text-zinc-600">(grams)</span>
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
  );
};

export default NutrientSearchForm;
