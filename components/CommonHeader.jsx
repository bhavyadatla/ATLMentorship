"use client"

import { useState } from "react"
import { Atom, Menu, X, Bell, Search, User, LogOut, Settings } from "lucide-react"

const CommonHeader = ({
  currentPage,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  currentUser,
  showSidebar = false,
  showUserMenu = true,
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
    <header className="bg-green-100 px-6 py-4">
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
            <div className="w-8 h-8 text-blue-600">
              <Atom className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-gray-900">ATL Mentorship</span>
          </div>
        </div>

        {/* Right side - Navigation and User menu */}
        <div className="flex items-center space-x-4">
          {/* Navigation - Only show if not on login/register pages and not in dashboard */}
          {currentPage !== "login" && currentPage !== "register" && !showSidebar && (
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

          {/* Dashboard features - Search, Notifications, User menu */}
          {showUserMenu && currentUser && (
            <>
              {/* Search - only in dashboard */}
              {showSidebar && (
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Notifications - only in dashboard */}
              {showSidebar && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                              notification.unread ? "bg-blue-50" : ""
                            }`}
                          >
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{currentUser?.name || "User"}</span>
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</p>
                    </div>
                    <div className="py-2">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Login button for non-dashboard pages */}
          {!showUserMenu && onNavigate && (
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
