import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [diets, setDiets] = useState([]);
  const navigate = useNavigate();

  const dietChoices = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole30",
  ];

  const handleDietsChange = (event) => {
    const value = event.target.value;

    setDiets((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let dietParam = diets.length > 0 ? `&diet=${diets.join(",")}` : "";

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}${dietParam}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <fieldset>
        <legend>Diets</legend>
        {dietChoices.map((diet) => (
          <label key={diet}>
            <input
              type="checkbox"
              name="diets"
              value={diet}
              checked={diets.includes(diet)}
              onChange={handleDietsChange}
            />
            {diet}
          </label>
        ))}
      </fieldset>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
