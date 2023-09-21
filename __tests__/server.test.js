const request = require('supertest');
const { createServer } = require('../lib/server'); // Import the createServer function from your server.js file

describe('Express Server API Tests', () => {
  // Variables to store IDs of created items for testing
  let createdFoodId;
  let createdClothesId;
  let server; // Add a variable to store the server instance

  // Set up the server before running tests
  beforeAll((done) => {
    const port = 3001; // Adjust the port as needed
    const serverInstance = createServer();
    serverInstance.start(port, (srv) => {
      server = srv; // Store the server instance for later shutdown
      done();
    });
  });

  // Close the server after all tests have completed
  afterAll((done) => {
    server.close(done);
  });

  // Define a test case for the Food route
  describe('Food API', () => {
    // Example test case
    it('should create a new food item', async () => {
      const newItem = {
        name: 'Pizza',
        description: 'Delicious Italian dish',
      };

      const response = await request(server)
        .post('/food')
        .send(newItem);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Pizza');
      expect(response.body).toHaveProperty('description', 'Delicious Italian dish');

      // Store the created food item's ID for future tests
      createdFoodId = response.body.id;
    });

    it('should get all food items', async () => {
      const response = await request(server)
        .get('/food');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Add assertions to check the structure of the response data
    });

    it('should get one food item by ID', async () => {
      const response = await request(server)
        .get(`/food/${createdFoodId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdFoodId);
      // Add assertions to check the structure of the response data
    });

    it('should update a food item by ID', async () => {
      const updatedData = {
        name: 'Updated Pizza',
        description: 'Even more delicious',
      };

      const response = await request(server)
        .put(`/food/${createdFoodId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdFoodId);
      expect(response.body).toHaveProperty('name', 'Updated Pizza');
      expect(response.body).toHaveProperty('description', 'Even more delicious');
    });

    it('should delete a food item by ID', async () => {
      const response = await request(server)
        .delete(`/food/${createdFoodId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeNull(); // Null response indicates successful deletion
    });
  });

  // Define test cases for the Clothes API
  it('should create a new clothes item', async () => {
    const newItem = {
      name: 'Shirt',
      size: 'Medium',
    };
  
    const response = await request(server)
      .post('/clothes')
      .send(newItem);
  
    // Assuming your backend returns a JSON response with the created item
    expect(response.status).toBe(201); // Use 201 for created resource
    expect(response.body).toHaveProperty('name', 'Shirt');
    expect(response.body).toHaveProperty('size', 'Medium');
  });
  
  

    it('should get all clothes items', async () => {
      const response = await request(server)
        .get('/clothes');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Add assertions to check the structure of the response data
    });

    it('should get one clothes item by ID', async () => {
      const response = await request(server)
        .get(`/clothes/${createdClothesId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdClothesId);
      // Add assertions to check the structure of the response data
    });

    it('should update a clothes item by ID', async () => {
      const updatedData = {
        name: 'Updated Shirt',
        size: 'Large',
      };

      const response = await request(server)
        .put(`/clothes/${createdClothesId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdClothesId);
      expect(response.body).toHaveProperty('name', 'Updated Shirt');
      expect(response.body).toHaveProperty('size', 'Large');
    });

    it('should delete a clothes item by ID', async () => {
      console.log(createdClothesId);
      const response = await request(server)
        .delete(`/clothes/${createdClothesId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeNull(); // Null response indicates successful deletion
    });
  });
