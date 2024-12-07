import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import ContentCard from "./ContentCard";

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
    <ContentCard>
      <form onSubmit={handleSearch} className="text-center">
        <SearchInput
          name="q"
          query={query}
          setQuery={setQuery}
          placeholder="Search for recipes..."
        />

        <fieldset>
          <legend className="w-full text-center my-2 text-sm text-zinc-600 dark:text-zinc-400 text-balance">
            Optional: Choose one or more diets to narrow your search
          </legend>
          <div className="flex justify-center items-center flex-wrap">
            {dietChoices.map((diet) => (
              <label
                htmlFor={diet}
                key={diet}
                className="bg-zinc-50 p-2 px-3 rounded-full m-2 cursor-pointer uppercase font-light text-xs text-zinc-600 border border-zinc-200  hover:bg-apple-100 hover:text-apple-700 hover:border-apple-200 has-[:checked]:bg-apple-300 has-[:checked]:border-zinc-200 has-[:checked]:text-apple-950 has-[:checked]:font-medium has-[:checked]:shadow-inner-sm transition-all duration-300 focus-within:bg-apple-100 focus-within:border-apple-200 focus-within:text-apple-700 focus-within:font-medium has-[:checked]:focus-within:border-apple-500 hover:scale-105 focus-within:scale-105 has-[:checked]:scale-105 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-apple-700 dark:hover:text-apple-400 dark:hover:border-apple-600 dark:has-[:checked]:bg-apple-900 dark:has-[:checked]:border-zinc-800 dark:has-[:checked]:text-apple-500 dark:focus-within:bg-apple-800 dark:focus-within:border-apple-600 dark:focus-within:text-apple-400 dark:has-[:checked]:focus-within:border-apple-500"
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
    </ContentCard>
  );
};

export default SearchForm;
