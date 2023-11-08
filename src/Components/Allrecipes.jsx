import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";

Modal.setAppElement("#root"); // Set the root element for accessibility
import { AuthContext } from "../context/authContext";
import Select from "react-select";
import Swal from "sweetalert2";

import { useIngredientsContext } from "../context/ingredientsContext";
import "../Styles/SearchRecipe.css";

export default function AllRecipes() {
  // const [date, setDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); //npm dropdown - meals
  const [showAlert, setShowAlert] = useState(false); //recipe added message
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize selectedDate with the current date

  const { Id } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showDefaultRecipes, setShowDefaultRecipes] = useState(true); // Flag to show default recipes
  const [showGroceryList, setShowGroceryList] = useState(false); // State for showing/hiding GroceryList
  const { ingredientsList, setIngredientsList } = useIngredientsContext(); // Ingredients list
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false); // New state to manage ingredient visibility

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; // Number of recipes per page

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const handleDateChange = (newDate) => {
  //   setDate(newDate);
  // };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelect = (recipe) => {
    openModal();
    setCurrentRecipe(() => {
      return { recipe };
    });
    // Set the selected date to the current date in the beginning
    setSelectedDate(new Date());
  };
  const fetchRecipes = async () => {
    try {
      const from = (currentPage - 1) * recipesPerPage;
      const appId = import.meta.env.VITE_API_ID;
      const appKey = import.meta.env.VITE_APP_KEY;
      const to = from + recipesPerPage;
      let edamamAPIUrl = "";

      if (searchQuery && searchQuery.trim() !== "") {
        edamamAPIUrl = `https://api.edamam.com/search?q=${searchQuery}&from=${from}&to=${to}&app_id=${appId}&app_key=${appKey}`;
        setShowDefaultRecipes(false);
      } else {
        edamamAPIUrl = `https://api.edamam.com/search?q=dinner&from=${from}&to=${to}&app_id=${appId}&app_key=${appKey}`;
        setShowDefaultRecipes(true);
      }

      const response = await axios.get(edamamAPIUrl);
      const newRecipes = response.data.hits.map((hit) => hit.recipe);
      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  useEffect(() => {
    fetchRecipes();
    setIngredientsList([]);
  }, [currentPage, searchQuery]);

  const mealPlannerData = {
    user: Id,
    weeks: [
      {
        days: [
          {
            date: selectedDate, // Use the selectedDate state,
            meals: {
              breakfast: {
                link:
                  selectedOption === "Breakfast"
                    ? currentRecipe.recipe.url
                    : "",
                name:
                  selectedOption === "Breakfast"
                    ? currentRecipe.recipe.label
                    : "",
              },
              lunch: {
                link:
                  selectedOption === "Lunch" ? currentRecipe.recipe.url : "",
                name:
                  selectedOption === "Lunch" ? currentRecipe.recipe.label : "",
              },
              dinner: {
                link:
                  selectedOption === "Dinner" ? currentRecipe.recipe.url : "",
                name:
                  selectedOption === "Dinner" ? currentRecipe.recipe.label : "",
              },
            },
          },
        ],
      },
    ],
  };

  const handleAddToPlanner = async () => {
    console.log("SELECTED OPTION", selectedOption);
    if (currentRecipe && selectedOption) {
      const newMeal = {
        link: currentRecipe.recipe.url,
        name: currentRecipe.recipe.label,
      };

      const updatedData = { ...mealPlannerData };
      updatedData.weeks[0].days[0].date = selectedDate; // Update the selected date
      updatedData.weeks[0].days[0].meals[selectedOption.value.toLowerCase()] =
        newMeal;

      console.log("MEAL TO SAVE: ", updatedData);
      // You can now send `updatedData` to your backend.

      // Extract and collect the ingredients from the current recipe
      const recipeIngredients = currentRecipe.recipe.ingredientLines;

      // Combine the new ingredients with the existing ingredients list
      const updatedIngredientsList = [...ingredientsList, ...recipeIngredients];

      // Update the ingredients list state
      setIngredientsList(updatedIngredientsList);

      // Continue with the rest of your meal planner logic
      console.log("Ingredients List:", updatedIngredientsList);

      // You can now send `updatedData` to your backend.

      console.log("ABOUT TO ENTER FETCH");

      // const localAPI =
      ("http://localhost:8080/meal-planner/create-meal-planners");
      const deployAPI =
        "https://meal-planner-backend-57g4.onrender.com/meal-planner/create-meal-planners";

      try {
        const res = await fetch(deployAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        console.log("ARE WE HERE?");
        const data = await res.json();
        console.log(data);
        // Show the success alert using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Your meal is successfully added to meal plan!!!",
          showConfirmButton: false,
          timer: 4000, // Automatically close the alert after 2 seconds
        });
        // Close the modal after successfully adding the recipe
        closeModal();
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  };

  //npm select -dropdown
  const options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
  ];

  console.log(selectedOption);

  return (
    <div className="recipes-container">
      <h1>Pick your favorite meal and add it to planner!</h1>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search for recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#8bab6a" }}
            ></i>{" "}
          </button>
        </div>
      </div>

      <div className="recipes-wrapper">
        {recipes.map((recipe, index) => (
          <div className="recipe-card" key={index}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={recipe.label} src={recipe.image} />}
            >
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                {" "}
                <Meta title={recipe.label} description={recipe.mealType} />{" "}
                <Meta description={recipe.cuisineType} />{" "}
                <div className="info-row">
                  <i
                    className="fa-brands fa-nutritionix"
                    style={{ color: "#feda75" }}
                  ></i>
                  <Meta description={Math.round(recipe.calories)} />
                  <i
                    className="fa-regular fa-clock"
                    style={{ color: "#feda75" }}
                  ></i>
                  <Meta description={`${recipe.totalTime} Minutes`} />
                </div>
              </a>
            </Card>
            <button
              className="btn-add-planner"
              onClick={() => handleSelect(recipe)}
            >
              Add to planner
            </button>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="modal-content"
            >
              <h2>Choose a day to save the meal</h2>
              <br />
              <Calendar
                className="react-calendar"
                onChange={setSelectedDate}
                value={selectedDate.setHours(0, 0, 0, 0)}
              />
              <br />
              <p>Selected Date: {selectedDate.toDateString()}</p>
              <br />
              <h3>Selected recipe: {currentRecipe?.recipe.label}</h3>
              <br />
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
              <button onClick={handleAddToPlanner} className="btn-add-planner">
                Add to weekly planner
              </button>
              &nbsp;&nbsp;
              <button onClick={closeModal} className="btn-close">
                Close
              </button>
            </Modal>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="btn-pagination"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          &laquo; Previous
        </button>

        <button
          className="btn-pagination"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next &raquo;
        </button>
      </div>
      {/* <button  className="btn-add-planner" onClick={() => setIsModalOpen(true)}>View my Grocery List</button>
      <GroceryList
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ingredientsList={ingredientsList}
      /> */}
    </div>
  );
}
