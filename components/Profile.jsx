"use client"

import { useState } from "react"
import { User, Edit2 } from "lucide-react"

const Profile = () => {
  // Static profile data
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    phone: "+91 98765 43210",
    email: "john.doe@university.edu",
    role: "University Coordinator",
  })

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState({ ...profileData })

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle save
  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditMode(false)
  }

  // Handle cancel
  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditMode(false)
  }

  // Handle edit mode toggle
  const handleEditToggle = () => {
    setIsEditMode(true)
    setEditData({ ...profileData })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
        {/* Edit/Save/Cancel buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {!isEditMode ? (
            <button
              onClick={handleEditToggle}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Profile"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          ) : null}
        </div>

        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mr-6">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {isEditMode ? "Edit Profile" : "Profile Information"}
              </h3>
              <p className="text-gray-600">
                {isEditMode ? "Make changes to your profile information" : "View your profile details"}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {!isEditMode ? (
            // Display Mode - Key-Value Format
            <div className="space-y-4">
              <div className="flex">
                <span className="text-gray-700 font-medium w-20">Name</span>
                <span className="text-gray-700 mx-4">:</span>
                <span className="text-gray-900">{profileData.name}</span>
              </div>
              <div className="flex">
                <span className="text-gray-700 font-medium w-20">Phone</span>
                <span className="text-gray-700 mx-4">:</span>
                <span className="text-gray-900">{profileData.phone}</span>
              </div>
              <div className="flex">
                <span className="text-gray-700 font-medium w-20">Email</span>
                <span className="text-gray-700 mx-4">:</span>
                <span className="text-gray-900">{profileData.email}</span>
              </div>
              <div className="flex">
                <span className="text-gray-700 font-medium w-20">Role</span>
                <span className="text-gray-700 mx-4">:</span>
                <span className="text-gray-900">{profileData.role}</span>
              </div>
            </div>
          ) : (
            // Edit Mode - Form Layout
            <div className="space-y-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Role (Read-only) */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                  <span className="text-gray-700">{profileData.role}</span>
                  <span className="text-xs text-gray-500 ml-2">(Read-only)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
