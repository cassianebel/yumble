import RecipeCard from "./RecipeCard";

const FavoritesPage = ({ favorites, setFavorites }) => {
  return (
    <div>
      <h1 className="font-display text-2xl text-center text-zinc-700 m-5">
        Favorites
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1700px] px-5 mx-auto">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
