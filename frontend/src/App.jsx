import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { seedDatabase } from './fakeBackend/seedDatabase';

// Pages
import Login from './pages/Login';
import Overview from './pages/Overview';
import Analysis from './pages/Analysis';
import Calculator from './pages/Calculator';
import Layout from './components/Layout';

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
  // immediately redirect them to the login page.
  // <Navigate /> is a React Router component used for programmatic redirects.
  if (!isAuthenticated) return <Navigate to="/login" />;


  // If the user *is* authenticated,
  // render the Layout component and pass in the page title.
  // The `children` are rendered *inside* the Layout component.
  return <Layout title={title}>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
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
      </DataProvider>
    </AuthProvider>
  );
}

export default App