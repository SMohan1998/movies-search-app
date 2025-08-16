# Movies Search App

This is a full-featured movie search application built with *React* that integrates with the *OMDB API*. It allows users to search for movies, view detailed information, and manage a list of favorites. It includes pagination, filtering, error handling, and responsive styling using Tailwind CSS.

---

## Features
- Search for movies using the *OMDB API*.
- View detailed movie information, including title, release year, genre, plot, ratings, and cast.
- Display search results in a grid format with movie posters and brief descriptions.
- Pagination support for large sets of results.
- Dropdown filter to select movies by type. For example (movie, series, episode) using the API endpoint.
- Navigation between search results and movie detail pages using react router.
- Error handling for API requests with user-friendly messages.
- Handles cases when no results are found or API errors occur.
- Clean, readable, and well-documented code.

---

## Tech Stack
- React
- React Router
- HTML / Tailwind CSS
- JavaScript
- OMDB API

---

## .env file added to .gitignore for security purpose. 
## Added environment variable at netlify project site to communicate with OMDB API to fetch movies



Folder Structure

src/
├─ components/       (MovieCard, Navbar, Pagination)
├─ pages/            (Favorites, MovieDetails, SearchPage)
├─ services/         API service for OMDB
├─ App.jsx           
├─ main.jsx
├─ index.html           
   
       

