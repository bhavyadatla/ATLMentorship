"use client"

import { useState } from "react"
import LandingPage from "../components/LandingPage"
import LoginPage from "../components/LoginPage"
import RegisterPage from "../components/RegisterPage"
import AboutPage from "../components/AboutPage"
import SupportPage from "../components/SupportPage"
import PublicDashboard from "../components/PublicDashboard"
import Dashboard from "../components/Dashboard"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData))
    setIsLoggedIn(true)
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setIsLoggedIn(false)
    setCurrentPage("landing")
  }

  const renderPage = () => {
    if (isLoggedIn && currentPage === "dashboard") {
      return <Dashboard onLogout={handleLogout} />
    }

    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} />
      case "login":
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />
      case "about":
        return <AboutPage onNavigate={setCurrentPage} />
      case "support":
        return <SupportPage onNavigate={setCurrentPage} />
      case "public-dashboard":
        return <PublicDashboard onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} />
    }
  }

  return <div className="min-h-screen">{renderPage()}</div>
}
