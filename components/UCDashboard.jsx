"use client"

import { useState } from "react"
import {
  User,
  Home,
  Users,
  School,
  Award,
  TrendingUp,
  BookOpen,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
} from "lucide-react"
import CommonHeader from "./CommonHeader"

const UCDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@university.edu.in",
    role: "University Coordinator",
    university: "State Technical University",
    department: "Engineering & Technology",
    experience: "12 years",
  })

  const [colleges, setColleges] = useState([
    {
      id: 1,
      name: "Government Engineering College",
      location: "Hyderabad",
      coordinator: "Dr. Priya Sharma",
      students: 1200,
      atlStatus: "Active",
      phone: "+91 98765 43211",
      email: "priya.sharma@college.edu.in",
    },
    {
      id: 2,
      name: "Institute of Technology",
      location: "Warangal",
      coordinator: "Prof. Suresh Reddy",
      students: 980,
      atlStatus: "Active",
      phone: "+91 98765 43212",
      email: "suresh.reddy@college.edu.in",
    },
    {
      id: 3,
      name: "Polytechnic College",
      location: "Vijayawada",
      coordinator: "Dr. Lakshmi Devi",
      students: 750,
      atlStatus: "Pending",
      phone: "+91 98765 43213",
      email: "lakshmi.devi@college.edu.in",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "colleges", label: "College Management", icon: School },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const getStatsData = () => {
    return {
      totalColleges: colleges.length,
      activeATL: colleges.filter((c) => c.atlStatus === "Active").length,
      totalStudents: colleges.reduce((sum, college) => sum + college.students, 0),
      pendingSetup: colleges.filter((c) => c.atlStatus === "Pending").length,
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        const stats = getStatsData()
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">University Coordinator Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.university} - Welcome back, {editedProfile.name}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Colleges</p>
                    <p className="text-3xl font-bold">{stats.totalColleges}</p>
                    <p className="text-blue-200 text-xs mt-1">Under university</p>
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

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    <p className="text-purple-200 text-xs mt-1">Enrolled</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Pending Setup</p>
                    <p className="text-3xl font-bold">{stats.pendingSetup}</p>
                    <p className="text-orange-200 text-xs mt-1">Requires attention</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Recent College Activities
                </h3>
                <div className="space-y-4">
                  {colleges.slice(0, 3).map((college) => (
                    <div key={college.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{college.name}</p>
                        <p className="text-sm text-gray-600">
                          {college.location} - {college.students} students
                        </p>
                        <p className="text-xs text-gray-500">Coordinator: {college.coordinator}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          college.atlStatus === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {college.atlStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ATL Setup Progress</span>
                    <span className="text-sm text-gray-500">
                      {stats.activeATL}/{stats.totalColleges}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(stats.activeATL / stats.totalColleges) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Student Engagement</span>
                    <span className="text-sm text-gray-500">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Project Completion</span>
                    <span className="text-sm text-gray-500">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
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
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                  <User className="h-10 w-10 text-green-600" />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={editedProfile.role}
                        onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                      <input
                        type="text"
                        value={editedProfile.university}
                        onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      <span className="font-medium text-gray-700">Phone</span>
                      <span className="text-gray-900">{editedProfile.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Email</span>
                      <span className="text-gray-900">{editedProfile.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">University</span>
                      <span className="text-gray-900">{editedProfile.university}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Department</span>
                      <span className="text-gray-900">{editedProfile.department}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "colleges":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">College Management</h2>

            {/* Colleges Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        College Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ATL Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {colleges.map((college) => (
                      <tr key={college.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <School className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{college.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {college.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{college.coordinator}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              college.atlStatus === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {college.atlStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{college.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Mail className="h-4 w-4" />
                            <span>{college.email}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "analytics":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>

            {/* Analytics Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">College Performance</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Performance analytics chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Student Engagement</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Engagement metrics chart</p>
                  </div>
                </div>
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
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-gray-900">{editedProfile.name}</p>
                <p className="text-sm text-gray-500">University Coordinator</p>
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
                      ? "bg-green-50 text-green-700 font-medium"
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

export default UCDashboard
