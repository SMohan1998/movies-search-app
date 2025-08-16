
import MovieCard from "../Components/MovieCard";
export default function Favorites({ favorites, removeFromFavorites }) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {(!favorites || favorites.length === 0) && <p>No favorites added yet.</p>}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {favorites.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={true}
            onAdd={() => {}}
            onRemove={removeFromFavorites}
          />
        ))}
      </div>
    </section>
  );
}
