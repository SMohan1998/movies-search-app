// Service functions to talk to the OMDb API
// Get a free key at http://www.omdbapi.com/apikey.aspx and put it below
//const API_KEY = '207c8033';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1, type = '') {
  // Build URL using the API filter parameter (do NOT use Array.filter())
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: String(page)
  });
  if (type) params.set('type', type);

  const resp = await fetch(`${BASE}?${params.toString()}`);
  if (!resp.ok) throw new Error(`Network error ${resp.status}`);
  const data = await resp.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'No results');
  }
  return data; // contains Search[], totalResults
}

export async function getMovieDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: 'full'
  });
  const resp = await fetch(`${BASE}?${params.toString()}`);
  if (!resp.ok) throw new Error(`Network error ${resp.status}`);
  const data = await resp.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Not found');
  }
  return data;
}
