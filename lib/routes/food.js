'use strict'; 

const express = require('express'); // imports the Express.js framework into the file.
const router = express.Router(); //Method to create a router object 
// const Food = require('../models/food');
const { FoodModel } = require('../models');

// Create a new food item
router.post('/food', async (req, res) => { //req, res represent the HTTP request and response objects,
  try { //error handling
    const { name, description } = req.body;
    const food = await FoodModel.create({ name, description }); // Creates a new food item
    res.json(food); // If successful, food item is sent as a JSON response
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Server error' }); //500 Error response is sent back to the client 
  }
});

// Get all food items
router.get('/food', async (req, res) => {
  try {
    const foods = await FoodModel.findAll();
    console.log('Foods:', foods); // Add this line for logging
    res.json(foods);
  } catch (error) {
    console.error('Error:', error); // Add this line for error logging
    res.status(500).json({ error: 'Server error' });
  }
});


// Get one food item by ID
router.get('/food/:id', async (req, res) => { //route handler for HTTP GET req.
  const id = req.params.id; // Extracting the 'id' from the request's parameters 
  try {
    const food = await FoodModel.findByPk(id);// using its ID, we will find a food item
    if (!food) { // checks if the 'food' variable is falsy,
      return res.status(404).json({ error: 'Food not found' }); //Returns a 404 status code that the item was not found. 
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
    const food = await FoodModel.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    food.name = name; //if food was found, update its 'name' property with the request body value.
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
    const food = await FoodModel.findByPk(id);
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
