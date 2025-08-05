"use client"

import { useState } from "react"
import {
  User,
  Home,
  School,
  Award,
  BookOpen,
  Calendar,
  Edit,
  LogOut,
  FileCheck,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react"
import CommonHeader from "./CommonHeader"
import EditApprovalModal from "./EditApprovalModal" // Import the new modal component

const UCDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState("All Colleges")
  const [showEditModal, setShowEditModal] = useState(false) // State for showing edit modal
  const [editingItem, setEditingItem] = useState(null) // State for the item being edited

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
      sno: 1,
      clgId: "GCET001",
      clg: "Government College of Engineering",
      clgCode: "GCET001",
      noOfModComp: 8,
      approval: "Approved",
    },
    {
      id: 2,
      sno: 2,
      clgId: "PVIT002",
      clg: "Private Institute of Technology",
      clgCode: "PVIT002",
      noOfModComp: 6,
      approval: "Pending",
    },
    {
      id: 3,
      sno: 3,
      clgId: "GOVT003",
      clg: "Government Polytechnic College",
      clgCode: "GOVT003",
      noOfModComp: 10,
      approval: "Approved",
    },
    {
      id: 4,
      sno: 4,
      clgId: "ENGG004",
      clg: "Engineering College",
      clgCode: "ENGG004",
      noOfModComp: 4,
      approval: "Pending",
    },
    {
      id: 5,
      sno: 5,
      clgId: "TECH005",
      clg: "Technical Institute",
      clgCode: "TECH005",
      noOfModComp: 7,
      approval: "Approved",
    },
  ])

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: "New College Registration",
      applicant: "ABC Engineering College",
      date: "2024-08-01",
      priority: "High",
    },
    {
      id: 2,
      type: "Module Completion Request",
      applicant: "XYZ Technical Institute",
      date: "2024-07-30",
      priority: "Medium",
    },
    {
      id: 3,
      type: "ATL Setup Approval",
      applicant: "Government Polytechnic",
      date: "2024-07-28",
      priority: "Low",
    },
  ])

  const [approvedList, setApprovedList] = useState([
    {
      id: 101,
      type: "College Registration",
      applicant: "State Engineering College",
      date: "2024-07-25",
      approvedBy: "University Coordinator",
    },
    {
      id: 102,
      type: "Module Completion",
      applicant: "Technical Institute",
      date: "2024-07-20",
      approvedBy: "University Coordinator",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "approvals", label: "Approvals", icon: FileCheck },
    { id: "colleges", label: "Colleges list", icon: School },
    { id: "module-completion", label: "Module completion", icon: BookOpen },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const handleApprove = (item) => {
    setPendingApprovals(pendingApprovals.filter((i) => i.id !== item.id))
    setApprovedList([
      ...approvedList,
      {
        ...item,
        id: Date.now(),
        approvedBy: "University Coordinator",
        date: new Date().toISOString().slice(0, 10),
      },
    ])
  }

  const handleReject = (item) => {
    setPendingApprovals(pendingApprovals.filter((i) => i.id !== item.id))
  }

  const handleEditApproved = (item) => {
    setEditingItem(item)
    setShowEditModal(true)
  }

  const handleSaveEditedItem = (updatedItem) => {
    setApprovedList(approvedList.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setShowEditModal(false)
    setEditingItem(null)
  }

  const handleDeclineApproved = (itemToDecline) => {
    setApprovedList(approvedList.filter((item) => item.id !== itemToDecline.id))
    setPendingApprovals([
      ...pendingApprovals,
      {
        id: itemToDecline.id, // Keep original ID or generate new if preferred
        type: itemToDecline.type,
        applicant: itemToDecline.applicant,
        date: new Date().toISOString().slice(0, 10), // Set current date for re-pending
        priority: "Medium", // Assign a default priority
      },
    ])
    alert("Item declined and moved back to pending list.")
  }

  const getStatsData = () => {
    return {
      totalColleges: colleges.length,
      activeATL: colleges.filter((c) => c.approval === "Approved").length,
      totalStudents: colleges.reduce((sum, college) => sum + (college.students || 0), 0),
      pendingSetup: colleges.filter((c) => c.approval === "Pending").length,
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        const stats = getStatsData()

        const getFilteredColleges = () => {
          if (selectedCollege === "All Colleges") {
            return colleges
          }
          return colleges.filter((college) => college.clg === selectedCollege)
        }

        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">University Coordinator Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.university} - Welcome back, {editedProfile.name}
              </p>
            </div>

            {/* College Dropdown Filter */}
            <div className="mb-6">
              <div className="relative inline-block">
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All Colleges">All Colleges</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.clg}>
                      {college.clg}
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
                    <p className="text-blue-100 text-sm">Total Colleges</p>
                    <p className="text-3xl font-bold">{getFilteredColleges().length}</p>
                    <p className="text-blue-200 text-xs mt-1">Under university</p>
                  </div>
                  <School className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active ATL</p>
                    <p className="text-3xl font-bold">
                      {getFilteredColleges().filter((c) => c.approval === "Approved").length}
                    </p>
                    <p className="text-green-200 text-xs mt-1">Operational</p>
                  </div>
                  <Award className="h-8 w-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Pending Approvals</p>
                    <p className="text-3xl font-bold">{pendingApprovals.length}</p>
                    <p className="text-purple-200 text-xs mt-1">Requires attention</p>
                  </div>
                  <FileCheck className="h-8 w-8 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Pending Setup</p>
                    <p className="text-3xl font-bold">
                      {getFilteredColleges().filter((c) => c.approval === "Pending").length}
                    </p>
                    <p className="text-orange-200 text-xs mt-1">Requires attention</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-200" />
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

      case "approvals":
        return (
          <div className="p-6 space-y-8">
            <h2 className="text-2xl font-bold">Approvals</h2>

            {/* Pending List */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Pending list</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Applicant
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Priority
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApprovals.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.type}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.applicant}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.date}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : item.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(item)}
                                className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleReject(item)}
                                className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                                title="Reject"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Approved List */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Approved list</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Applicant
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Approved Date
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Approved By
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedList.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.type}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.applicant}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.date}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.approvedBy}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditApproved(item)}
                                className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeclineApproved(item)}
                                className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                                title="Decline"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {showEditModal && editingItem && (
              <EditApprovalModal
                item={editingItem}
                onSave={handleSaveEditedItem}
                onClose={() => setShowEditModal(false)}
              />
            )}
          </div>
        )

      case "colleges":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Colleges list</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">S.No</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Clg id</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Clg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((college) => (
                      <tr key={college.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.sno}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.clgId}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.clg}</td>
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
            <h2 className="text-2xl font-bold mb-6">Modules completion</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Clg Code
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Clg</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        No. of mod comp
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Approval
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((college) => (
                      <tr key={college.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.clgCode}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.clg}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{college.noOfModComp}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              college.approval === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {college.approval}
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
                <p className="font-medium text-gray-900">Name</p>
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

export default UCDashboard
