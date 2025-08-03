"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const CommonHeader = ({
  currentPage,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  currentUser,
  showSidebar = false,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "public-dashboard", label: "Dashboard" },
    { id: "about", label: "About" },
    { id: "support", label: "Support" },
  ]

  const notifications = [
    { id: 1, message: "New mentorship request received", time: "5 min ago", unread: true },
    { id: 2, message: "Project milestone completed", time: "1 hour ago", unread: true },
    { id: 3, message: "Weekly report is ready", time: "2 hours ago", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="bg-gradient-to-r from-gradientStart/[40%] via-gradientMid/[70%] to-gradientEnd/[100%] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Menu toggle (if sidebar) and Logo */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle button - only show if showSidebar is true */}
          {showSidebar && setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <img src="/images/atl-logo.png" alt="ATL Logo" className="w-6 h-6 rounded-full" />
            </div>
            <span className="text-xl font-bold text-gray-900">ATL Mentorship</span>
          </div>
        </div>

        {/* Right side - Navigation and User menu */}
        <div className="flex items-center space-x-4">
          {/* Navigation - Only show if not on login/register pages and not in dashboard */}
          {!showSidebar && currentPage !== "login" && currentPage !== "register" && (
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-colors ${
                    currentPage === item.id ? "text-gray-900 font-bold" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Login button for non-dashboard pages */}
          {!showSidebar && onNavigate && (
            <>
              {currentPage !== "login" && currentPage !== "register" && (
                <button
                  onClick={() => onNavigate("login")}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Login
                </button>
              )}

              {/* Simple navigation for login/register pages */}
              {(currentPage === "login" || currentPage === "register") && (
                <button
                  onClick={() => onNavigate("home")}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Home
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showUserDropdown || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserDropdown(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}

export default CommonHeader
