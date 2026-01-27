import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { seedDatabase } from './fakeBackend/SeedData';

// Side bar component. Render components with this sidebar
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import BuildScenario from './components/BuildScenario';
import Scenario2 from './components/Scenario2';


import Landing from "./pages/landing";
import { RibbonProvider } from './contexts/RibbonContext';

// Initialize "DB"
seedDatabase();

// Protected Route Wrapper Component
// Specifically, is a React *functional component*.
// Like any React component, it receives its inputs via props.
const ProtectedRoute = ({ children, title }) => {

  // The first argument we care about here is `children`.
  // `children` represents any child components wrapped inside <ProtectedRoute>...</ProtectedRoute>
  // For example: <ProtectedRoute><Overview /></ProtectedRoute>

  // We access authentication state from the AuthContext using the custom hook.
  const { isAuthenticated } = useAuth();

  // If the user is NOT authenticated,
  // immediately redirect them to the login page (Just root URL).
  // <Navigate /> is a React Router component used for programmatic redirects.
  if (!isAuthenticated) return <Navigate to="/" />;


  // If the user *is* authenticated,
  // return child components.
  // That is, <ProtectedRoute/> will always resolve to child components.
  // The only requirement is that <ProtectedRoute/> has not navigated to
  // root URL yet.
  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RibbonProvider>
          <BrowserRouter>
            <Routes>
              {/* Login without sidebar */}
              <Route path="/" element={<LoginPage />} />

              {/* All other routes with sidebar */}
              <Route
                path="/build"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <BuildScenario />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/outcome"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Scenario2 />
                    </Layout>
                  </ProtectedRoute>
                } />

              <Route path="/landing" element={
                <ProtectedRoute >
                  <Landing />
                </ProtectedRoute>
              }
              />

            </Routes>
          </BrowserRouter>
        </RibbonProvider>
      </DataProvider>
    </AuthProvider >
  )
}

export default App
