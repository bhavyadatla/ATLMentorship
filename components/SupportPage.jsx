"use client"

import { Mail } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"

const SupportPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CommonHeader currentPage="support" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Illustration */}
        <div className="mb-12">
          <img src="/images/support-illustration-new.png" alt="Support Illustration" className="max-w-xs mx-auto" />
        </div>

        {/* Contact Information */}
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700 font-medium">For Any Feedback/Queries Contact Below:</p>
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <a
              href="mailto:Contact-atl-support@gmail.com"
              className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
            >
              Contact-atl-support@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SupportPage
