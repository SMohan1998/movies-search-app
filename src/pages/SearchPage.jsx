import { useEffect, useState } from 'react';
import { searchMovies } from '../services/omdbApi.js';
import MovieCard from '../Components/MovieCard.jsx';
import Pagination from '../Components/Pagination.jsx';
export default function SearchPage({ addToFavorites, favorites }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | loading | error | empty | success
  const [errorMsg, setErrorMsg] = useState('');

  const runSearch = async (q, p, t) => {
    if (!q || !q.trim()) {
      setMovies([]);
      setTotal(0);
      setStatus('idle');
      return;
    }
    setStatus('loading');
    try {
      const data = await searchMovies(q.trim(), p, t);
      setMovies(data.Search || []);
      setTotal(Number(data.totalResults || 0));
      setStatus((data.Search && data.Search.length) ? 'success' : 'empty');
      setErrorMsg('');
    } catch (err) {
      setMovies([]);
      setTotal(0);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    runSearch(query, 1, type);
  };

  // When page changes run search again
  useEffect(() => {
    if (page !== 1) {
      runSearch(query, page, type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // When filter type changes, reset to page 1 and search (using API parameter, not array.filter())
  useEffect(() => {
    if (query.trim()) {
      setPage(1);
      runSearch(query, 1, type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <section>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4">
        <input
          className="flex-1 rounded border p-2"
          placeholder="Search movie title, e.g., Avengers"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border p-2 w-full sm:w-48"
          title="Filter by type (uses the OMDb API 'type' parameter)"
        >
          <option value="">All types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button className="rounded bg-blue-600 text-white px-4 py-2">Search</button>
      </form>

      {status === 'idle' && <p className="text-gray-600">Start by typing a movie title and click Search.</p>}
      {status === 'loading' && <p>Searching…</p>}
      {status === 'error' && <p className="text-rose-600">Error: {errorMsg}</p>}
      {status === 'empty' && <p className="text-gray-600">No results found.</p>}

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
            onAdd={addToFavorites}
            onRemove={() => {}}
          />
        ))}
      </div>

      <Pagination currentPage={page} totalResults={total} onChange={setPage} />
    </section>
  );
}
