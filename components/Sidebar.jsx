"use client"
import { Home, User, Users, UserCheck, Calendar, FolderOpen, BookOpen, BarChart3, LogOut } from "lucide-react"

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "mentor-dashboard", label: "Mentor Dashboard", icon: UserCheck },
    { id: "mentee-dashboard", label: "Mentee Dashboard", icon: Users },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ATL</span>
          </div>
          {isOpen && <span className="font-bold text-gray-800">Mentorship</span>}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
