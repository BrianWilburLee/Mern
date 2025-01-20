import React, { useState, useEffect } from "react";

const WorkoutForm = ({ onAddWorkout, editWorkout, onEditWorkout }) => {
  const [title, setTitle] = useState(editWorkout?.title || "");
  const [reps, setReps] = useState(editWorkout?.reps || "");
  const [load, setLoad] = useState(editWorkout?.load || "");

  useEffect(() => {
    if (editWorkout) {
      setTitle(editWorkout.title);
      setReps(editWorkout.reps);
      setLoad(editWorkout.load);
    }
  }, [editWorkout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkout = { title, reps, load };

    if (editWorkout) {
      onEditWorkout(editWorkout._id, newWorkout);
    } else {
      onAddWorkout(newWorkout);
    }

    setTitle("");
    setReps("");
    setLoad("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Workout title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        required
      />
      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        required
      />
      <button type="submit">{editWorkout ? "Update Workout" : "Add Workout"}</button>
    </form>
  );
};

export default WorkoutForm;
