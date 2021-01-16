const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number,
});

const WorkoutSchema = new mongoose.Schema({
  day: {
    type: Date,
  },
  exercises: [
    {
      type: ExerciseSchema,
      default: {},
    },
  ],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
