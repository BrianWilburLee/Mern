import React from "react";

const WorkoutList = ({ workouts, onDeleteWorkout, onEditWorkout }) => {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <div key={workout._id} className="workout-item">
          <h3>{workout.title}</h3>
          <p>Load (kg): {workout.load}</p>
          <p>Reps: {workout.reps}</p>
          <button onClick={() => onEditWorkout(workout)}>Edit</button>
          <button onClick={() => onDeleteWorkout(workout._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
