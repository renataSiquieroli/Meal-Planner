import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SearchRecipe.css";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const { query, setQuery } = useRecipeContext();

  const navigateTo = useNavigate();

  const handleSearch = () => {
    setQuery(query);
    navigateTo("/results");
  };

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            value={query}
            className="searchTerm"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search and add to favourites!!"
          />
          <button className="searchButton" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
