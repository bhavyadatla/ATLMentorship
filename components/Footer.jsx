"use client"

import { ArrowUp } from "lucide-react"

const Footer = ({
  sidebarItems = [],
  onNavigate,
  onLogout,
  isLoggedIn = false,
  currentUser = null,
  dashboardType = null,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Partner logos - using actual organization logos for now
  const partnerLogos = [
    {
      name: "Andhra Pradesh Government",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250816-WA0012.jpg-VpnuL7wBI1kxmUSrKsrdTgD2KdX3pY.jpeg",
    },
    {
      name: "APSCHE",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250816-WA0014.jpg-4KQcIJdsSnIdJVkjcHyQerE9Kirrzw.jpeg",
    },
    {
      name: "BCDE",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-16%20at%2021.13.49_8f9d6a76.jpg-1w98rktGH8Wc5isv1TSTbPGD881h66.jpeg",
    },
    {
      name: "UNICEF",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250816-WA0013.jpg-GrXxB7j5Kvkq3AzRB8k7HXPDt615R8.jpeg",
    },
    {
      name: "Vigyan Ashram",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250816-WA0011.jpg-or0jWa6hQ2JWSKHaNJnfTFsnFuvwIn.jpeg",
    },
    {
      name: "VVIT University",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250816-WA0010.jpg-je1ND7LS93Q8fP6yHuHOMIYwfH2DUm.jpeg",
    },
  ]

  const getDashboardNavigation = (type) => {
    switch (type) {
      case "UC":
        return [
          { id: "home", label: "Home" },
          { id: "profile", label: "Profile" },
          { id: "colleges-list", label: "Colleges List" },
          { id: "module-completion", label: "Module Completion" },
          { id: "approvals", label: "Approvals" },
          { id: "export-data", label: "Export Data" },
        ]
      case "DSO":
        return [
          { id: "home", label: "Home" },
          { id: "profile", label: "Profile" },
          { id: "school-mapping", label: "School Mapping" },
        ]
      case "CC":
        return [
          { id: "home", label: "Home" },
          { id: "profile", label: "Profile" },
          { id: "team", label: "Team" },
          { id: "export-data", label: "Export Data" },
        ]
      case "SO":
        return [
          { id: "home", label: "Home" },
          { id: "profile", label: "Profile" },
          { id: "announcements", label: "Announcements" },
          { id: "approvals", label: "Approvals" },
          { id: "export-data", label: "Export Data" },
          { id: "module-completion", label: "Module Completion" },
        ]
      default:
        return [
          { id: "dashboard", label: "Dashboard Overview" },
          { id: "profile", label: "My Profile" },
          { id: "sessions", label: "Session Management" },
          { id: "projects", label: "Project Tracker" },
          { id: "resources", label: "Resource Library" },
          { id: "analytics", label: "Analytics & Reports" },
        ]
    }
  }

  if (isLoggedIn) {
    // Footer for logged-in users (dashboard pages)
    const navigationItems = getDashboardNavigation(dashboardType)

    return (
      <footer className="mt-auto">
        {/* Main Footer Section for Logged-in Users */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-800 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section - User Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-bold text-gray-800">ATL Dashboard</h3>
                </div>
                {currentUser && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{currentUser.name}</p>
                    <p>{currentUser.title || currentUser.role}</p>
                  </div>
                )}
              </div>

              {/* Center Section - Dashboard Navigation */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">Navigation</h4>
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => onNavigate && onNavigate(item.id)}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Section - Actions */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">Actions</h4>
                <ul className="space-y-2">
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
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="w-32 h-32 bg-white flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="w-28 h-28 object-contain p-2"
                />
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
                    onClick={() => onNavigate && onNavigate("support")}
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
