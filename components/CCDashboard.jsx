"use client"

import { useState } from "react"
import { User, Home, Users, Award, Download, FileText, Edit, Trash2, Plus, Search, Filter, LogOut } from "lucide-react"
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
      title: "Clg appreciation cert",
      type: "Appreciation",
      issueDate: "2024-01-15",
      status: "Issued",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Clg Coordination appreciation cert",
      type: "Coordination",
      issueDate: "2024-02-20",
      status: "Issued",
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

  const [moduleData, setModuleData] = useState([
    {
      id: 1,
      clgCode: "GCET001",
      clg: "Government College of Engineering",
      noOfModComp: 8,
      approval: "Approved",
    },
    {
      id: 2,
      clgCode: "PVIT002",
      clg: "Private Institute of Technology",
      noOfModComp: 6,
      approval: "Pending",
    },
    {
      id: 3,
      clgCode: "GOVT003",
      clg: "Government Polytechnic College",
      noOfModComp: 10,
      approval: "Approved",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Team", icon: Users },
    { id: "export-data", label: "Export Data", icon: Download },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "request-certificate", label: "Request Certificate", icon: FileText },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
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

  const handleDownloadCertificate = (certificateId) => {
    const certificate = certificates.find((cert) => cert.id === certificateId)
    if (certificate) {
      const csvContent = `Certificate Details\nTitle: ${certificate.title}\nType: ${certificate.type}\nIssue Date: ${certificate.issueDate}\nStatus: ${certificate.status}`
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

  const handleRequestCertificate = () => {
    alert("Certificate request submitted!")
    // Add logic to send request to backend
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

            {/* College Name and Stats Cards */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Clg Name</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 1</div>
                <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 2</div>
                <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 3</div>
                <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center text-gray-500">Stat 4</div>
              </div>
            </div>

            {/* Graph Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Graph</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Graph Placeholder
              </div>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative p-6">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsEditing(!isEditing)} className="p-2 text-gray-600 hover:text-blue-600">
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                  <User className="w-10 h-10 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{editedProfile.name}</h3>
                  <p className="text-gray-600">{editedProfile.role}</p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={editedProfile.role}
                      onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleProfileSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Name</span>
                    <span className="text-gray-900">{editedProfile.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <span className="text-gray-900">{editedProfile.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Role</span>
                    <span className="text-gray-900">{editedProfile.role}</span>
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

      case "export-data":
        return (
          <div className="p-6 space-y-8">
            <h2 className="text-2xl font-bold mb-6">Export Data</h2>

            {/* Team Data Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Team Data</h3>
                <button
                  onClick={() => alert("Exporting Team Data...")}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </button>
              </div>
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
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
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

            {/* Module Completion Data Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Module Completion Data</h3>
                <button
                  onClick={() => alert("Exporting Module Completion Data...")}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
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
                    {moduleData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.clgCode}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.clg}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.noOfModComp}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.approval === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.approval}
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

      case "achievements":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Achievements</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              {certificates
                .filter((cert) => cert.status === "Issued")
                .map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">{cert.title}</span>
                    <button
                      onClick={() => handleDownloadCertificate(cert.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Download Certificate"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              {certificates.filter((cert) => cert.status === "Issued").length === 0 && (
                <div className="text-center text-gray-500 py-4">No issued certificates found.</div>
              )}
            </div>
          </div>
        )

      case "request-certificate":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Request Certificate</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <label htmlFor="req-clg-appreciation-cert" className="block text-sm font-medium text-gray-700 mb-2">
                  Clg appreciation cert
                </label>
                <input
                  type="text"
                  id="req-clg-appreciation-cert"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter details for appreciation certificate"
                />
              </div>
              <div>
                <label
                  htmlFor="req-clg-coordination-appreciation-cert"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Clg Coordination appreciation cert
                </label>
                <input
                  type="text"
                  id="req-clg-coordination-appreciation-cert"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter details for coordination certificate"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleRequestCertificate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Request
                </button>
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

export default CCDashboard
