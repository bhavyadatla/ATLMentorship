"use client"

import { useState } from "react"
import {
  User,
  Home,
  Users,
  Award,
  Download,
  FileText,
  TrendingUp,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import CommonHeader from "./CommonHeader"

const CCDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [editedProfile, setEditedProfile] = useState({
    name: "Dr. Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@college.edu.in",
    role: "College Coordinator",
    college: "Government Engineering College",
    department: "Computer Science",
    experience: "8 years",
  })

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      role: "Student Coordinator",
      email: "rahul.kumar@student.edu.in",
      phone: "+91 98765 43211",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Anita Patel",
      role: "Technical Lead",
      email: "anita.patel@student.edu.in",
      phone: "+91 98765 43212",
      status: "Active",
      joinDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Karan Singh",
      role: "Project Manager",
      email: "karan.singh@student.edu.in",
      phone: "+91 98765 43213",
      status: "Inactive",
      joinDate: "2024-01-20",
    },
  ])

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "ATL Setup Completion Certificate",
      type: "Setup",
      issueDate: "2024-01-15",
      status: "Issued",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Innovation Project Certificate",
      type: "Project",
      issueDate: "2024-02-20",
      status: "Pending",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Mentorship Excellence Award",
      type: "Achievement",
      issueDate: "2024-03-10",
      status: "Issued",
      downloadUrl: "#",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Team Management", icon: Users },
    { id: "certificates", label: "Certificates", icon: Award },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const handleDownloadCertificate = (certificateId) => {
    // Simulate certificate download
    const certificate = certificates.find((cert) => cert.id === certificateId)
    if (certificate) {
      // Create a simple CSV content for demo
      const csvContent = `Certificate Details
Title: ${certificate.title}
Type: ${certificate.type}
Issue Date: ${certificate.issueDate}
Status: ${certificate.status}
Issued to: ${editedProfile.name}
College: ${editedProfile.college}
Department: ${editedProfile.department}`

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${certificate.title.replace(/\s+/g, "_")}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  }

  const handleExportData = () => {
    const data = {
      profile: editedProfile,
      teamMembers: teamMembers,
      certificates: certificates,
      exportDate: new Date().toISOString(),
    }

    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cc_dashboard_data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getFilteredTeamMembers = () => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || member.status.toLowerCase() === filterStatus.toLowerCase()
      return matchesSearch && matchesFilter
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">College Coordinator Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.college} - Welcome back, {editedProfile.name}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Team Members</p>
                    <p className="text-3xl font-bold">{teamMembers.length}</p>
                    <p className="text-blue-200 text-xs mt-1">Active coordinators</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active Projects</p>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-green-200 text-xs mt-1">In progress</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Certificates</p>
                    <p className="text-3xl font-bold">{certificates.length}</p>
                    <p className="text-purple-200 text-xs mt-1">Issued & pending</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Success Rate</p>
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-orange-200 text-xs mt-1">Project completion</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <Download className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium text-blue-900">Export Dashboard Data</span>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <Plus className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-medium text-green-900">Add New Team Member</span>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-purple-600 mr-3" />
                      <span className="font-medium text-purple-900">Generate Report</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New certificate issued</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Team member added</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Project milestone completed</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                      <input
                        type="text"
                        value={editedProfile.college}
                        onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
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
                      <span className="font-medium text-gray-700">Phone</span>
                      <span className="text-gray-900">{editedProfile.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Email</span>
                      <span className="text-gray-900">{editedProfile.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">College</span>
                      <span className="text-gray-900">{editedProfile.college}</span>
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

      case "team":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Team Management</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Team Members Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredTeamMembers().map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
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
        )

      case "certificates":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Certificates</h2>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </button>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        certificate.status === "Issued"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {certificate.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{certificate.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Type: {certificate.type}</p>
                  <p className="text-sm text-gray-600 mb-4">Issued: {certificate.issueDate}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownloadCertificate(certificate.id)}
                      disabled={certificate.status !== "Issued"}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
                        certificate.status === "Issued"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate Progress */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Certificate Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Setup Certificates</span>
                  <span className="text-sm text-gray-500">2/3 Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "66%" }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Project Certificates</span>
                  <span className="text-sm text-gray-500">1/2 Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Achievement Certificates</span>
                  <span className="text-sm text-gray-500">1/1 Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "100%" }}></div>
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
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-gray-900">{editedProfile.name}</p>
                <p className="text-sm text-gray-500">College Coordinator</p>
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
                      ? "bg-blue-50 text-blue-700 font-medium"
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

export default CCDashboard
