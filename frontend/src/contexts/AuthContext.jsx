import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);


/*
  AuthContext.Provider shares authentication state with its children.

  Think of it as a wrapper that stores auth data (like the current user
  and login/logout functions) and makes it available to every component
  inside it — without passing props down manually.

  Any child component can access this shared state by using:
    useContext(AuthContext)

  When the auth state changes, React automatically updates all
  components that are using it.
*/
export const AuthProvider = ({ children }) => {
  // Store JSON web token value. All backend requests to any 
  // route beginning with /route will require this value.
  const [user, setUser] = useState("mock-token");
  // Format: { fullName: 'Demo User', email: 'demo@demo.com'};
  const [authenticatedUser, setAuthenticatedUser] = useState({ fullName: 'Test User', email: 'test@example.com'});

  // Boolean. Used with 'ProtectedRoute' wrapper component. This Wrapper 
  // component will allow the user to continue with navigation based on 
  // the value of this boolean.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check local storage on seed
    // Note: 'storedUser' is actually jwt value
    const storedUser = localStorage.getItem('emission_impossible_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Take user log in information. Send log in request to the relevant /auth backend route.
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

  // Reset login state
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
