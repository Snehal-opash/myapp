// src/components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../api';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);
    };
    getMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.poster_path} alt={movie.title} />
      <p>Release Date: {movie.release_date}</p>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <Link to="/">Back to Home</Link>
      <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
    </div>
  );
};

const addToFavorites = (movie) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const newFavorites = [...savedFavorites, movie];
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

export default MovieDetail;
