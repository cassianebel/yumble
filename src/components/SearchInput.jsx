import { IoSearch } from "react-icons/io5";

const SearchInput = ({ query, setQuery, placeholder, name }) => {
  return (
    <div className="w-full max-w-lg scale-95 flex justify-center border-2 border-zinc-900 bg-white dark:bg-zinc-950 dark:border-zinc-700 p-2 px-4 rounded-full my-3 mx-auto text-apple-950 dark:text-zinc-100 shadow-sm focus-within:border-apple-300 focus-within:scale-100 focus-within:shadow-md transition-all duration-200 ease-in-out">
      <IoSearch className="text-3xl text-zinc-700 me-3" />
      <input
        name={name}
        className="w-full bg-white dark:bg-zinc-950 focus:outline-none transition-all duration-200 ease-in-out"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
    </div>
  );
};

export default SearchInput;
