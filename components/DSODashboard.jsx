"use client"

import { useState } from "react"
import { User, Home, MapPin, BarChart3, School, ChevronDown, LogOut, Edit, Download } from "lucide-react"
import CommonHeader from "./CommonHeader"
import Footer from "./Footer"

const DSODashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMandal, setSelectedMandal] = useState("All Mandals")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Suresh Reddy",
    phone: "+91 98765 43210",
    email: "suresh.reddy@ap.gov.in",
    role: "District Science Officer",
    district: "Krishna",
  })

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
      udiseCode: "28230100101",
      name: "Government High School Machilipatnam",
      type: "Government",
      mandal: "Machilipatnam",
      village: "Machilipatnam",
      girls: 220,
      boys: 230,
      total: 450,
      teachers: 18,
      active: "Yes",
    },
    {
      id: 2,
      udiseCode: "28230200102",
      name: "Zilla Parishad High School Gudivada",
      type: "Government",
      mandal: "Gudivada",
      village: "Gudivada",
      girls: 180,
      boys: 200,
      total: 380,
      teachers: 15,
      active: "Yes",
    },
    {
      id: 3,
      udiseCode: "28230300103",
      name: "Municipal High School Vijayawada",
      type: "Municipal",
      mandal: "Vijayawada Urban",
      village: "Vijayawada",
      girls: 260,
      boys: 260,
      total: 520,
      teachers: 22,
      active: "No",
    },
    {
      id: 4,
      udiseCode: "28230400104",
      name: "Government Girls High School Nandigama",
      type: "Government",
      mandal: "Nandigama",
      village: "Nandigama",
      girls: 320,
      boys: 0,
      total: 320,
      teachers: 14,
      active: "Yes",
    },
    {
      id: 5,
      udiseCode: "28230500105",
      name: "Residential School Jaggayyapeta",
      type: "Residential",
      mandal: "Jaggayyapeta",
      village: "Jaggayyapeta",
      girls: 140,
      boys: 140,
      total: 280,
      teachers: 12,
      active: "Yes",
    },
    {
      id: 6,
      udiseCode: "28230600106",
      name: "Government High School Tiruvuru",
      type: "Government",
      mandal: "Tiruvuru",
      village: "Tiruvuru",
      girls: 195,
      boys: 205,
      total: 400,
      teachers: 16,
      active: "No",
    },
    {
      id: 7,
      udiseCode: "28230700107",
      name: "Zilla Parishad School Pedana",
      type: "Government",
      mandal: "Pedana",
      village: "Pedana",
      girls: 165,
      boys: 175,
      total: 340,
      teachers: 13,
      active: "Yes",
    },
    {
      id: 8,
      udiseCode: "28230800108",
      name: "Municipal School Vijayawada Rural",
      type: "Municipal",
      mandal: "Vijayawada Rural",
      village: "Kankipadu",
      girls: 150,
      boys: 160,
      total: 310,
      teachers: 12,
      active: "Yes",
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

  const handleNavigate = (tabId) => {
    setActiveTab(tabId)
  }

  const getFilteredSchools = () => {
    if (selectedMandal === "All Mandals") {
      return schoolsData
    }
    return schoolsData.filter((school) => school.mandal === selectedMandal)
  }

  const exportToCSV = () => {
    const filteredData = getFilteredSchools()
    const headers = [
      "S.NO",
      "UDISE Code",
      "School Name",
      "Type",
      "Mandal",
      "Village",
      "Girls",
      "Boys",
      "Total",
      "Teachers",
      "Active",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((school, index) =>
        [
          index + 1,
          school.udiseCode,
          `"${school.name}"`,
          school.type,
          school.mandal,
          school.village,
          school.girls,
          school.boys,
          school.total,
          school.teachers,
          school.active,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "schools_mapping.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowExportDropdown(false)
  }

  const exportToExcel = () => {
    const filteredData = getFilteredSchools()
    const headers = [
      "S.NO",
      "UDISE Code",
      "School Name",
      "Type",
      "Mandal",
      "Village",
      "Girls",
      "Boys",
      "Total",
      "Teachers",
      "Active",
    ]
    const excelContent = [
      headers.join("\t"),
      ...filteredData.map((school, index) =>
        [
          index + 1,
          school.udiseCode,
          school.name,
          school.type,
          school.mandal,
          school.village,
          school.girls,
          school.boys,
          school.total,
          school.teachers,
          school.active,
        ].join("\t"),
      ),
    ].join("\n")

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "schools_mapping.xlsx")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowExportDropdown(false)
  }

  const getAllSchoolsStats = () => {
    const activeSchools = schoolsData.filter((s) => s.active === "Yes").length
    const totalStudents = schoolsData.reduce((sum, school) => sum + school.total, 0)
    const totalTeachers = schoolsData.reduce((sum, school) => sum + school.teachers, 0)
    const girlsEnrollment = schoolsData.reduce((sum, school) => sum + school.girls, 0)

    return { activeSchools, totalStudents, totalTeachers, girlsEnrollment }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        const stats = getAllSchoolsStats()
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Active Schools</h3>
                <p className="text-4xl font-bold text-green-600 mb-1">{stats.activeSchools}</p>
                <p className="text-sm text-gray-600">Fully operational</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Total Students</h3>
                <p className="text-4xl font-bold text-blue-600 mb-1">{stats.totalStudents}</p>
                <p className="text-sm text-gray-600">Across all schools</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Total Teachers</h3>
                <p className="text-4xl font-bold text-purple-600 mb-1">{stats.totalTeachers}</p>
                <p className="text-sm text-gray-600">Teaching staff</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Girls Enrollment</h3>
                <p className="text-4xl font-bold text-pink-600 mb-1">{stats.girlsEnrollment}</p>
                <p className="text-sm text-gray-600">Female students</p>
              </div>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Schools Mapping</h2>
              <div className="relative">
                <button
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={exportToCSV}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      CSV
                    </button>
                    <button
                      onClick={exportToExcel}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                    >
                      Excel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600">Showing {getFilteredSchools().length} schools</div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S.NO
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        UDISE Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        School Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mandal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Village
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Girls
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Boys
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teachers
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredSchools().map((school, index) => (
                      <tr key={school.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {school.udiseCode}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <School className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{school.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.type}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.mandal}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.village}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.girls}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.boys}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {school.total}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{school.teachers}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              school.active === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {school.active}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col`}
        >
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

      {/* Footer */}
      <Footer
        sidebarItems={sidebarItems}
        onNavigate={handleNavigate}
        onLogout={onLogout}
        isLoggedIn={true}
        currentUser={currentUser}
        dashboardType="DSO"
      />
    </div>
  )
}

export default DSODashboard
