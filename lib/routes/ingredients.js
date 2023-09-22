"use strict";

const express = require("express");
const router = express.Router();
const { IngredientsModel } = require("../models");

// Create a new ingredient
router.post("/ingredients", async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newIngredient = await IngredientsModel.create({ name, quantity });
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all ingredients
router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await IngredientsModel.findAll();
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get one ingredient by ID
router.get("/ingredients:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ingredient = await IngredientsModel.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update an ingredient by ID
router.put("/ingredients:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { name, quantity } = req.body;
    const updatedIngredient = await Ingredients.update(
      { name, quantity },
      { where: { id } }
    );
    if (updatedIngredient[0] === 0) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.json(updatedIngredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an ingredient by ID
router.delete("/ingredients:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedIngredient = await IngredientsModel.findByPk(id);
    if (!deletedIngredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.json(null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
