import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Format: { fullName: 'Demo User', email: 'demo@demo.com'};
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage on seed
    // Note: 'storedUser' is actually jwt value
    const storedUser = localStorage.getItem('emission_impossible_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {

    // Immediately return false if either email or password is empty
    if (!email || !password) return false;

    let response;

    try {
      response = await axios.post('http://localhost:8081/auth/signin',
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },

          // indicates whether or not cross-site Access-Control requests
          // should be made using credentials
          withCredentials: true
        });
    } catch (error) {
      console.log(error);
      return false;
    }

    const jsonWebToken = response.data.jwt;

    // Store jwt token
    setUser(jsonWebToken);
    setIsAuthenticated(true);

    // Now that user is authenticated, return full information of authenticated user.
    getAuthenticatedUser(jsonWebToken);

    // Store jwt token in browser, local cache
    localStorage.setItem('emission_impossible_user', JSON.stringify(jsonWebToken));
    return true;
  };

  // Called if user has successfully signed in. 
  // Requests /api/get-authenticated-user, supplying JWT in authorization 
  // header to pass authorisation. Returns information of currently logged in user.
  const getAuthenticatedUser = (jsonWebToken) => {
    axios.get('http://localhost:8081/api/get-authenticated-user', {
      headers: {
        "Authorization": "Bearer " + jsonWebToken,
      },

      // indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      withCredentials: true
    })
      .then(function (userResponse) {

        setAuthenticatedUser(userResponse.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const logout = () => {
    setUser(null);
    setAuthenticatedUser(null);

    setIsAuthenticated(false);
    localStorage.removeItem('emission_impossible_user');
  };

  return (
    <AuthContext.Provider value={{ user, authenticatedUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
