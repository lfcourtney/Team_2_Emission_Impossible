import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { seedDatabase } from './fakeBackend/SeedData';

// Pages
import Login from './pages/Login';
import Overview from './pages/Overview';
import Hub from './pages/Hub';
import Analysis from './pages/Analysis';
import Calculator from './pages/Calculator';
import BuildScenario from './pages/BuildScenario';
import Layout from './layouts/Layout';
import { RibbonProvider } from './contexts/RibbonContext';

// Initialize "DB"
seedDatabase();

// Protected Route Wrapper Component
const ProtectedRoute = ({ children, title, useLayout = true }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  // If useLayout is false, render children directly (full screen)
  if (!useLayout) return children;

  return <Layout title={title}>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RibbonProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Hub (Faux Landing Page) */}
              <Route path="/" element={
                <ProtectedRoute useLayout={false}>
                  <Hub />
                </ProtectedRoute>
              } />

              {/* Main Dashboard - Moved from '/' */}
              <Route path="/dashboard" element={
                <ProtectedRoute title="Dashboard Overview">
                  <Overview />
                </ProtectedRoute>
              } />

              <Route path="/analysis" element={
                <ProtectedRoute title="Detailed Analysis">
                  <Analysis />
                </ProtectedRoute>
              } />

              <Route path="/calculator" element={
                <ProtectedRoute title="Emissions Calculator">
                  <Calculator />
                </ProtectedRoute>
              } />

              <Route path="/build-scenario" element={
                <ProtectedRoute title="Scenario Builder">
                  <BuildScenario />
                </ProtectedRoute>
              } />

            </Routes>
          </Router>
        </RibbonProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App