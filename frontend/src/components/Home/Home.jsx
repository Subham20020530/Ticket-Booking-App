import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const predefinedPopularMovies = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather: Part II
  "tt0468569", // The Dark Knight
  "tt0050083", // 12 Angry Men
  "tt0108052", // Schindler's List
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt0110912", // Pulp Fiction
  "tt0060196", // The Good, the Bad and the Ugly
  "tt0137523", // Fight Club
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            `http://www.omdbapi.com/?apikey=33482900&s=${searchQuery}&type=movie`
          );
          setMovies(response.data.Search);
        } else {
          const moviePromises = predefinedPopularMovies.map((id) =>
            axios.get(`http://www.omdbapi.com/?apikey=33482900&i=${id}`)
          );
          const movieResponses = await Promise.all(moviePromises);
          setMovies(movieResponses.map((res) => res.data));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="home-container">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setMovies={setMovies}
      />
      <h1 className="home-heading">Movie Ticket Booking App</h1>
      <div className="show-listings">
        {movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="show-item">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/500"
                }
                alt={movie.Title}
                className="show-image"
              />
              <h2 className="movie-title">{movie.Title}</h2>
              <Link to={`/booking/${movie.imdbID}`}>
                <button className="book-button">Book</button>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
