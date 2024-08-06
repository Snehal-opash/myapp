// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };
    getMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      const searchedMovies = await searchMovies(searchTerm);
      setMovies(searchedMovies);
    }
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_path} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
            </Link>
            <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const addToFavorites = (movie) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const newFavorites = [...savedFavorites, movie];
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

export default Home;
