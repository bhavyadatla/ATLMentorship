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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("currentUser")
      if (userData) {
        setCurrentUser(JSON.parse(userData))
      } else {
        setCurrentUser({
          id: 1,
          name: "Dr. Venkata Rao",
          email: "venkata.rao@ap.gov.in",
          role: "SO",
          avatar: "/placeholder.svg?height=40&width=40",
        })
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    setShowLogoutDialog(false)
    window.location.href = "/"
  }

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false)
  }

  const handleNavigate = (page) => {
    if (page === "login") {
      handleLogout()
    } else {
      window.location.href = `/${page}`
    }
  }

  const LogoutDialog = () =>
    showLogoutDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to logout? You will need to sign in again to access your dashboard.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleLogoutConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Logout
            </button>
            <button
              onClick={handleLogoutCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )

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

  switch (currentUser.role?.toLowerCase()) {
    case "mentor":
      return (
        <>
          <MentorDashboard currentUser={currentUser} onLogout={handleLogout} />
          <LogoutDialog />
        </>
      )
    case "mentee":
      return (
        <>
          <MenteeDashboard currentUser={currentUser} onLogout={handleLogout} />
          <LogoutDialog />
        </>
      )
    case "uc":
    case "university coordinator":
      return (
        <>
          <UCDashboard currentUser={currentUser} onLogout={handleLogout} />
          <LogoutDialog />
        </>
      )
    case "cc":
    case "college coordinator":
      return (
        <>
          <CCDashboard currentUser={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
          <LogoutDialog />
        </>
      )
    case "so":
    case "state officer":
      return (
        <>
          <SODashboard currentUser={currentUser} onLogout={handleLogout} />
          <LogoutDialog />
        </>
      )
    case "dso":
    case "district science officer":
      return (
        <>
          <DSODashboard currentUser={currentUser} onLogout={handleLogout} />
          <LogoutDialog />
        </>
      )
    default:
      return (
        <>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Unknown Role</h2>
              <p className="text-gray-600 mb-4">Role: {currentUser.role}</p>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
          <LogoutDialog />
        </>
      )
  }
}

export default Dashboard
