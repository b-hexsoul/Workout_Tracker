const mongoose = require("mongoose");
const db = require("../models/index");

exports.getLastWorkout = async (req, res, next) => {
  console.log("getting workouts");
  try {
    const workouts = await db.Workout.find();
    console.log(workouts);
    res.status(200).json({
      success: true,
      data: workouts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createWorkout = async (req, res, next) => {
  console.log("creating a workout");
};

exports.addExercise = async (req, res, next) => {
  console.log("adding an exercise");
};

exports.getWorkoutsInRange = async (req, res, next) => {
  console.log("getting workouts in range");
};