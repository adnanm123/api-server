"use strict";

const express = require("express");
const router = express.Router();
const { FoodModel, IngredientsModel } = require("../models");

// Create a new food item
router.post("/food", async (req, res) => {
  try {
    const { name, description } = req.body;
    const food = await FoodModel.create({ name, description });
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all food items
router.get("/food", async (req, res) => {
  try {
    const foods = await FoodModel.findAll();
    console.log("Foods:", foods); // Add this line for logging
    res.json(foods);
  } catch (error) {
    console.error("Error:", error); // Add this line for error logging
    res.status(500).json({ error: "Server error" });
  }
});

// Get one food item by ID
router.get("/food/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a food item by ID
router.put("/food/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    food.name = name;
    food.description = description;
    await food.save();
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a food item by ID
router.delete("/food/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const food = await FoodModel.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    await food.destroy();
    res.json(null); // Return null to indicate successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new ingredient for a specific food item
router.post("/food/:foodId/ingredients", async (req, res) => {
  const foodId = req.params.foodId;
  const { name, description } = req.body;

  try {
    const food = await FoodModel.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Create a new ingredient associated with the food item
    const ingredient = await IngredientsModel.create({ name, description });

    // Associate the new ingredient with the food item
    await food.addIngredients(ingredient);

    res.status(201).json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
