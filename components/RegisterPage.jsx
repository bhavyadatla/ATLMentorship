"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"
import Footer from "@/components/Footer"

const RegisterPage = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    universityName: "",
    collegeName: "",
    district: "",
    password: "",
    confirmPassword: "",
  })

  const roleOptions = [
    { id: "so", title: "State Officer", shortTitle: "SO" },
    { id: "uc", title: "University Coordinator", shortTitle: "UC" },
    { id: "cc", title: "College Coordinator", shortTitle: "CC" },
    { id: "dso", title: "District Science Officer", shortTitle: "DSO" },
  ]

  const apDistricts = [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri",
  ]

  const apUniversities = [
    "JNTU Hyderabad",
    "JNTU Kakinada",
    "JNTU Anantapur",
    "Andhra University",
    "Sri Venkateswara University",
    "Osmania University",
    "Kakatiya University",
    "Telangana University",
    "Acharya Nagarjuna University",
    "Rayalaseema University",
  ]

  const apColleges = [
    "Government College of Engineering",
    "Jawaharlal Nehru Technological University",
    "Chaitanya Bharathi Institute of Technology",
    "Vasavi College of Engineering",
    "VNR Vignana Jyothi Institute of Engineering",
    "Gokaraju Rangaraju Institute of Engineering",
    "Institute of Aeronautical Engineering",
    "CMR College of Engineering & Technology",
    "Andhra Loyola College",
    "PB Siddhartha College of Arts & Science",
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
      universityName: "",
      collegeName: "",
      district: "",
    }))
  }

  const getRoleDisplayName = () => {
    switch (selectedRole) {
      case "so":
        return "State Officer"
      case "uc":
        return "BCDE University Coordinator"
      case "cc":
        return "BCDE College Coordinator"
      case "dso":
        return "District Science Officer"
      default:
        return ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedRole) {
      alert("Please select a user type!")
      return
    }

    // Basic validation for common fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields!")
      return
    }

    // Role-specific validation
    if (selectedRole === "dso" && !formData.district) {
      alert("Please select your District!")
      return
    } else if (selectedRole === "uc" && !formData.universityName) {
      alert("Please select your University name!")
      return
    } else if (selectedRole === "cc" && (!formData.universityName || !formData.collegeName)) {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <CommonHeader currentPage="register" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src="/images/atl-logo.png" alt="ATL Logo" className="w-6 h-6 rounded-full" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join the ATL Mentorship Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Dropdown */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">User Type *</label>
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
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedRole === "cc" ? "Email Address *" : "Email *"}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Phone Number */}
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

                  {/* University Name - for UC and CC */}
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

                  {/* College Name - for CC only */}
                  {selectedRole === "cc" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">College Name *</label>
                      <select
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange("collegeName", e.target.value)}
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
                    </div>
                  )}

                  {/* District - for DSO only */}
                  {selectedRole === "dso" && (
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

                  {/* Role Display */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                      {getRoleDisplayName()}
                    </div>
                  </div>

                  {/* Password */}
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

                  {/* Confirm Password */}
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

                {/* Submit Button - Exact match to the image theme */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                >
                  Create Account
                </button>
              </>
            )}
          </form>

          {/* Login Link - Matching the theme from image */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate("login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} isLoggedIn={false} />
    </div>
  )
}

export default RegisterPage
