const Workout = require('../models/workoutModel'); // Ensure you have a Workout model
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure user-specific workouts
    const workouts = await Workout.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single workout by ID
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout || workout.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Validation
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!load) missingFields.push('load');
  if (!reps) missingFields.push('reps');
  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', missingFields });
  }

  try {
    const userId = req.user._id; // Attach user ID to the workout
    const workout = await Workout.create({ title, load, reps, user: userId });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a workout by ID
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id, user: req.user._id }, // Ensure user-specific workouts
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found or not authorized' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a workout by ID
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id, user: req.user._id }); // Ensure user-specific deletion

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found or not authorized' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
