import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { seedDatabase } from './fakeBackend/SeedData';

// Pages
import Login from './pages/Login';
import Overview from './pages/Overview';
import Analysis from './pages/Analysis';
import Calculator from './pages/Calculator';
import Layout from './layouts/Layout';
import { RibbonProvider } from './contexts/RibbonContext';

// Initialize "DB"
seedDatabase();

// Protected Route Wrapper
const ProtectedRoute = ({ children, title }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" />;
    
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
              
              <Route path="/" element={
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

            </Routes>
          </Router>
        </RibbonProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App