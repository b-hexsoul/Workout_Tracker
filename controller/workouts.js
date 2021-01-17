const mongoose = require("mongoose");
const db = require("../models/index");

// @Desc Get all workouts
// @Route GET /api/workouts
// @access Public
exports.getLastWorkout = async (req, res, next) => {
  console.log("getting workouts");
  try {
    // All documents enter aggregation pipeline and totalDuration is set as a field
    const workouts = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]);

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

// @Desc Create a workout
// @Route POST /api/workouts
// @access Public
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

// @Desc Add an exercise to a specific workout
// @Route GET /api/workouts/:id
// @access Public
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

// @Desc Get the past 7 workouts
// @Route GET /api/workouts/range
// @access Public
exports.getWorkoutsInRange = async (req, res, next) => {
  console.log("getting workouts in range");
  try {
    const workouts = await db.Workout.aggregate([
      {
        $sort: {
          day: -1,
        },
      },
      {
        $limit: 7,
      },
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]);

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
