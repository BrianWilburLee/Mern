import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Workout App</h1>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.greeting}>Welcome, {user.email}</span>
            <button style={styles.button} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.button}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              style={styles.button}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Inline styles for the Navbar
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    color: 'white',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    padding: '8px 15px',
    fontSize: '16px',
    color: '#007bff',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  greeting: {
    fontSize: '16px',
    marginRight: '10px',
  },
};

export default Navbar;
