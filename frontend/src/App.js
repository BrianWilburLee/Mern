import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutForm from "./components/WorkoutForm.js"; 
import WorkoutList from "./components/WorkoutList.js"; 

function App() {
  const [workouts, setWorkouts] = useState([]); // State to store workouts
  const [error, setError] = useState(null); // State to handle errors

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts"); 
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  // Handle adding a new workout
  const handleAddWorkout = async (newWorkout) => {
    try {
      const response = await axios.post("http://localhost:4000/api/workouts", newWorkout, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update the workout list with the new workout
      setWorkouts([response.data, ...workouts]);
    } catch (error) {
      console.error("Error adding workout:", error);
      setError("Failed to add workout. Please try again.");
    }
  };

  // Handle deleting a workout
  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${id}`);
      // Remove the workout from the state
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
      setError("Failed to delete workout. Please try again.");
    }
  };

  // Handle editing a workout
  const handleEditWorkout = (workout) => {
    // This can be implemented in a way to show the WorkoutForm with pre-filled values for editing.
    console.log("Edit workout", workout);
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <a href="/">
            <h1>Workout Buddy</h1>
          </a>
        </div>
      </header>

      <div className="pages">
        <div className="home">
          {/* Display any errors */}
          {error && <div className="error">{error}</div>}

          {/* List of workouts */}
          <WorkoutList
            workouts={workouts}
            onDeleteWorkout={handleDeleteWorkout}
            onEditWorkout={handleEditWorkout}
          />

          {/* Form to add a workout */}
          <WorkoutForm onAddWorkout={handleAddWorkout} />
        </div>
      </div>
    </div>
  );
}

export default App;
