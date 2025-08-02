"use client"

import { useState } from "react"
import { User, Home, Users, School, Award, TrendingUp, MapPin, Phone, Mail, Edit, BarChart3 } from "lucide-react"
import CommonHeader from "./CommonHeader"

const SODashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Venkata Rao",
    phone: "+91 98765 43210",
    email: "venkata.rao@ap.gov.in",
    role: "State Officer",
    state: "Andhra Pradesh",
    department: "Education & Technology",
    experience: "18 years",
  })

  const [districts, setDistricts] = useState([
    {
      id: 1,
      name: "Krishna District",
      dso: "Dr. Suresh Reddy",
      schools: 45,
      activeATL: 38,
      students: 12500,
      phone: "+91 98765 43211",
      email: "suresh.reddy@ap.gov.in",
    },
    {
      id: 2,
      name: "Guntur District",
      dso: "Dr. Lakshmi Prasad",
      schools: 52,
      activeATL: 41,
      students: 14200,
      phone: "+91 98765 43212",
      email: "lakshmi.prasad@ap.gov.in",
    },
    {
      id: 3,
      name: "West Godavari District",
      dso: "Prof. Ravi Kumar",
      schools: 38,
      activeATL: 29,
      students: 9800,
      phone: "+91 98765 43213",
      email: "ravi.kumar@ap.gov.in",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "districts", label: "District Management", icon: MapPin },
    { id: "analytics", label: "State Analytics", icon: BarChart3 },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const getStatsData = () => {
    return {
      totalDistricts: districts.length,
      totalSchools: districts.reduce((sum, district) => sum + district.schools, 0),
      activeATL: districts.reduce((sum, district) => sum + district.activeATL, 0),
      totalStudents: districts.reduce((sum, district) => sum + district.students, 0),
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        const stats = getStatsData()
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">State Officer Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.state} - Welcome back, {editedProfile.name}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">Total Districts</p>
                    <p className="text-3xl font-bold">{stats.totalDistricts}</p>
                    <p className="text-indigo-200 text-xs mt-1">Under state</p>
                  </div>
                  <MapPin className="h-8 w-8 text-indigo-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Schools</p>
                    <p className="text-3xl font-bold">{stats.totalSchools}</p>
                    <p className="text-blue-200 text-xs mt-1">Across state</p>
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
                    <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                    <p className="text-purple-200 text-xs mt-1">Beneficiaries</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-200" />
                </div>
              </div>
            </div>

            {/* State Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  District Performance
                </h3>
                <div className="space-y-4">
                  {districts.map((district) => (
                    <div key={district.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{district.name}</p>
                        <p className="text-sm text-gray-600">
                          {district.schools} schools - {district.students.toLocaleString()} students
                        </p>
                        <p className="text-xs text-gray-500">DSO: {district.dso}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {district.activeATL}/{district.schools} ATL
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((district.activeATL / district.schools) * 100)}% Active
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  State Analytics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ATL Setup Progress</span>
                    <span className="text-sm text-gray-500">
                      {stats.activeATL}/{stats.totalSchools}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(stats.activeATL / stats.totalSchools) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">District Coverage</span>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Student Participation</span>
                    <span className="text-sm text-gray-500">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent State Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent State Activities</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New ATL setup completed in Krishna District</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">State-wide innovation competition launched</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Monthly district coordinators meeting completed</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
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
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mr-6">
                  <User className="h-10 w-10 text-indigo-600" />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={editedProfile.role}
                        onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={editedProfile.state}
                        onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      <span className="font-medium text-gray-700">State</span>
                      <span className="text-gray-900">{editedProfile.state}</span>
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

      case "districts":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">District Management</h2>

            {/* Districts Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        District Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DSO
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schools
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active ATL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {districts.map((district) => (
                      <tr key={district.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <MapPin className="h-5 w-5 text-indigo-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{district.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{district.dso}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{district.schools}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {district.activeATL}/{district.schools}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {district.students.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{district.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Mail className="h-4 w-4" />
                            <span>{district.email}</span>
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
            <h2 className="text-2xl font-bold mb-6">State Analytics</h2>

            {/* Analytics Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">District Performance Comparison</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">District comparison chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">State-wide Trends</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Trend analysis chart</p>
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
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-gray-900">{editedProfile.name}</p>
                <p className="text-sm text-gray-500">State Officer</p>
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
                      ? "bg-indigo-50 text-indigo-700 font-medium"
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

export default SODashboard
