"use client"

import { Users, Target, BookOpen } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"
import Footer from "@/components/Footer"

const LandingPage = ({ onLogin, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <CommonHeader currentPage="home" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">What is ATL Mentorship?</h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Atal Innovation Mission (AIM) is Government of India's flagship initiative to create and promote a culture
            of innovation and entrepreneurship across the length and breadth of our country. AIM's objective is to
            develop new programmes and policies for fostering innovation in different sectors of the economy, provide
            platforms and collaboration opportunities for different stakeholders, and create an umbrella structure to
            oversee the innovation & entrepreneurship ecosystem of the country.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Mentors</h3>
            <p className="text-gray-600">
              Connect with experienced mentors from top engineering colleges and universities to guide your innovation
              journey.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning progress, set goals, and track achievements in your innovation and entrepreneurship
              journey.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Access Resources</h3>
            <p className="text-gray-600">
              Explore comprehensive learning materials, project guides, and innovation resources curated by experts.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} isLoggedIn={false} />
    </div>
  )
}

export default LandingPage
