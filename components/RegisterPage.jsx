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
    organization: "",
    district: "",
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id)
    setIsDropdownOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedRole) {
      alert("Please select a user type!")
      return
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.district || !formData.organization) {
      alert("Please fill in all required fields!")
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedRole === "dso"
                        ? "District Office"
                        : selectedRole === "uc"
                          ? "University Name"
                          : selectedRole === "cc"
                            ? "College Name"
                            : "State Office"}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter your ${
                        selectedRole === "dso"
                          ? "district office"
                          : selectedRole === "uc"
                            ? "university"
                            : selectedRole === "cc"
                              ? "college"
                              : "state office"
                      } name`}
                      required
                    />
                  </div>

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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <button type="button" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </button>
                  </label>
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
