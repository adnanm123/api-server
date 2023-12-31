"use strict";

const express = require("express");
const router = express.Router();
const { ClothesModel, IngredientsModel } = require("../models"); // Import both ClothesModel and IngredientsModel

// Create a new clothes item
router.post("/clothes", async (req, res) => {
  try {
    const { name, size } = req.body;
    const clothes = await ClothesModel.create({ name, size });
    res.status(201).json(clothes); // Respond with 201 status and the created item
  } catch (error) {
    console.error("Error creating clothes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all clothes items
router.get("/clothes", async (req, res) => {
  try {
    const clothes = await ClothesModel.findAll();
    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get one clothes item by ID
router.get("/clothes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const clothes = await ClothesModel.findByPk(id);
    if (!clothes) {
      return res.status(404).json({ error: "Clothes not found" });
    }
    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a clothes item by ID
router.put("/clothes/:id", async (req, res) => {
  const id = req.params.id;
  const { name, size } = req.body;
  try {
    const clothes = await ClothesModel.findByPk(id);
    if (!clothes) {
      return res.status(404).json({ error: "Clothes not found" });
    }
    clothes.name = name;
    clothes.size = size;
    await clothes.save();
    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a clothes item by ID
router.delete("/clothes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const clothes = await ClothesModel.findByPk(id);
    if (!clothes) {
      return res.status(404).json({ error: "Clothes not found" });
    }
    await clothes.destroy();
    res.json(null); // Return null to indicate successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new ingredient for a specific clothes item
router.post("/clothes/:clothesId/ingredients", async (req, res) => {
  const clothesId = req.params.clothesId;
  const { name, description } = req.body;

  try {
    const clothes = await ClothesModel.findByPk(clothesId);
    if (!clothes) {
      return res.status(404).json({ error: "Clothes not found" });
    }

    // Create a new ingredient associated with the clothes item
    const ingredient = await IngredientsModel.create({ name, description });

    // Associate the new ingredient with the clothes item
    await clothes.addIngredients(ingredient);

    res.status(201).json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
