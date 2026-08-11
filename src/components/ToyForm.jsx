import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({ name: "", image: "" });

  function handleChange(event) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim() || !formData.image.trim()) {
      return;
    }

    onAddToy({
      name: formData.name,
      image: formData.image,
      likes: 0,
    });
    setFormData({ name: "", image: "" });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
