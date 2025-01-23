import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Updated import to use the named export

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(jwtDecode(token)); // Use jwtDecode instead of jwt_decode
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setUser(jwtDecode(token)); // Use jwtDecode instead of jwt_decode
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Logout if token is invalid
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
