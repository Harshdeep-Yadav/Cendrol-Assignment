import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/App.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [joke, setJoke] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //fetching categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // fetching jokes from API
  const fetchJokeByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setModalIsOpen(true);
    fetchJokeByCategory(category);
  };

  const handleNextJokeClick = () => {
    fetchJokeByCategory(selectedCategory);
  };

  // for modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <h1 className="heading">Chuck Norris</h1>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category}
            className={`category ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            <span>Unlimited jokes on {category}</span>
          </div>
        ))}
      </div>
      {/* box showing jokes on categories */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedCategory && joke && (
          <div className="card">
            <h2 className="card-heading"> {selectedCategory}</h2>
            <p className="card-content">{joke}</p>
            <button className="next-joke-button" onClick={handleNextJokeClick}>
              Next Joke
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
