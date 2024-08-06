// src/api.js
import axios from 'axios';

export const fetchPopularMovies = async () => {
  const response = await axios.get('/movies.json');
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get('/movies.json');
  return response.data.find(movie => movie.id === parseInt(id));
};

export const searchMovies = async (query) => {
  const response = await axios.get('/movies.json');
  return response.data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
};
