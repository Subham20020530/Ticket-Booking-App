import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchQuery, setSearchQuery, setMovies }) {
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    setSearching(true);
    const url = `http://www.omdbapi.com/?apikey=33482900&s=${searchQuery}&type="movie"`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMessage(null);
        setMovies(data.Search);
      } else {
        setMessage(data.Error);
      }
      setSearching(false);
    } catch (err) {
      setMessage("An unexpected error occurred.");
      setSearching(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-search">
          <form onSubmit={searchMovies}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
            />
            <button type="submit" disabled={searching}>
              {searching ? "Searching..." : "Search"}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
        </div>
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
