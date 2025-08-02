"use client"

import { Mail, User, MessageCircle } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"

const SupportPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CommonHeader currentPage="support" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Public Support</h1>

          {/* Support Icons */}
          <div className="flex justify-center items-center space-x-12 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <span className="text-gray-600">User Support</span>
            </div>

            <div className="text-gray-400 text-2xl">•••</div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <span className="text-gray-600">Live Chat</span>
            </div>

            <div className="text-gray-400 text-2xl">•••</div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-600 text-sm">Help</span>
              </div>
              <span className="text-gray-600">Documentation</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
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

          {/* Additional Support Options */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600 text-sm">Get help with platform issues and technical problems</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Mentorship Guidance</h3>
              <p className="text-gray-600 text-sm">Support for mentors and mentees in the program</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600 text-sm">Questions about ATL programs and initiatives</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SupportPage
