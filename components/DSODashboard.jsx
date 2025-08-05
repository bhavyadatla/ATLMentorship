"use client"

import { useState } from "react"
import { User, Home, MapPin, BarChart3, School, ChevronDown, LogOut, Edit } from "lucide-react"
import CommonHeader from "./CommonHeader"

const DSODashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMandal, setSelectedMandal] = useState("All Mandals")
  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Suresh Reddy",
    phone: "+91 98765 43210",
    email: "suresh.reddy@ap.gov.in",
    role: "District Science Officer",
    district: "Krishna", // Added district field
  })

  // Sample data
  const mandals = [
    "All Mandals",
    "Machilipatnam",
    "Gudivada",
    "Vijayawada Rural",
    "Vijayawada Urban",
    "Nandigama",
    "Jaggayyapeta",
    "Tiruvuru",
    "Pedana",
  ]

  const [schoolsData, setSchoolsData] = useState([
    {
      id: 1,
      name: "Government High School Machilipatnam",
      mandal: "Machilipatnam",
      type: "Government",
      students: 450,
      atlStatus: "Active",
      coordinator: "Mr. Ravi Kumar",
      phone: "+91 98765 43211",
    },
    {
      id: 2,
      name: "Zilla Parishad High School Gudivada",
      mandal: "Gudivada",
      type: "Government",
      students: 380,
      atlStatus: "Active",
      coordinator: "Ms. Lakshmi Devi",
      phone: "+91 98765 43212",
    },
    {
      id: 3,
      name: "Municipal High School Vijayawada",
      mandal: "Vijayawada Urban",
      type: "Municipal",
      students: 520,
      atlStatus: "Pending",
      coordinator: "Dr. Prasad Rao",
      phone: "+91 98765 43213",
    },
    {
      id: 4,
      name: "Government Girls High School Nandigama",
      mandal: "Nandigama",
      type: "Government",
      students: 320,
      atlStatus: "Active",
      coordinator: "Mrs. Sunitha Reddy",
      phone: "+91 98765 43214",
    },
    {
      id: 5,
      name: "Residential School Jaggayyapeta",
      mandal: "Jaggayyapeta",
      type: "Residential",
      students: 280,
      atlStatus: "Inactive",
      coordinator: "Mr. Venkat Rao",
      phone: "+91 98765 43215",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "schools", label: "Schools Mapping", icon: MapPin },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const getFilteredSchools = () => {
    if (selectedMandal === "All Mandals") {
      return schoolsData
    }
    return schoolsData.filter((school) => school.mandal === selectedMandal)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">District Science Officer Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {editedProfile.name} from {editedProfile.district} District.
              </p>
            </div>

            {/* Mandal Selector */}
            <div className="mb-6">
              <div className="relative inline-block">
                <select
                  value={selectedMandal}
                  onChange={(e) => setSelectedMandal(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mandals.map((mandal) => (
                    <option key={mandal} value={mandal}>
                      {mandal}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Stats Cards - Generic Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 1</div>
              <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 2</div>
              <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 3</div>
              <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 4</div>
            </div>

            {/* Analytics Graph Section - Large Placeholder */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                ATL Performance Analytics
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-gray-700 mb-2">Graph</h4>
                </div>
              </div>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                  <User className="h-10 w-10 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Profile Information</h3>
                  <p className="text-gray-600">View and edit your profile details</p>
                </div>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="ml-auto p-2 text-gray-600 hover:text-gray-900">
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={editedProfile.role}
                        onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ph.no</label>
                      <input
                        type="text"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <input
                        type="text"
                        value={editedProfile.district}
                        onChange={(e) => setEditedProfile({ ...editedProfile, district: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleProfileSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Name</span>
                      <span className="text-gray-900">{editedProfile.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Role</span>
                      <span className="text-gray-900">{editedProfile.role}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Ph.no</span>
                      <span className="text-gray-900">{editedProfile.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Email</span>
                      <span className="text-gray-900">{editedProfile.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">District</span>
                      <span className="text-gray-900">{editedProfile.district}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "schools":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Schools Mapping</h2>

            {/* Filter Section */}
            <div className="mb-6 flex items-center space-x-4">
              <div className="relative">
                <select
                  value={selectedMandal}
                  onChange={(e) => setSelectedMandal(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mandals.map((mandal) => (
                    <option key={mandal} value={mandal}>
                      {mandal}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="text-sm text-gray-600">Showing {getFilteredSchools().length} schools</div>
            </div>

            {/* Schools Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        School Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mandal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ATL Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredSchools().map((school) => (
                      <tr key={school.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <School className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{school.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.mandal}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              school.atlStatus === "Active"
                                ? "bg-green-100 text-green-800"
                                : school.atlStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {school.atlStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.coordinator}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2">Active ATL Schools</h3>
                <p className="text-3xl font-bold text-green-600">
                  {getFilteredSchools().filter((s) => s.atlStatus === "Active").length}
                </p>
                <p className="text-sm text-gray-600">Fully operational</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2">Pending Setup</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {getFilteredSchools().filter((s) => s.atlStatus === "Pending").length}
                </p>
                <p className="text-sm text-gray-600">Requires attention</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {getFilteredSchools().reduce((sum, school) => sum + school.students, 0)}
                </p>
                <p className="text-sm text-gray-600">Across all schools</p>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* User Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-gray-900">{editedProfile.name}</p>
                <p className="text-sm text-gray-500">Dist_Sci Officer</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
            {/* Logout Button */}
            <li>
              <button
                onClick={onLogout}
                className="w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 hover:text-red-700 mt-4"
              >
                <LogOut className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CommonHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={onLogout}
          currentUser={currentUser}
          showSidebar={true}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

export default DSODashboard
