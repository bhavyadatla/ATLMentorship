"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"

const RegisterPage = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organizationName: "", // Renamed from 'organization'
    district: "",
    universityName: "", // New field for UC/CC
    password: "",
    confirmPassword: "",
  })

  const roleOptions = [
    { id: "dso", title: "District Science Officer", shortTitle: "DSO" },
    { id: "uc", title: "University Coordinator", shortTitle: "UC" },
    { id: "cc", title: "College Coordinator", shortTitle: "CC" },
    { id: "so", title: "State Officer", shortTitle: "SO" },
  ]

  const apDistricts = [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "Kadapa",
    "Tirupati",
  ]

  const apUniversities = [
    "Andhra University",
    "Sri Venkateswara University",
    "Acharya Nagarjuna University",
    "Jawaharlal Nehru Technological University, Kakinada",
    "Jawaharlal Nehru Technological University, Anantapur",
    "Rayalaseema University",
    "Krishna University",
    "Vikrama Simhapuri University",
    "Dr. B.R. Ambedkar University, Srikakulam",
    "Adikavi Nannaya University",
  ]

  const apColleges = [
    "Andhra Loyola College",
    "PB Siddhartha College of Arts & Science",
    "VR Siddhartha Engineering College",
    "KL University",
    "Velagapudi Ramakrishna Siddhartha Engineering College",
    "Gayatri Vidya Parishad College of Engineering",
    "GITAM University",
    "SRM University, AP",
    "Vignan's Foundation for Science, Technology & Research",
    "Anil Neerukonda Institute of Technology & Sciences",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id)
    setIsDropdownOpen(false)
    // Reset relevant fields when role changes
    setFormData((prev) => ({
      ...prev,
      organizationName: "",
      district: "",
      universityName: "",
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedRole) {
      alert("Please select a user type!")
      return
    }

    // Basic validation for common fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields!")
      return
    }

    // Role-specific validation
    // Removed organizationName validation for SO
    if (selectedRole === "dso" && (!formData.district || !formData.organizationName)) {
      alert("Please select your District and enter your District Office name!")
      return
    } else if (selectedRole === "uc" && (!formData.district || !formData.universityName)) {
      alert("Please select your District and University name!")
      return
    } else if (selectedRole === "cc" && (!formData.universityName || !formData.organizationName)) {
      alert("Please select your University name and College name!")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    console.log("Registration data:", { ...formData, role: selectedRole })
    alert(`Registration submitted successfully for ${roleOptions.find((r) => r.id === selectedRole)?.title} role!`)
    onNavigate("login")
  }

  const selectedRoleData = roleOptions.find((r) => r.id === selectedRole)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CommonHeader currentPage="register" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Dropdown */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">User Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-4 text-left border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                >
                  <span className={selectedRole ? "text-gray-900" : "text-gray-500"}>
                    {selectedRole ? selectedRoleData?.title : "Select User Type"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      {roleOptions.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          {role.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields - Only show if role is selected */}
            {selectedRole && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* District Dropdown for DSO, UC (removed for CC) */}
                  {(selectedRole === "dso" || selectedRole === "uc") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                      <select
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select District</option>
                        {apDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* University Dropdown for UC, CC */}
                  {(selectedRole === "uc" || selectedRole === "cc") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
                      <select
                        value={formData.universityName}
                        onChange={(e) => handleInputChange("universityName", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select University</option>
                        {apUniversities.map((university) => (
                          <option key={university} value={university}>
                            {university}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Organization Name Input/Dropdown for DSO, CC (removed for SO) */}
                  {(selectedRole === "dso" || selectedRole === "cc") && (
                    <div className={selectedRole === "so" ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {selectedRole === "dso" ? "District Office Name" : "College Name"} *
                      </label>
                      {selectedRole === "cc" ? (
                        <select
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange("organizationName", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select College</option>
                          {apColleges.map((college) => (
                            <option key={college} value={college}>
                              {college}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange("organizationName", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Enter your district office name`}
                          required
                        />
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </button>
              </>
            )}
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <button onClick={() => onNavigate("login")} className="text-blue-600 hover:underline font-medium">
              Sign in
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
