"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"      // <-- import dispatch
import { addUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constants"

function Signup() {
  const dispatch = useDispatch()               // <-- initialize dispatch

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
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
    setErrorMessage("")

    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      })
      console.log("✅ Signup successful:", res.data)

      // Dispatch user data to Redux store
      dispatch(addUser(res.data))

      navigate("/login")
    } catch (error) {
      console.error("❌ Signup error:", error)
      const msg = error.response?.data?.message || "Something went wrong"
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center p-6">
      {/* Enhanced Red Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 20% 20%, rgba(239,68,68,0.3), transparent 70%),
            radial-gradient(circle 600px at 80% 80%, rgba(239,68,68,0.2), transparent 70%),
            radial-gradient(circle 1000px at 50% 50%, rgba(239,68,68,0.15), transparent 80%),
            radial-gradient(circle 400px at 0% 100%, rgba(239,68,68,0.25), transparent 60%),
            radial-gradient(circle 500px at 100% 0%, rgba(239,68,68,0.2), transparent 60%)
          `,
        }}
      />
      {/* Additional subtle overlay for depth */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(239,68,68,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 50%, rgba(239,68,68,0.05) 100%)
          `,
        }}
      />
      {/* Enhanced Reddish Black Texture Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle 200px at 10% 10%, rgba(0,0,0,0.4), transparent 50%),
            radial-gradient(circle 150px at 90% 10%, rgba(0,0,0,0.3), transparent 50%),
            radial-gradient(circle 180px at 10% 90%, rgba(0,0,0,0.35), transparent 50%),
            radial-gradient(circle 220px at 90% 90%, rgba(0,0,0,0.25), transparent 50%),
            radial-gradient(circle 300px at 50% 20%, rgba(0,0,0,0.2), transparent 60%),
            radial-gradient(circle 250px at 50% 80%, rgba(0,0,0,0.3), transparent 60%)
          `,
        }}
      />
      {/* Fine Grid Texture */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />
      {/* Container with shared rounded corners and shadow */}
      <div className="w-full max-w-5xl flex rounded-3xl shadow-xl overflow-hidden bg-white relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-red-500 to-red-600 p-16 text-white flex-1 relative overflow-hidden">
          {/* Reddish Black Texture Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                radial-gradient(circle 400px at 20% 20%, rgba(0,0,0,0.3), transparent 60%),
                radial-gradient(circle 300px at 80% 80%, rgba(0,0,0,0.2), transparent 60%),
                radial-gradient(circle 500px at 50% 50%, rgba(0,0,0,0.15), transparent 70%),
                linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.1) 100%)
              `,
            }}
          />
          {/* Additional texture overlay for depth */}
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          {/* Enhanced Black Texture Spots */}
          <div
            className="absolute inset-0 z-0 opacity-25"
            style={{
              backgroundImage: `
                radial-gradient(circle 100px at 15% 15%, rgba(0,0,0,0.5), transparent 40%),
                radial-gradient(circle 80px at 85% 15%, rgba(0,0,0,0.4), transparent 40%),
                radial-gradient(circle 120px at 15% 85%, rgba(0,0,0,0.45), transparent 40%),
                radial-gradient(circle 90px at 85% 85%, rgba(0,0,0,0.35), transparent 40%),
                radial-gradient(circle 60px at 50% 30%, rgba(0,0,0,0.3), transparent 40%),
                radial-gradient(circle 70px at 30% 70%, rgba(0,0,0,0.4), transparent 40%),
                radial-gradient(circle 85px at 70% 70%, rgba(0,0,0,0.35), transparent 40%)
              `,
            }}
          />
          {/* Fine Dots Pattern */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle 2px at 20% 20%, rgba(0,0,0,0.6), transparent),
                radial-gradient(circle 1px at 40% 30%, rgba(0,0,0,0.5), transparent),
                radial-gradient(circle 1.5px at 60% 40%, rgba(0,0,0,0.4), transparent),
                radial-gradient(circle 2px at 80% 50%, rgba(0,0,0,0.5), transparent),
                radial-gradient(circle 1px at 30% 60%, rgba(0,0,0,0.4), transparent),
                radial-gradient(circle 1.5px at 70% 80%, rgba(0,0,0,0.3), transparent)
              `,
              backgroundSize: "100px 100px",
            }}
          />
          <div className="flex justify-center mb-10 relative z-10">
            <div className="bg-white/20 rounded-3xl p-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 relative z-10">DevMatch</h1>
          <p className="text-lg max-w-md leading-relaxed mb-10 relative z-10">
            Find your dev match now. Connect, collaborate, and create projects with like-minded developers.
          </p>
          <ul className="space-y-4 text-white text-sm relative z-10">
            <li>✅ Match with skilled developers</li>
            <li>🚀 Work on exciting projects together</li>
            <li>🌐 Grow your professional network</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex-1 p-10 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join the community of developers</p>

          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center font-semibold shadow-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 disabled:opacity-60 disabled:cursor-not-allowed transition-shadow shadow-md hover:shadow-lg flex justify-center items-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-semibold hover:text-red-600 transition-colors">
              Sign in
            </Link>
          </p>

          <p className="text-center mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors cursor-pointer">
            <Link to="/">← Back to home</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup
