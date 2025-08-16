import { Link } from 'react-router-dom';

export default function MovieCard({ movie, isFavorite, onAdd, onRemove }) {
  const poster = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="bg-white rounded-2xl shadow p-3 flex flex-col">
      <img src={poster} alt={movie.Title} className="w-full h-72 object-cover rounded-xl" loading="lazy" />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg leading-tight">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year} {movie.Type ? `• ${movie.Type}` : ''}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link to={`/movie/${movie.imdbID}`} className="text-blue-600 hover:underline">Details</Link>
        {!isFavorite ? (
          <button onClick={() => onAdd(movie)} className="px-3 py-1 rounded-xl bg-green-600 text-white">Add</button>
        ) : (
          <button onClick={() => onRemove(movie.imdbID)} className="px-3 py-1 rounded-xl bg-rose-600 text-white">Remove</button>
        )}
      </div>
    </div>
  );
}
