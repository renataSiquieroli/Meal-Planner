import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SearchRecipe.css";

function SearchRecipe() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const appId = import.meta.env.VITE_API_ID;
  const appKey = import.meta.env.VITE_APP_KEY;

  const handleSearch = () => {
    if (query) {
      const edamamAPIUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=6`;

      axios
        .get(edamamAPIUrl)
        .then((response) => {
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    } else {
      // Clear recipes if the query is empty
      setRecipes([]);
    }
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
            placeholder="What are you looking for?"
          />
          <button className="searchButton" onClick={handleSearch}>
            <i
              className="fa-solid fa-magnifying-glass fa-spin"
              style={{ color: "#8bab6a" }}
            ></i>{" "}
            {/* Add a search icon here */}
          </button>
        </div>
      </div>
      <ul>
        {recipes.map((recipe) => (
          <div className="gallery" key={recipe.recipe.label}>
            <a target="_blank" href="img_5terre.jpg">
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                width="600"
                height="300px"
              />
            </a>
            <p className="card-title">{recipe.recipe.label}</p>
            <button className="card-btn">
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>View Recipe</h4>
              </a>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SearchRecipe;

// 1. Create component for meal-planner where you fetch and display all data in the created meal plan

// 2. In that component, create a weekly view where to showcase all meals
