import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        setToys((currentToys) => [...currentToys, createdToy]);
        setShowForm(false);
      })
      .catch((error) => console.error(error));
  }

  function handleLikeToy(id) {
    const toyToUpdate = toys.find((toy) => toy.id === id);

    if (!toyToUpdate) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toyToUpdate.likes + 1 }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) => (toy.id === id ? updatedToy : toy))
        );
      })
      .catch((error) => console.error(error));
  }

  function handleDeleteToy(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys((currentToys) => currentToys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
