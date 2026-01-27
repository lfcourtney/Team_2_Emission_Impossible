import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import BuildScenario from './components/BuildScenario'
import Scenario2 from './components/Scenario2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login without sidebar */}
        <Route path="/" element={<LoginPage />} />

        {/* All other routes with sidebar */}
        <Route
          path="/build"
          element={
            <Layout>
              <BuildScenario />
            </Layout>
          }
        />
        <Route
          path="/outcome"
          element={
            <Layout>
              <Scenario2 />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
