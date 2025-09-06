import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Feed from "./components/Feed"
import { Provider, useDispatch } from "react-redux"
import { store } from "./utils/appStore"
import { useEffect } from "react"
import { addUser } from "./utils/userSlice"
import { BASE_URL } from "./utils/constants"
import axios from "axios"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Signup from "./components/Signup"

function AppContent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      })
      dispatch(addUser(response.data))
    } catch (error) {
      // ✅ Agar token invalid/expired hai toh login pe bhej do
      if (error.response && error.response.status === 401) {
        navigate("/login")
      }
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()   // ✅ refresh hone par hamesha user verify hoga
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<  Requests/>} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent /> {/* ✅ Router ke andar rakha */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
