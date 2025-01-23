const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    load: { type: Number, required: true },
    reps: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
