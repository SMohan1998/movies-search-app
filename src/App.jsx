import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import SearchPage from './pages/SearchPage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Favorites from './pages/Favorites.jsx';
export default function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch (e) {
      console.error('Failed to read favorites:', e);
    }
  }, []);

  // Persist favorites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const addToFavorites = (movie) => {
    const existsIndex = favorites.findIndex((m) => m.imdbID === movie.imdbID);
    if (existsIndex === -1) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove without using Array.filter()
  const removeFromFavorites = (imdbID) => {
    const copy = favorites.slice();
    const idx = copy.findIndex((m) => m.imdbID === imdbID);
    if (idx !== -1) {
      copy.splice(idx, 1);
      setFavorites(copy);
    }
  };

  return (
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage addToFavorites={addToFavorites} favorites={favorites} />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
      </div>
  );
}
