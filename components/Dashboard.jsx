"use client"

import { useState, useEffect } from "react"
import MentorDashboard from "./MentorDashboard"
import MenteeDashboard from "./MenteeDashboard"
import UCDashboard from "./UCDashboard"
import CCDashboard from "./CCDashboard"
import SODashboard from "./SODashboard"
import DSODashboard from "./DSODashboard"

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      // Get user data from localStorage or API
      const userData = localStorage.getItem("currentUser")
      if (userData) {
        setCurrentUser(JSON.parse(userData))
      } else {
        // Default user for demo - you can change this to test different roles
        setCurrentUser({
          id: 1,
          name: "Dr. Venkata Rao",
          email: "venkata.rao@ap.gov.in",
          role: "SO", // Change this to test different dashboards: "mentor", "mentee", "UC", "CC", "SO", "DSO"
          avatar: "/placeholder.svg?height=40&width=40",
        })
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    // Redirect to login or home page
    window.location.href = "/"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Render appropriate dashboard based on user role
  switch (currentUser.role?.toLowerCase()) {
    case "mentor":
      return <MentorDashboard currentUser={currentUser} onLogout={handleLogout} />
    case "mentee":
      return <MenteeDashboard currentUser={currentUser} onLogout={handleLogout} />
    case "uc":
    case "university coordinator":
      return <UCDashboard currentUser={currentUser} onLogout={handleLogout} />
    case "cc":
    case "college coordinator":
      return <CCDashboard currentUser={currentUser} onLogout={handleLogout} />
    case "so":
    case "state officer":
      return <SODashboard currentUser={currentUser} onLogout={handleLogout} />
    case "dso":
    case "district science officer":
      return <DSODashboard currentUser={currentUser} onLogout={handleLogout} />
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unknown Role</h2>
            <p className="text-gray-600 mb-4">Role: {currentUser.role}</p>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      )
  }
}

export default Dashboard
