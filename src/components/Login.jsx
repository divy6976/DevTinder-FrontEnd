"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constants"

function Login() {
  const [formData, setFormData] = useState({
    email: "Divyansh@gmail.com",
    password: "Divyansh@6976",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("") // 🔴 error state
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("") // reset previous error
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      })
      console.log("✅ API Response:", response.data)
      dispatch(addUser(response.data))
      return navigate("/feed")
    } catch (error) {
      console.log("❌ API Error:", error.response?.data || error.message)

      // 🔴 Custom handling
      if (error.response?.status === 401) {
        setErrorMessage("Invalid credentials")
      } else {
        setErrorMessage(error.response?.data?.message || "Invalid Credentials")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch">

        {/* LEFT SIDE (same design) */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200 h-full flex flex-col justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-8">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-3">DevTinder</h1>
              <p className="text-xl text-slate-600 mb-12">Connect. Code. Collaborate.</p>

              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Match with skilled developers</h3>
                    <p className="text-slate-600 text-sm">
                      Find developers who complement your skills and share your passion for coding
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Build amazing projects together</h3>
                    <p className="text-slate-600 text-sm">
                      Collaborate on innovative projects and bring your ideas to life
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Grow your network</h3>
                    <p className="text-slate-600 text-sm">
                      Expand your professional connections and advance your career
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (login form) */}
        <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
              <p className="text-slate-600">Sign in to continue your developer journey</p>
            </div>

            {/* 🔴 Error Message Box */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                {errorMessage}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-300"
                    placeholder="developer@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
