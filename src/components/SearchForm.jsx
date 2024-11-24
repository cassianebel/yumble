import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

const SearchForm = ({ prevQuery, prevDiets }) => {
  const [query, setQuery] = useState(prevQuery || "");
  const [diets, setDiets] = useState(prevDiets || []);
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
    <form
      onSubmit={handleSearch}
      className="text-center bg-zinc-200 rounded-2xl p-5"
    >
      <SearchInput
        name="q"
        query={query}
        setQuery={setQuery}
        placeholder="Search for recipes..."
      />

      <fieldset>
        <legend className="text-center my-2 text-sm text-zinc-600 text-balance">
          Optional: Choose one or more diets to narrow your search
        </legend>
        <div className="flex justify-center items-center flex-wrap">
          {dietChoices.map((diet) => (
            <label
              htmlFor={diet}
              key={diet}
              className="bg-zinc-100 p-2 px-3 rounded-full m-2 cursor-pointer uppercase font-light text-xs text-zinc-600 border border-zinc-300 hover:bg-apple-100 hover:text-apple-700 hover:border-apple-200 has-[:checked]:bg-apple-300 has-[:checked]:border-apple-300 has-[:checked]:text-apple-950 has-[:checked]:font-medium transition-all duration-300 focus-within:bg-apple-100 focus-within:border-apple-200 focus-within:text-apple-700 focus-within:font-medium  has-[:checked]:focus-within:border-apple-500 hover:scale-105 focus-within:scale-105 has-[:checked]:scale-105"
            >
              <input
                id={diet}
                className="sr-only"
                type="checkbox"
                name="diets"
                value={diet}
                checked={diets.includes(diet)}
                onChange={handleDietsChange}
              />
              {diet}
            </label>
          ))}
        </div>
      </fieldset>
      <SearchButton />
    </form>
  );
};

export default SearchForm;
