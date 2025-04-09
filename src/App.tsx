import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    return <>{children}</>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Home />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App 