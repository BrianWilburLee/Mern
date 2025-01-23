const express = require('express');
const router = express.Router();

// Import workout controller functions (ensure these are properly defined and imported)
const { getWorkouts, createWorkout, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

// Define the routes
router.get('/', getWorkouts); // Get all workouts
router.post('/', createWorkout); // Create a new workout
router.get('/:id', getWorkout); // Get a specific workout by ID
router.put('/:id', updateWorkout); // Update a workout by ID
router.delete('/:id', deleteWorkout); // Delete a workout by ID

module.exports = router;
