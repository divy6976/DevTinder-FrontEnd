import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { BASE_URL } from '../utils/constants'
import NavBar from '../NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionsSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections) || []
  const dispatch = useDispatch()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStart, setDragStart] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [message, setMessage] = useState('')

  const cardRef = useRef(null)

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/connection`, {
        withCredentials: true,
      })
      if (Array.isArray(res.data.data)) {
        dispatch(addConnection(res.data.data))
      } else {
        dispatch(addConnection([]))
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
      dispatch(addConnection([]))
    }
  }

  useEffect(() => {
    fetchConnections()
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
    if (Math.abs(dragOffset.x) > threshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, connections.length - 1))
      setMessage('')
    }
    setDragOffset({ x: 0, y: 0 })
  }

  const handleSendMessage = async () => {
    const currentCard = connections[currentIndex]
    if (!message.trim() || !currentCard) return

    try {
      const payload = {
        message,
        recipientId: currentCard._id,
      }

      await axios.post(`${BASE_URL}/messages/send`, payload, {
        withCredentials: true,
      })

      setMessage('')
      console.log('Message sent successfully')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const currentCard = connections[currentIndex]

  // Calculate like or dislike opacity for overlays
  const likeOpacity = dragOffset.x > 0 ? Math.min(dragOffset.x / 150, 1) : 0
  const dislikeOpacity = dragOffset.x < 0 ? Math.min(-dragOffset.x / 150, 1) : 0

  return (
    <div className="min-h-screen w-full bg-[#020617] relative text-white overflow-hidden">
      {/* Enhanced Red Radial Glow Background */}
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

      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-[#020617]/90 backdrop-blur-lg border-b border-red-500/30">
        <NavBar />
      </div>

      <div className="pt-24 flex justify-center items-center min-h-[calc(100vh-96px)] px-4 relative z-10">
        {connections.length === 0 ? (
          <h2 className="text-center text-white text-xl mt-20">No connections found</h2>
        ) : currentCard ? (
          <div className="flex flex-col items-center w-full max-w-md">
            <div
              ref={cardRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={isDragging ? handleDragEnd : undefined}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              className="bg-white rounded-3xl shadow-2xl p-6 w-full relative z-10 mb-4 cursor-grab select-none"
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.07}deg) scale(${isDragging ? 1.05 : 1})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
                boxShadow: '0 15px 25px rgba(0,0,0,0.3)',
              }}
            >
              {/* Like overlay */}
              <div
                style={{
                  opacity: likeOpacity,
                }}
                className="absolute top-6 left-6 text-green-500 text-4xl font-bold uppercase border-4 border-green-500 rounded px-4 py-2 select-none pointer-events-none"
              >
                Like
              </div>
              {/* Dislike overlay */}
              <div
                style={{
                  opacity: dislikeOpacity,
                }}
                className="absolute top-6 right-6 text-red-500 text-4xl font-bold uppercase border-4 border-red-500 rounded px-4 py-2 select-none pointer-events-none"
              >
                Nope
              </div>

              <img
                src={
                  currentCard.photoUrl ||
                  'https://ctmirror-images.s3.amazonaws.com/wp-content/uploads/2021/01/dummy-man-570x570-1.png'
                }
                alt={`${currentCard.firstName} ${currentCard.lastName}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 mx-auto mb-6 shadow-lg"
              />
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                {currentCard.firstName} {currentCard.lastName}, {currentCard.age}
              </h2>
              <p className="text-center text-gray-700 text-sm mt-1">{currentCard.gender}</p>
              {currentCard.about && (
                <p className="text-center text-gray-600 text-sm mt-3 line-clamp-4">{currentCard.about}</p>
              )}
            </div>

            <div className="w-full flex items-center gap-3">
            <input
  type="text"
  value={message}
  placeholder={`Message ${currentCard.firstName}...`}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSendMessage()
  }}
  className="flex-1 py-3 px-5 rounded-full border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-black bg-white placeholder-gray-400"
/>
              <button
                onClick={handleSendMessage}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-full text-sm font-semibold transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-center text-white text-xl mt-20">You've seen all connections</h2>
        )}
      </div>
    </div>
  )
}

export default Connections
