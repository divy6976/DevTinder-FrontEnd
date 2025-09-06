import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import NavBar from '../NavBar'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store) => store.requests)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStart, setDragStart] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      )
      console.log("Review response:", res.data)
      fetchRequests()
      setCurrentIndex(0)
    } catch (error) {
      console.error("Review error:", error.response?.data || error.message)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true
      })
      dispatch(addRequest(res.data.data))
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleDragStart = (e) => {
    setIsDragging(true)
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
    setDragStart({ x, y })
  }

  const handleDragMove = (e) => {
    if (!isDragging || !dragStart) return
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
    setDragOffset({ x: x - dragStart.x, y: y - dragStart.y })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    const threshold = 120
    if (dragOffset.x > threshold) {
      // Accept (swipe right)
      reviewRequest('accepted', requests[currentIndex]?._id)
      setCurrentIndex((prev) => Math.min(prev + 1, requests.length - 1))
    } else if (dragOffset.x < -threshold) {
      // Reject (swipe left)
      reviewRequest('rejected', requests[currentIndex]?._id)
      setCurrentIndex((prev) => Math.min(prev + 1, requests.length - 1))
    }
    setDragOffset({ x: 0, y: 0 })
    setDragStart(null)
  }

  if (!requests) return null

  const currentRequest = requests[currentIndex]

  return (
    <div className="min-h-screen w-full bg-[#020617] relative flex flex-col">
      {/* Background Layers like Home */}
      <div
        className="absolute inset-0 z-0 animate-pulse"
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
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(239,68,68,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 50%, rgba(239,68,68,0.05) 100%)
          `,
        }}
      />

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-[#020617]/95 backdrop-blur-lg border-b border-red-500/30">
        <NavBar />
      </div>

      <div className="pt-24 flex flex-col items-center flex-grow px-4 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Requests</h1>

        {requests.length === 0 ? (
          <h2 className="text-center text-white text-2xl mt-20">
            No requests found
          </h2>
        ) : currentRequest ? (
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center select-none"
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.07}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={isDragging ? handleDragEnd : undefined}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <img
              src={
                currentRequest.fromUserID.photoUrl ||
                "https://ctmirror-images.s3.amazonaws.com/wp-content/uploads/2021/01/dummy-man-570x570-1.png"
              }
              alt={`${currentRequest.fromUserID.firstName} ${currentRequest.fromUserID.lastName}`}
              className="w-40 h-40 rounded-full object-cover border-8 border-indigo-400 mb-6 shadow-lg"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {currentRequest.fromUserID.firstName} {currentRequest.fromUserID.lastName}, {currentRequest.fromUserID.age}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{currentRequest.fromUserID.gender}</p>
            {currentRequest.fromUserID.about && (
              <p className="text-center text-gray-600 text-sm line-clamp-4 mb-6 px-4">
                {currentRequest.fromUserID.about}
              </p>
            )}

            {/* Accept/Reject Buttons */}
            <div className="flex gap-8">
              <button
                onClick={() => {
                  reviewRequest('rejected', currentRequest._id)
                  setCurrentIndex((prev) => Math.min(prev + 1, requests.length - 1))
                }}
                className="w-20 h-20 bg-red-500 rounded-full text-white text-2xl font-bold shadow-lg hover:bg-red-600 transition"
                title="Reject"
              >
                ×
              </button>
              <button
                onClick={() => {
                  reviewRequest('accepted', currentRequest._id)
                  setCurrentIndex((prev) => Math.min(prev + 1, requests.length - 1))
                }}
                className="w-20 h-20 bg-green-500 rounded-full text-white text-2xl font-bold shadow-lg hover:bg-green-600 transition"
                title="Accept"
              >
                ✓
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-center text-white text-2xl mt-20">
            You've reviewed all requests
          </h2>
        )}
      </div>
    </div>
  )
}

export default Requests
