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
  const [calorieValues, setCalorieValues] = useState(prevCalories || [20, 800]);
  const [carbValues, setCarbValues] = useState(prevCarbs || [0, 200]);
  const [proteinValues, setProteinValues] = useState(prevProtein || [0, 200]);
  const [fatValues, setFatValues] = useState(prevFat || [0, 200]);
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
        <legend>Calories</legend>
        <RangeSlider
          min={0}
          max={2000}
          step={1}
          initialValues={calorieValues}
          onValuesChange={handleCalorieChange}
        />
      </fieldset>
      <fieldset>
        <legend>Carbs</legend>
        <RangeSlider
          min={0}
          max={300}
          step={1}
          initialValues={carbValues}
          onValuesChange={handleCarbChange}
        />
      </fieldset>
      <fieldset>
        <legend>Protein</legend>
        <RangeSlider
          min={0}
          max={200}
          step={1}
          initialValues={proteinValues}
          onValuesChange={handleProteinChange}
        />
      </fieldset>
      <fieldset>
        <legend>Fat</legend>
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
