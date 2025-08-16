"use client"

import { useState } from "react"
import { Search, Download, X, Edit, Users, CheckCircle, Clock, Rocket, User, Home, LogOut } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"
import Footer from "./Footer"

const CCDashboard = ({ onNavigate, currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Sample team data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      teamNo: "T001",
      name: "Rahul Kumar",
      rollNo: "20CS001",
      phoneNo: "9876543210",
      lastVisit: "2024-01-15",
      status: "Approved",
    },
    {
      id: 2,
      teamNo: "T002",
      name: "Priya Sharma",
      rollNo: "20CS002",
      phoneNo: "9876543211",
      lastVisit: "2024-01-14",
      status: "Pending",
    },
    {
      id: 3,
      teamNo: "T003",
      name: "Amit Singh",
      rollNo: "20CS003",
      phoneNo: "9876543212",
      lastVisit: "2024-01-13",
      status: "Approved",
    },
    {
      id: 4,
      teamNo: "T004",
      name: "Sneha Patel",
      rollNo: "20CS004",
      phoneNo: "9876543213",
      lastVisit: "2024-01-12",
      status: "Pending",
    },
    {
      id: 5,
      teamNo: "T005",
      name: "Vikash Yadav",
      rollNo: "20CS005",
      phoneNo: "9876543214",
      lastVisit: "2024-01-11",
      status: "Pending",
    },
  ])

  // Profile data
  const [profileData, setProfileData] = useState({
    name: currentUser.name || "Dr. Rajesh Kumar",
    email: currentUser.email || "rajesh.kumar@college.edu",
    phone: currentUser.phone || "+91 9876543210",
    universityName: currentUser.universityName || "ABC University",
    collegeName: currentUser.collegeName || "BCDE Engineering College",
    role: currentUser.role || "BCDE College Coordinator",
  })

  // Add member form data
  const [newMember, setNewMember] = useState({
    teamNo: "",
    name: "",
    rollNo: "",
    phoneNo: "",
    lastVisit: "",
  })

  // Calculate stats
  const totalTeams = teamMembers.length
  const approvedTeams = teamMembers.filter((member) => member.status === "Approved").length
  const pendingTeams = teamMembers.filter((member) => member.status === "Pending").length
  const activeProjects = 12 // Example static value

  // Filter team members based on search
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.teamNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApproveClick = (member) => {
    setSelectedMember(member)
    setShowApproveDialog(true)
  }

  const handleApproveConfirm = () => {
    if (selectedMember) {
      setTeamMembers((prev) =>
        prev.map((member) => (member.id === selectedMember.id ? { ...member, status: "Approved" } : member)),
      )
    }
    setShowApproveDialog(false)
    setSelectedMember(null)
  }

  const handleApproveCancel = () => {
    setShowApproveDialog(false)
    setSelectedMember(null)
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    const newId = Math.max(...teamMembers.map((m) => m.id)) + 1
    const memberToAdd = {
      id: newId,
      ...newMember,
      status: "Pending",
    }
    setTeamMembers((prev) => [...prev, memberToAdd])
    setNewMember({
      teamNo: "",
      name: "",
      rollNo: "",
      phoneNo: "",
      lastVisit: "",
    })
    setShowAddMemberModal(false)
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    setIsEditingProfile(false)
  }

  const exportToCSV = () => {
    const headers = ["Team No", "Name", "Roll No", "Phone No", "Last Visit", "Status"]
    const csvContent = [
      headers.join(","),
      ...teamMembers.map((member) =>
        [member.teamNo, member.name, member.rollNo, member.phoneNo, member.lastVisit, member.status].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "team_data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToExcel = () => {
    // Simple Excel export simulation
    const headers = ["Team No", "Name", "Roll No", "Phone No", "Last Visit", "Status"]
    const csvContent = [
      headers.join("\t"),
      ...teamMembers.map((member) =>
        [member.teamNo, member.name, member.rollNo, member.phoneNo, member.lastVisit, member.status].join("\t"),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "application/vnd.ms-excel" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "team_data.xlsx"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Teams List", icon: Users },
    { id: "export-data", label: "Export Data", icon: Download },
    { id: "logout", label: "Logout", icon: LogOut },
  ]

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate("login")
    } else if (onLogout) {
      onLogout()
    }
  }

  const handleSidebarClick = (itemId) => {
    if (itemId === "logout") {
      handleLogout()
    } else {
      setActiveTab(itemId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CommonHeader
        currentPage="dashboard"
        onNavigate={onNavigate}
        showSidebar={true}
        showUserMenu={true}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-md min-h-screen transition-all duration-300`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                {sidebarOpen && (
                  <div>
                    <p className="font-medium text-gray-900">{profileData.name}</p>
                    <p className="text-sm text-gray-500">College Coordinator</p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-4">
            {sidebarOpen && <h2 className="text-xl font-bold text-gray-800 mb-4">College Coordinator</h2>}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSidebarClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700"
                        : item.id === "logout"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "home" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">College Coordinator Home</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Teams</p>
                      <p className="text-3xl font-bold text-gray-900">{totalTeams}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Approved Teams</p>
                      <p className="text-3xl font-bold text-gray-900">{approvedTeams}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Teams</p>
                      <p className="text-3xl font-bold text-gray-900">{pendingTeams}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Projects</p>
                      <p className="text-3xl font-bold text-gray-900">{activeProjects}</p>
                    </div>
                    <Rocket className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Graph Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Performance Overview</h2>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-gray-600">Team Performance Chart</p>
                    <p className="text-sm text-gray-500">Visual representation of team progress and activities</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                {isEditingProfile ? (
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                        <input
                          type="text"
                          value={profileData.universityName}
                          onChange={(e) => setProfileData({ ...profileData, universityName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
                        <input
                          type="text"
                          value={profileData.collegeName}
                          onChange={(e) => setProfileData({ ...profileData, collegeName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                          type="text"
                          value={profileData.role}
                          onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Full Name:</span>
                          <p className="text-gray-900">{profileData.name}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Email Address:</span>
                          <p className="text-gray-900">{profileData.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Phone Number:</span>
                          <p className="text-gray-900">{profileData.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">University Name:</span>
                          <p className="text-gray-900">{profileData.universityName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">College Name:</span>
                          <p className="text-gray-900">{profileData.collegeName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Role:</span>
                          <p className="text-gray-900">{profileData.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Teams List</h1>
              </div>

              {/* Search */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, team number, or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Team Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team Member
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.teamNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.rollNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.phoneNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.lastVisit}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "export-data" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Team Data</h2>
                  <div className="relative inline-block">
                    <div className="flex">
                      <button
                        onClick={exportToCSV}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-l-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => {
                            const dropdown = document.getElementById("cc-export-dropdown")
                            dropdown.classList.toggle("hidden")
                          }}
                          className="px-3 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 border-l border-green-500 flex items-center"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          id="cc-export-dropdown"
                          className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => {
                                exportToCSV()
                                document.getElementById("cc-export-dropdown").classList.add("hidden")
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                            >
                              CSV
                            </button>
                            <button
                              onClick={() => {
                                exportToExcel()
                                document.getElementById("cc-export-dropdown").classList.add("hidden")
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                            >
                              Excel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Team No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Roll No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Visit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teamMembers.map((member) => (
                          <tr key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {member.teamNo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.rollNo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.phoneNo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.lastVisit}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}
                              >
                                {member.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
              <button onClick={() => setShowAddMemberModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team No</label>
                <input
                  type="text"
                  value={newMember.teamNo}
                  onChange={(e) => setNewMember({ ...newMember, teamNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                <input
                  type="text"
                  value={newMember.rollNo}
                  onChange={(e) => setNewMember({ ...newMember, rollNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone No</label>
                <input
                  type="tel"
                  value={newMember.phoneNo}
                  onChange={(e) => setNewMember({ ...newMember, phoneNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                <input
                  type="date"
                  value={newMember.lastVisit}
                  onChange={(e) => setNewMember({ ...newMember, lastVisit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approve Dialog */}
      {showApproveDialog && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Approve Member</h2>
              <button onClick={handleApproveCancel} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-gray-700">Are you sure you want to approve this member?</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <span className="font-medium">Team No:</span> {selectedMember.teamNo}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {selectedMember.name}
                </p>
                <p>
                  <span className="font-medium">Roll No:</span> {selectedMember.rollNo}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {selectedMember.phoneNo}
                </p>
                <p>
                  <span className="font-medium">Last Visit:</span> {selectedMember.lastVisit}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleApproveCancel}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveConfirm}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        sidebarItems={sidebarItems}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        isLoggedIn={true}
        currentUser={currentUser}
        dashboardType="CC"
      />
    </div>
  )
}

export default CCDashboard
