"use client"

import { useState } from "react"
import { User, Megaphone, FileCheck, Download, BookOpen, LogOut, Edit, FileText } from "lucide-react"
import CommonHeader from "./CommonHeader"
import SOAnnouncements from "./SOAnnouncements"
import SOApprovals from "./SOApprovals"
import SOExportData from "./SOExportData"
import SOModuleCompletion from "./SOModuleCompletion"
import Footer from "./Footer"

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
    experience: "18 years",
  })

  const [suggestionsData, setSuggestionsData] = useState([
    {
      id: 1,
      suggestionId: "SUG-SO-001",
      concernType: "ATL Program",
      concern: "Need better coordination between universities and colleges for ATL program implementation.",
    },
    {
      id: 2,
      suggestionId: "SUG-SO-002",
      concernType: "App Related",
      concern: "State-level dashboard needs more detailed analytics and reporting features.",
    },
    {
      id: 3,
      suggestionId: "SUG-SO-003",
      concernType: "Default",
      concern: "Improve communication channels between state officers and district coordinators.",
    },
    {
      id: 4,
      suggestionId: "SUG-SO-004",
      concernType: "ATL Program",
      concern: "More training programs needed for college coordinators on innovation methodologies.",
    },
    {
      id: 5,
      suggestionId: "SUG-SO-005",
      concernType: "App Related",
      concern: "Add bulk approval functionality for faster processing of multiple requests.",
    },
  ])

  const sidebarItems = [
    { id: "home", label: "Home", icon: User },
    { id: "profile", label: "Profile", icon: User },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "approvals", label: "Approvals", icon: FileCheck },
    { id: "export-data", label: "Export Data", icon: Download },
    { id: "module-completion", label: "Module Completion", icon: BookOpen },
    { id: "suggestions", label: "Suggestions", icon: FileText },
  ]

  const handleProfileSave = () => {
    setIsEditing(false)
  }

  const handleNavigate = (tabId) => {
    setActiveTab(tabId)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">State Officer Dashboard</h1>
              <p className="text-gray-600">
                {editedProfile.state} - Welcome back, {editedProfile.name}
              </p>
            </div>

            {/* Simple welcome message only */}
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to your State Officer Dashboard!</h3>
              <p className="text-gray-600 text-lg">
                Use the sidebar navigation to manage announcements, approvals, data exports, and module completion.
              </p>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ph.no</label>
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
                      <span className="font-medium text-gray-700">State</span>
                      <span className="text-gray-900">{editedProfile.state}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "announcements":
        return <SOAnnouncements />

      case "approvals":
        return <SOApprovals />

      case "export-data":
        return <SOExportData />

      case "module-completion":
        return <SOModuleCompletion />

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
        return <div className="p-6">Select a tab to view content.</div>
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
        dashboardType="SO"
      />
    </div>
  )
}

export default SODashboard
