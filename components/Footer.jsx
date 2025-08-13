"use client"

import { ArrowUp } from "lucide-react"

const Footer = ({ sidebarItems = [], onNavigate, onLogout, isLoggedIn = false, currentUser = null }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Partner logos - using placeholder images for now
  const partnerLogos = [
    { name: "Partner 1", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Partner 2", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Partner 3", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Partner 4", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Partner 5", logo: "/placeholder.svg?height=80&width=80" },
  ]

  const dashboardFeatures = [
    { id: "dashboard", label: "Dashboard Overview" },
    { id: "profile", label: "My Profile" },
    { id: "sessions", label: "Session Management" },
    { id: "projects", label: "Project Tracker" },
    { id: "resources", label: "Resource Library" },
    { id: "analytics", label: "Analytics & Reports" },
  ]

  if (isLoggedIn) {
    // Footer for logged-in users (dashboard pages)
    return (
      <footer className="mt-auto">
        {/* Main Footer Section for Logged-in Users */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-800 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Section - User Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <img src="/atl-logo.png" alt="ATL Logo" className="w-6 h-6 rounded-full" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">ATL Dashboard</h3>
                </div>
                {currentUser && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{currentUser.name}</p>
                    <p>{currentUser.title || currentUser.role}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">Dashboard Features</h4>
                <ul className="space-y-2">
                  {dashboardFeatures.slice(0, 4).map((feature) => (
                    <li key={feature.id}>
                      <button
                        onClick={() => onNavigate && onNavigate(feature.id)}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {feature.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">More Features</h4>
                <ul className="space-y-2">
                  {dashboardFeatures.slice(4).map((feature) => (
                    <li key={feature.id}>
                      <button
                        onClick={() => onNavigate && onNavigate(feature.id)}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {feature.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => onNavigate && onNavigate("mentor-dashboard")}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Mentor Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate && onNavigate("mentee-dashboard")}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Mentee Dashboard
                    </button>
                  </li>
                </ul>
              </div>

              {/* Support & Actions */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">Support & Actions</h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => onNavigate && onNavigate("support")}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Help Center
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate && onNavigate("about")}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      About ATL
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onLogout}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors cursor-pointer font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>

                {/* Back to Top Button */}
                <div className="pt-2">
                  <button
                    onClick={scrollToTop}
                    className="flex items-center space-x-2 border-2 border-blue-300 text-blue-600 rounded-full px-3 py-2 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 text-sm"
                  >
                    <span className="font-medium">Back to top</span>
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-gray-100 text-gray-600 py-3 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm">© 2025 Copyright : atlmentorship.com</p>
          </div>
        </div>
      </footer>
    )
  }

  // Footer for public pages (before login)
  return (
    <footer className="mt-auto">
      {/* Partner Logos Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center space-x-8">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm"
              >
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="w-16 h-16 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-800 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section - ATL Mentorship */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/images/atl-logo.png" alt="ATL Logo" className="w-8 h-8 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">ATL Mentorship</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                ATL mentorship is used for fostering innovation and entrepreneurship culture across educational
                institutions through structured mentorship programs and collaborative learning.
              </p>
              <div className="pt-4">
                <span className="text-gray-500 font-medium">Section 1</span>
              </div>
            </div>

            {/* Center Section - Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("home")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("public-dashboard")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("about")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    About ATL
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("support")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("login")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer font-medium"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Section - About */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">About</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("about")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    About ATL
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("about")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Mission & Vision
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate("about")}
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    FAQ's
                  </button>
                </li>
              </ul>

              {/* Back to Top Button */}
              <div className="pt-4">
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-2 border-2 border-blue-300 text-blue-600 rounded-full px-4 py-2 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                >
                  <span className="font-medium">Back to top</span>
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-100 text-gray-600 py-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2025 Copyright : atlmentorship.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
