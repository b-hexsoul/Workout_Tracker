const mongoose = require("mongoose");
const db = require("../models/index");

exports.getLastWorkout = async (req, res, next) => {
  console.log("getting workouts");
  try {
    const workouts = await db.Workout.find();

    res.status(200).json({
      success: true,
      data: workouts,
    });
  } catch (error) {
    // Send error response code and data
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createWorkout = async (req, res, next) => {
  console.log("creating a workout");
  try {
    const workout = await db.Workout.create(req.body);

    res.status(200).json({
      success: true,
      data: workout,
    });
    console.log(workout);
  } catch (error) {
    // Send error response code and data
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addExercise = async (req, res, next) => {
  console.log("adding an exercise");
  let id = req.params.id;

  try {
    const exercise = await db.Workout.findByIdAndUpdate({ _id: id }, { $push: { exercises: req.body } }, { new: true });

    res.status(200).json({
      success: true,
      data: exercise,
    });

    console.log(exercise);
  } catch (error) {
    // Send error response code and data
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getWorkoutsInRange = async (req, res, next) => {
  console.log("getting workouts in range");
};
