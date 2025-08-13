"use client"

import { useState } from "react"
import CommonHeader from "@/components/CommonHeader"
import Footer from "@/components/Footer"

const LoginPage = ({ onLogin, onNavigate }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Demo credentials for different roles
  const demoCredentials = [
    { username: "uc_demo", password: "uc123", role: "uc", name: "Dr. Rajesh Kumar", title: "University Coordinator" },
    {
      username: "dso_demo",
      password: "dso123",
      role: "dso",
      name: "Ms. Priya Sharma",
      title: "District Science Officer",
    },
    { username: "cc_demo", password: "cc123", role: "cc", name: "Prof. Amit Patel", title: "College Coordinator" },
    { username: "so_demo", password: "so123", role: "so", name: "Mr. Suresh Reddy", title: "State Officer" },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    // Check demo credentials
    const user = demoCredentials.find((cred) => cred.username === username && cred.password === password)

    if (user) {
      // Pass user data to parent component
      onLogin(user)
    } else {
      setError("Invalid username or password. Please use demo credentials.")
    }
  }

  const handleDemoLogin = (credentials) => {
    setUsername(credentials.username)
    setPassword(credentials.password)
    onLogin(credentials)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <CommonHeader currentPage="login" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Login Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back,</h2>
            <p className="text-gray-600 mb-6">Please login back into your account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">{error}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <button onClick={() => onNavigate("register")} className="text-blue-600 hover:underline font-medium">
                Create one
              </button>
            </p>
          </div>

          {/* Demo Credentials Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Demo Credentials</h3>
              <p className="text-sm text-blue-700 mb-4">Use these demo accounts to explore different user roles:</p>

              <div className="space-y-3">
                {demoCredentials.map((cred, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{cred.title}</p>
                        <p className="text-sm text-gray-600">{cred.name}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2">{cred.username}</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{cred.password}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDemoLogin(cred)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Role Descriptions:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <strong>UC (University Coordinator):</strong> Manages colleges, approvals, and module completion
                </li>
                <li>
                  <strong>DSO (District Science Officer):</strong> Oversees district-level activities and schools
                </li>
                <li>
                  <strong>CC (College Coordinator):</strong> Manages college-specific mentorship programs
                </li>
                <li>
                  <strong>SO (State Officer):</strong> Handles state-level ATL activities and school oversight
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} isLoggedIn={false} />
    </div>
  )
}

export default LoginPage
