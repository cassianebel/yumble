import { IoSearch } from "react-icons/io5";

const SearchInput = ({ query, setQuery, placeholder, name }) => {
  return (
    <div className="w-full max-w-lg scale-95 flex justify-center border-2 border-zinc-300 bg-white p-2 px-4 rounded-full my-3 mx-auto text-apple-950 focus-within:border-apple-300 focus-within:scale-100 focus-within:shadow-md transition-all duration-200">
      <IoSearch className="text-3xl text-zinc-700 me-3" />
      <input
        name={name}
        className="w-full bg-white focus:outline-none"
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
