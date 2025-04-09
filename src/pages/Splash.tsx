import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Splash = () => {
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    // Show login/signup options after 4 seconds
    const optionsTimer = setTimeout(() => {
      setShowOptions(true)
    }, 4000)

    return () => clearTimeout(optionsTimer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          FinApp
        </h1>
        <p className="text-xl text-white/80 animate-fade-in-delayed mb-8">
          Your Financial Journey Starts Here
        </p>
        
        {showOptions && (
          <div className="space-y-4 animate-fade-in-delayed">
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <div className="text-white/80">or</div>
            <Link
              to="/signup"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Splash 