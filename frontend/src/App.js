import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import components
import Navbar from "./components/Navbar";

// Import pages
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Workouts from "./pages/Workouts"
// Import context
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [workouts, setWorkouts] = useState([]); // State to store workouts
  const [error, setError] = useState(null); // State to handle errors

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts");
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to fetch workouts.");
      }
    };

    fetchWorkouts();
  }, []);

  // Handle adding a new workout
  const handleAddWorkout = async (newWorkout) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        newWorkout,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the workout list with the new workout
      setWorkouts([response.data, ...workouts]);
    } catch (err) {
      console.error("Error adding workout:", err);
      setError("Failed to add workout. Please try again.");
    }
  };

  // Handle deleting a workout
  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${id}`);
      // Remove the workout from the state
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError("Failed to delete workout. Please try again.");
    }
  };

  // Handle editing a workout (placeholder for now)
  const handleEditWorkout = (workout) => {
    console.log("Edit workout", workout);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Add Navbar */}
          <Navbar />

          <div className="pages">
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <Workouts
                    workouts={workouts}
                    onDeleteWorkout={handleDeleteWorkout}
                    onEditWorkout={handleEditWorkout}
                    onAddWorkout={handleAddWorkout}
                    error={error}
                  />
                }
              />

              {/* Login Page */}
              <Route path="/login" element={<Login />} />

              {/* Sign Up Page */}
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
