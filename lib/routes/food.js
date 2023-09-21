'use strict'; 

const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Create a new food item
router.post('/food', async (req, res) => {
  try {
    const { name, description } = req.body;
    const food = await Food.create({ name, description });
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all food items
router.get('/food', async (req, res) => {
  try {
    const foods = await Food.findAll();
    console.log('Foods:', foods); // Add this line for logging
    res.json(foods);
  } catch (error) {
    console.error('Error:', error); // Add this line for error logging
    res.status(500).json({ error: 'Server error' });
  }
});


// Get one food item by ID
router.get('/food/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a food item by ID
router.put('/food/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    food.name = name;
    food.description = description;
    await food.save();
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a food item by ID
router.delete('/food/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    await food.destroy();
    res.json(null); // Return null to indicate successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
