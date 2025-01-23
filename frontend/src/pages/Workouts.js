import { useEffect, useState } from 'react';
import axios from 'axios';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(response.data);
      } catch (err) {
        setError('Failed to fetch workouts');
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Your Workouts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.title}</strong> - {workout.reps} reps @ {workout.load} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
