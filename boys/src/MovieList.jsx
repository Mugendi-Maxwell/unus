import React, { useState, useEffect } from 'react';
import './MovieList.css'; // CSS file for styling

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Page for API pagination
  const [totalResults, setTotalResults] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie details

  // Fetch movies based on search query and page number
  const fetchMovies = async (query, pageNumber) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=3949e1d2&s=${query}&page=${pageNumber}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setTotalResults(parseInt(data.totalResults, 10));
      } else if (pageNumber === 1) {
        setMovies([]); // Clear movies if the query has no results
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setIsLoading(false);
    setIsFetchingMore(false);
  };

  // Fetch detailed info for a specific movie
  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=3949e1d2&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  // Handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      movies.length < totalResults &&
      !isFetchingMore
    ) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMovies(searchQuery, page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [movies, totalResults]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    setMovies([]); // Clear previous results
    setPage(1); // Reset page
    fetchMovies(searchQuery, 1); // Fetch movies for the new query
  };

  // If a movie is selected, show its details
  if (selectedMovie) {
    return (
      <div className="movie-details">
        <h2>{selectedMovie.Title}</h2>
        <img
          src={`http://img.omdbapi.com/?apikey=3949e1d2&i=${selectedMovie.imdbID}`}
          alt={selectedMovie.Title}
          className="movie-poster-large"
        />
        <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
        <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        <p><strong>Director:</strong> {selectedMovie.Director}</p>
        <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
        <p><strong>Year:</strong> {selectedMovie.Year}</p>
        <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
        <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>

        <p>
          <strong>where to watch Link:</strong>{' '}
          <a href="https://moviebox.ng" target="_blank" rel="noopener noreferrer">
            click me
          </a>
        </p>
        <button onClick={() => setSelectedMovie(null)} className="back-button">
          Back to Movie List
        </button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <div className="movie-list">
        {isLoading && page === 1 ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img
                src={`http://img.omdbapi.com/?apikey=3949e1d2&i=${movie.imdbID}`}
                alt={movie.Title}
                className="movie-poster"
              />
              <h3>{movie.Title}</h3>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
        {isFetchingMore && <p>Loading more movies...</p>}
      </div>
    </div>
  );
}

export default MovieList;
