const express = require("express");
const { getLastWorkout, createWorkout, addExercise, getWorkoutsInRange } = require("../controller/workouts");

const router = express.Router();

router.route("/").get(getLastWorkout).post(createWorkout);

router.route("/:id").put(addExercise);

router.route("/range").get(getWorkoutsInRange);

module.exports = router;
