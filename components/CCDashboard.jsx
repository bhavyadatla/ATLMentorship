"use client"

import { useState } from "react"
import {
  Search,
  Download,
  X,
  Edit,
  Users,
  CheckCircle,
  Clock,
  Rocket,
  User,
  Home,
  LogOut,
  FileText,
  Award,
  Trash2,
  ChevronDown,
} from "lucide-react"
import CommonHeader from "@/components/CommonHeader"
import Footer from "@/components/Footer"

const CCDashboard = ({ onNavigate, currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState(null)
  const [showExportDropdown, setShowExportDropdown] = useState(false)

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

  const [suggestionsData, setSuggestionsData] = useState([
    {
      id: 1,
      suggestionId: "SUG-CC-001",
      concernType: "ATL Program",
      concern: "Need more hands-on training materials for students working on innovation projects.",
    },
    {
      id: 2,
      suggestionId: "SUG-CC-002",
      concernType: "App Related",
      concern: "Team management interface could be more intuitive with better filtering options.",
    },
    {
      id: 3,
      suggestionId: "SUG-CC-003",
      concernType: "Default",
      concern: "Improve communication channels between college coordinators and university coordinators.",
    },
    {
      id: 4,
      suggestionId: "SUG-CC-004",
      concernType: "ATL Program",
      concern: "Add project milestone tracking features for better student progress monitoring.",
    },
    {
      id: 5,
      suggestionId: "SUG-CC-005",
      concernType: "App Related",
      concern: "Export functionality should include team performance analytics and reports.",
    },
  ])

  // Achievements data for CC dashboard
  const [achievementsData, setAchievementsData] = useState([
    {
      id: 1,
      title: "Clg appreciation cert",
      description: "College Appreciation Certificate for outstanding contribution to ATL program",
      fileName: "college_appreciation_certificate.pdf",
      dateIssued: "2024-01-15",
      type: "Certificate",
    },
    {
      id: 2,
      title: "Clg Coordination appreciation cert",
      description: "College Coordination Appreciation Certificate for excellent mentorship coordination",
      fileName: "college_coordination_certificate.pdf",
      dateIssued: "2024-01-10",
      type: "Certificate",
    },
  ])

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

  const handleRemoveClick = (member) => {
    setMemberToRemove(member)
    setShowRemoveDialog(true)
  }

  const handleRemoveConfirm = () => {
    if (memberToRemove) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== memberToRemove.id))
    }
    setShowRemoveDialog(false)
    setMemberToRemove(null)
  }

  const handleRemoveCancel = () => {
    setShowRemoveDialog(false)
    setMemberToRemove(null)
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
    setShowExportDropdown(false)
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
    setShowExportDropdown(false)
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

  const getConcernTypeColor = (concernType) => {
    switch (concernType) {
      case "App Related":
        return "bg-blue-100 text-blue-800"
      case "ATL Program":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Teams List", icon: Users },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "suggestions", label: "Suggestions", icon: FileText },
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

  const downloadCertificate = (achievement) => {
    // Simulate certificate download
    const link = document.createElement("a")
    link.href = `/certificates/${achievement.fileName}`
    link.download = achievement.fileName
    link.click()
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
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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
                <div className="relative">
                  <div className="flex">
                    <button
                      onClick={exportToCSV}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button
                      onClick={() => setShowExportDropdown(!showExportDropdown)}
                      className="px-2 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors border-l border-blue-500"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {showExportDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={exportToCSV}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export CSV</span>
                        </button>
                        <button
                          onClick={exportToExcel}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Excel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleRemoveClick(member)}
                              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Remove Team Member"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Certificates & Awards</h2>
                  <div className="space-y-4">
                    {achievementsData.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <Award className="w-6 h-6 text-yellow-500" />
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{achievement.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs text-gray-500">
                                    Issued: {new Date(achievement.dateIssued).toLocaleDateString()}
                                  </span>
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {achievement.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadCertificate(achievement)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {achievementsData.length === 0 && (
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Achievements Yet</h3>
                      <p className="text-gray-600">Your certificates and awards will appear here once earned.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Suggestions</h1>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Suggestion ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Concern Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Concern
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {suggestionsData.map((suggestion) => (
                        <tr key={suggestion.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {suggestion.suggestionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConcernTypeColor(suggestion.concernType)}`}
                            >
                              {suggestion.concernType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-md">{suggestion.concern}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer dashboardType="cc" onNavigate={(tabId) => setActiveTab(tabId)} isLoggedIn={true} />

      {showExportDropdown && <div className="fixed inset-0 z-0" onClick={() => setShowExportDropdown(false)} />}
    </div>
  )
}

export default CCDashboard
