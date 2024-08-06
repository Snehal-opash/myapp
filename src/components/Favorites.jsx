// src/components/Favorites.js
import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster_path} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
