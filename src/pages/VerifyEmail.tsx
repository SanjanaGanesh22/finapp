import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/auth'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [verificationCode, setVerificationCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Get email from location state
    const state = location.state as { email?: string }
    if (state?.email) {
      setEmail(state.email)
    } else {
      // If no email in state, redirect to login
      navigate('/login')
    }
  }, [location, navigate])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const result = await authService.verifyEmail(email, verificationCode)
      if (result.success) {
        setMessage(result.message)
        // Redirect to login after successful verification
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred during verification')
    }
  }

  const handleResend = async () => {
    setError('')
    setMessage('')

    try {
      const result = await authService.resendVerification(email)
      if (result.success) {
        setMessage(result.message)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred while resending verification email')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div>
            <label htmlFor="verificationCode" className="sr-only">
              Verification Code
            </label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify Email
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Resend verification code
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail 