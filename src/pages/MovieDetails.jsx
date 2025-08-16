import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbApi.js';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setStatus('loading');
      try {
        const data = await getMovieDetails(id);
        if (isMounted) {
          setMovie(data);
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg(err.message || 'Failed to load');
          setStatus('error');
        }
      }
    };
    run();
    return () => { isMounted = false; };
  }, [id]);

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'error') return <p className="text-rose-600">Error: {errorMsg}</p>;

  const poster = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <article className="grid md:grid-cols-3 gap-6">
      <img src={poster} alt={movie.Title} className="rounded-2xl w-full object-cover" />
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold">{movie.Title}</h1>
        <p className="text-gray-700 mt-1">{movie.Year} • {movie.Rated} • {movie.Runtime}</p>
        <p className="mt-3"><span className="font-semibold">Genre:</span> {movie.Genre}</p>
        <p className="mt-1"><span className="font-semibold">Actors:</span> {movie.Actors}</p>
        <p className="mt-1"><span className="font-semibold">Director:</span> {movie.Director}</p>
        <p className="mt-3 leading-relaxed"><span className="font-semibold">Plot:</span> {movie.Plot}</p>
        <p className="mt-3"><span className="font-semibold">IMDB:</span> {movie.imdbRating} ({movie.imdbVotes} votes)</p>
        <p className="mt-1"><span className="font-semibold">Released:</span> {movie.Released}</p>
        <p className="mt-1"><span className="font-semibold">Language:</span> {movie.Language}</p>
        <p className="mt-1"><span className="font-semibold">BoxOffice:</span> {movie.BoxOffice}</p>
      </div>
    </article>
  );
}
