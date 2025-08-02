"use client"

import { useState } from "react"
import { User, Home, MapPin, BarChart3, TrendingUp, Users, School, Award, Calendar, ChevronDown } from "lucide-react"
import CommonHeader from "./CommonHeader"

const DSODashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedMandal, setSelectedMandal] = useState("Mandal")
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Suresh Reddy",
    phone: "+91 98765 43210",
    email: "suresh.reddy@ap.gov.in",
    role: "District Science Officer",
    district: "Krishna District",
    experience: "15 years",
  })

  // Sample data
  const mandals = [
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
    if (selectedMandal === "Mandal" || selectedMandal === "All") {
      return schoolsData
    }
    return schoolsData.filter((school) => school.mandal === selectedMandal)
  }

  const getStatsData = () => {
    const filteredSchools = getFilteredSchools()
    return {
      totalSchools: filteredSchools.length,
      activeATL: filteredSchools.filter((s) => s.atlStatus === "Active").length,
      pendingATL: filteredSchools.filter((s) => s.atlStatus === "Pending").length,
      totalStudents: filteredSchools.reduce((sum, school) => sum + school.students, 0),
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        const stats = getStatsData()
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">District Science Officer Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.district} - Welcome back, {editedProfile.name}
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
                  <option value="Mandal">All Mandals</option>
                  {mandals.map((mandal) => (
                    <option key={mandal} value={mandal}>
                      {mandal}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Schools</p>
                    <p className="text-3xl font-bold">{stats.totalSchools}</p>
                    <p className="text-blue-200 text-xs mt-1">In district</p>
                  </div>
                  <School className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active ATL</p>
                    <p className="text-3xl font-bold">{stats.activeATL}</p>
                    <p className="text-green-200 text-xs mt-1">Operational</p>
                  </div>
                  <Award className="h-8 w-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pending ATL</p>
                    <p className="text-3xl font-bold">{stats.pendingATL}</p>
                    <p className="text-yellow-200 text-xs mt-1">Setup required</p>
                  </div>
                  <Calendar className="h-8 w-8 text-yellow-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    <p className="text-purple-200 text-xs mt-1">Beneficiaries</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-200" />
                </div>
              </div>
            </div>

            {/* Analytics Graph Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                ATL Performance Analytics
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-700 mb-2">Graph</h4>
                  <p className="text-gray-500">Performance analytics will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Recent School Activities
                </h3>
                <div className="space-y-4">
                  {getFilteredSchools()
                    .slice(0, 3)
                    .map((school) => (
                      <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{school.name}</p>
                          <p className="text-sm text-gray-600">
                            {school.mandal} - {school.students} students
                          </p>
                          <p className="text-xs text-gray-500">Coordinator: {school.coordinator}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            school.atlStatus === "Active"
                              ? "bg-green-100 text-green-800"
                              : school.atlStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {school.atlStatus}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Mandal Distribution
                </h3>
                <div className="space-y-3">
                  {mandals.slice(0, 4).map((mandal) => {
                    const mandalSchools = schoolsData.filter((s) => s.mandal === mandal)
                    const activeCount = mandalSchools.filter((s) => s.atlStatus === "Active").length
                    return (
                      <div key={mandal} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{mandal}</p>
                          <p className="text-sm text-gray-600">{mandalSchools.length} schools</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{activeCount} Active</p>
                          <p className="text-xs text-gray-500">{mandalSchools.length - activeCount} Others</p>
                        </div>
                      </div>
                    )
                  })}
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
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
                  <option value="Mandal">All Mandals</option>
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
                <p className="font-medium text-gray-900">Name</p>
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
          showUserMenu={true}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

export default DSODashboard
