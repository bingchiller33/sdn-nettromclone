import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../common/utilities/initials";
import axios from "axios";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/categories/admin`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    const addCategory = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/categories`, {
          name: newCategory,
        });
        setCategories((oldCategories) => [...oldCategories, response.data]);
      } catch (error) {
        console.error("Failed to add category", error);
      }
    };

    addCategory();
    setNewCategory("");
  };

  const handleRemoveCategory = async (categoryToRemove) => {
    try {
      await axios.delete(`${BASE_URL}/categories/${categoryToRemove._id}`);
      setCategories(
        categories.filter((category) => category._id !== categoryToRemove._id)
      );
    } catch (error) {
      console.error("Failed to remove category", error);
    }
  };

  const handleToggleCategoryStatus = async (category) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/categories/${category._id}/status`,
        {
          status: category.status === "active" ? "inactive" : "active",
        }
      );
      setCategories(
        categories.map((cat) =>
          cat._id === category._id ? response.data : cat
        )
      );
    } catch (error) {
      console.error("Failed to update category status", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.name}
            <button onClick={() => handleRemoveCategory(category)}>
              Remove
            </button>
            <button onClick={() => handleToggleCategoryStatus(category)}>
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
