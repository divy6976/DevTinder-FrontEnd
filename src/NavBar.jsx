"use client"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeUser } from "./utils/userSlice"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "./utils/constants"

const Navbar = () => {
  const dispatch = useDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      dispatch(removeUser())   // Redux state clear
      navigate("/login")       // Login page redirect
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Devtinder Logo pe Link */}
          <Link to="/feed" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">💚</span>
            </div>
            <span className="text-xl font-bold text-foreground">DevMatch</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {/* ✅ Profile link */}
                    <Link
                      to="/profile"
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
                    </Link>
                    
                    {/* ✅ Settings placeholder (future route ban sakta hai) */}
                    <Link
                      to="/connections"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Connections
                    </Link>
                      <Link
                      to="/requests"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Requests
                    </Link>

                    {/* ✅ Logout button */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
