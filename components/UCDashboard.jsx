"use client"

import { useState } from "react"
import { User, Home, Users, FileText, Download, School, LogOut, Edit } from "lucide-react"
import CommonHeader from "./CommonHeader"
import Footer from "./Footer"
import EditApprovalModal from "./EditApprovalModal"

const UCDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@university.edu.in",
    role: "University Coordinator",
    university: "Andhra University",
  })

  // Sample data for colleges
  const [collegesData, setCollegesData] = useState([
    {
      id: 1,
      sno: 1,
      college: "Government Engineering College",
      district: "Visakhapatnam",
      mandal: "Visakhapatnam Urban",
      village: "Visakhapatnam",
      coordinator: "Dr. Rajesh Kumar",
      numberOfTeams: 8,
    },
    {
      id: 2,
      sno: 2,
      college: "Andhra University College of Engineering",
      district: "Visakhapatnam",
      mandal: "Visakhapatnam Urban",
      village: "Visakhapatnam",
      coordinator: "Prof. Sunita Rao",
      numberOfTeams: 12,
    },
    {
      id: 3,
      sno: 3,
      college: "GITAM University",
      district: "Visakhapatnam",
      mandal: "Bheemunipatnam",
      village: "Rushikonda",
      coordinator: "Dr. Anil Reddy",
      numberOfTeams: 15,
    },
    {
      id: 4,
      sno: 4,
      college: "Vignan's Institute of Technology",
      district: "Visakhapatnam",
      mandal: "Duvvada",
      village: "Duvvada",
      coordinator: "Dr. Kavitha Singh",
      numberOfTeams: 6,
    },
    {
      id: 5,
      sno: 5,
      college: "Centurion University",
      district: "Vizianagaram",
      mandal: "Vizianagaram",
      village: "Vizianagaram",
      coordinator: "Prof. Ramesh Babu",
      numberOfTeams: 9,
    },
  ])

  // Sample data for module completion
  const [moduleCompletionData, setModuleCompletionData] = useState([
    {
      id: 1,
      collegeName: "Government Engineering College",
      teamId: "TEAM001",
      modulesTotal: 10,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8], // 8 modules completed
      status: "pending",
    },
    {
      id: 2,
      collegeName: "Andhra University College of Engineering",
      teamId: "TEAM002",
      modulesTotal: 12,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All 12 modules completed
      status: "approved",
    },
    {
      id: 3,
      collegeName: "GITAM University",
      teamId: "TEAM003",
      modulesTotal: 8,
      completedModules: [1, 2, 3, 4, 5, 6], // 6 modules completed
      status: "pending",
    },
    {
      id: 4,
      collegeName: "Vignan's Institute of Technology",
      teamId: "TEAM004",
      modulesTotal: 10,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All 10 modules completed
      status: "approved",
    },
    {
      id: 5,
      collegeName: "Centurion University",
      teamId: "TEAM005",
      modulesTotal: 9,
      completedModules: [1, 2, 3, 4], // 4 modules completed
      status: "pending",
    },
  ])

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      sno: 1,
      fullName: "Dr. Rajesh Kumar",
      phoneNumber: "+91 98765 43210",
      role: "CC - College Coordinator",
      college: "Government Engineering College",
      email: "rajesh.kumar@gec.edu.in",
    },
    {
      id: 2,
      sno: 2,
      fullName: "Prof. Sunita Rao",
      phoneNumber: "+91 87654 32109",
      role: "CC - College Coordinator",
      college: "Andhra University College of Engineering",
      email: "sunita.rao@auce.edu.in",
    },
    {
      id: 3,
      sno: 3,
      fullName: "Dr. Anil Reddy",
      phoneNumber: "+91 76543 21098",
      role: "CC - College Coordinator",
      college: "GITAM University",
      email: "anil.reddy@gitam.edu",
    },
  ])

  const [approvedItems, setApprovedItems] = useState([
    {
      id: 4,
      sno: 4,
      fullName: "Dr. Kavitha Singh",
      phoneNumber: "+91 65432 10987",
      role: "CC - College Coordinator",
      college: "Vignan's Institute of Technology",
      email: "kavitha.singh@vignan.edu.in",
      approvedDate: "2024-01-10",
      approvedBy: "Dr. Priya Sharma",
    },
    {
      id: 5,
      sno: 5,
      fullName: "Prof. Ramesh Babu",
      phoneNumber: "+91 54321 09876",
      role: "CC - College Coordinator",
      college: "Centurion University",
      email: "ramesh.babu@centurion.edu.in",
      approvedDate: "2024-01-08",
      approvedBy: "Dr. Priya Sharma",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "colleges", label: "Colleges List", icon: School },
    { id: "module-completion", label: "Module Completion", icon: FileText },
    { id: "approvals", label: "Approvals", icon: Users },
    { id: "export-data", label: "Export Data", icon: Download },
    { id: "suggestions", label: "Suggestions", icon: FileText },
  ]

  const [suggestionsData, setSuggestionsData] = useState([
    {
      id: 1,
      suggestionId: "SUG001",
      concernType: "App Related",
      concern: "The dashboard loading time is too slow, especially when accessing college data.",
    },
    {
      id: 2,
      suggestionId: "SUG002",
      concernType: "ATL Program",
      concern: "Need more training modules for advanced robotics and AI concepts.",
    },
    {
      id: 3,
      suggestionId: "SUG003",
      concernType: "Default",
      concern: "Improve the user interface for better accessibility and mobile responsiveness.",
    },
    {
      id: 4,
      suggestionId: "SUG004",
      concernType: "App Related",
      concern: "Export functionality should include more file formats like PDF.",
    },
    {
      id: 5,
      suggestionId: "SUG005",
      concernType: "ATL Program",
      concern: "Add more collaboration tools for students to work on projects together.",
    },
  ])

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const handleNavigate = (tabId) => {
    setActiveTab(tabId)
  }

  const handleApprove = (item, type = "approval") => {
    setSelectedItem({ ...item, type })
    setShowConfirmDialog(true)
  }

  const confirmApproval = () => {
    if (selectedItem.type === "module") {
      setModuleCompletionData((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? { ...item, status: "approved" } : item)),
      )
    } else {
      setPendingApprovals((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setApprovedItems((prev) => [
        ...prev,
        {
          ...selectedItem,
          approvedDate: new Date().toISOString().split("T")[0],
          approvedBy: editedProfile.name,
        },
      ])
    }
    setShowConfirmDialog(false)
    setSelectedItem(null)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleSaveEdit = (editedItem) => {
    setApprovedItems((prev) => prev.map((item) => (item.id === editedItem.id ? editedItem : item)))
    setShowEditModal(false)
    setSelectedItem(null)
  }

  const exportToCSV = (data, filename) => {
    const csvContent = data.map((row) => Object.values(row).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

  const exportToExcel = (data, filename) => {
    // Simplified Excel export (in real implementation, use a library like xlsx)
    exportToCSV(data, filename.replace(".xlsx", ".csv"))
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">University Coordinator Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {editedProfile.name} from {editedProfile.university}.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Total Colleges</h3>
                <p className="text-4xl font-bold text-blue-600 mb-1">{collegesData.length}</p>
                <p className="text-sm text-gray-600">Under coordination</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Active Teams</h3>
                <p className="text-4xl font-bold text-green-600 mb-1">
                  {collegesData.reduce((sum, college) => sum + college.numberOfTeams, 0)}
                </p>
                <p className="text-sm text-gray-600">Across all colleges</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Pending Approvals</h3>
                <p className="text-4xl font-bold text-orange-600 mb-1">{pendingApprovals.length}</p>
                <p className="text-sm text-gray-600">Awaiting review</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2 text-gray-700">Completed Modules</h3>
                <p className="text-4xl font-bold text-purple-600 mb-1">
                  {moduleCompletionData.filter((item) => item.status === "approved").length}
                </p>
                <p className="text-sm text-gray-600">Approved completions</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">New module completion request from GITAM University</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Certificate approved for Andhra University College</span>
                </div>
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-sm">Resource request pending from Vignan's Institute</span>
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
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                  <User className="h-10 w-10 text-blue-600" />
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                      <input
                        type="text"
                        value={editedProfile.university}
                        onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
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
                      <span className="font-medium text-gray-700">University</span>
                      <span className="text-gray-900">{editedProfile.university}</span>
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
            <h2 className="text-2xl font-bold mb-6">Colleges List</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        College
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        District
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mandal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Village
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinator
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Number of Teams
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {collegesData.map((college) => (
                      <tr key={college.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{college.sno}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <School className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{college.college}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{college.district}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{college.mandal}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{college.village}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{college.coordinator}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              college.numberOfTeams >= 10
                                ? "bg-green-100 text-green-800"
                                : college.numberOfTeams >= 5
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {college.numberOfTeams}
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

      case "module-completion":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Module Completion</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        College Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. of Modules
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Modules Completed
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {moduleCompletionData.map((item) => {
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.collegeName}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.teamId}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.modulesTotal}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.completedModules.join(", ")}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                item.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status === "approved" ? "Approved" : "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {item.status === "pending" && (
                              <button
                                onClick={() => handleApprove(item, "module")}
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                              >
                                Approve
                              </button>
                            )}
                            {item.status === "approved" && <span className="text-green-600 text-xs">✓ Approved</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case "approvals":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">CC User Approvals</h2>

            {/* Pending Approvals */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Pending CC Login Approvals ({pendingApprovals.length})</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          S.No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Full Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          College
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingApprovals.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.fullName}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.phoneNumber}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.college}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleApprove(item)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 mr-2"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Approved Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Approved CC Users ({approvedItems.length})</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          S.No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Full Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          College
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Approved Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Approved By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.fullName}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.phoneNumber}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.college}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.approvedDate}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.approvedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "export-data":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Export Data</h2>

            <div className="max-w-md">
              {/* Colleges Data Export */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Colleges Data</h3>
                <p className="text-gray-600 mb-4">
                  Export college information including coordinator details, location, and number of teams data.
                </p>

                <div className="relative inline-block">
                  <div className="flex">
                    <button
                      onClick={() => {
                        const exportData = collegesData.map((college) => ({
                          "S.No": college.sno,
                          College: college.college,
                          District: college.district,
                          Mandal: college.mandal,
                          Village: college.village,
                          Coordinator: college.coordinator,
                          "Number of Teams": college.numberOfTeams,
                        }))
                        exportToCSV(exportData, "colleges_data.csv")
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-l-lg hover:bg-green-700 flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>

                    {/* Dropdown button */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          const dropdown = document.getElementById("export-dropdown")
                          dropdown.classList.toggle("hidden")
                        }}
                        className="px-3 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 border-l border-green-500 flex items-center"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown menu */}
                      <div
                        id="export-dropdown"
                        className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => {
                              const exportData = collegesData.map((college) => ({
                                "S.No": college.sno,
                                College: college.college,
                                District: college.district,
                                Mandal: college.mandal,
                                Village: college.village,
                                Coordinator: college.coordinator,
                                "Number of Teams": college.numberOfTeams,
                              }))
                              exportToCSV(exportData, "colleges_data.csv")
                              document.getElementById("export-dropdown").classList.add("hidden")
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                          >
                            CSV
                          </button>
                          <button
                            onClick={() => {
                              const exportData = collegesData.map((college) => ({
                                "S.No": college.sno,
                                College: college.college,
                                District: college.district,
                                Mandal: college.mandal,
                                Village: college.village,
                                Coordinator: college.coordinator,
                                "Number of Teams": college.numberOfTeams,
                              }))
                              exportToExcel(exportData, "colleges_data.xlsx")
                              document.getElementById("export-dropdown").classList.add("hidden")
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
              </div>
            </div>
          </div>
        )

      case "suggestions":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Suggestions</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Suggestion ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Concern Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Concern
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {suggestionsData.map((suggestion) => (
                      <tr key={suggestion.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {suggestion.suggestionId}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              suggestion.concernType === "App Related"
                                ? "bg-blue-100 text-blue-800"
                                : suggestion.concernType === "ATL Program"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {suggestion.concernType}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 max-w-md">{suggestion.concern}</td>
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              {sidebarOpen && (
                <div>
                  <p className="font-medium text-gray-900">{editedProfile.name}</p>
                  <p className="text-sm text-gray-500">Univ Coordinator</p>
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
        dashboardType="UC"
      />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm User Approval</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve this{" "}
              {selectedItem?.type === "module" ? "module completion" : "CC user for login access"}?
            </p>
            <div className="mb-4 p-3 bg-gray-50 rounded">
              {selectedItem?.type === "module" ? (
                <>
                  <p className="text-sm">
                    <strong>College: </strong>
                    {selectedItem?.collegeName}
                  </p>
                  <p className="text-sm">
                    <strong>Team ID: </strong>
                    {selectedItem?.teamId}
                  </p>
                  <p className="text-sm">
                    <strong>Completed Modules: </strong>
                    {selectedItem.completedModules?.join(", ")} ({selectedItem.completedModules?.length}/
                    {selectedItem.modulesTotal})
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm">
                    <strong>Name: </strong>
                    {selectedItem?.fullName}
                  </p>
                  <p className="text-sm">
                    <strong>Phone: </strong>
                    {selectedItem?.phoneNumber}
                  </p>
                  <p className="text-sm">
                    <strong>Role: </strong>
                    {selectedItem?.role}
                  </p>
                  <p className="text-sm">
                    <strong>College: </strong>
                    {selectedItem?.college}
                  </p>
                </>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={confirmApproval}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes, Approve
              </button>
              <button
                onClick={() => {
                  setShowConfirmDialog(false)
                  setSelectedItem(null)
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <EditApprovalModal
          item={selectedItem}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false)
            setSelectedItem(null)
          }}
        />
      )}
    </div>
  )
}

export default UCDashboard
