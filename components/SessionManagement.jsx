"use client"

import { useState } from "react"
import { Calendar, Clock, Video, MessageCircle, Plus, Filter } from "lucide-react"

const SessionManagement = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      mentee: "Rahul Verma",
      date: "2023-12-27",
      time: "2:00 PM",
      duration: "60 min",
      topic: "IoT Sensors Integration",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      mentor: "Prof. Michael Chen",
      mentee: "Priya Sharma",
      date: "2023-12-28",
      time: "4:00 PM",
      duration: "45 min",
      topic: "Machine Learning Models",
      type: "In-Person",
      status: "Pending",
    },
  ]

  const pastSessions = [
    {
      id: 3,
      mentor: "Dr. Lisa Wang",
      mentee: "Karan Singh",
      date: "2023-12-25",
      time: "10:00 AM",
      duration: "60 min",
      topic: "Robotics Hardware Assembly",
      type: "Video Call",
      status: "Completed",
      rating: 5,
    },
    {
      id: 4,
      mentor: "Dr. Sarah Johnson",
      mentee: "Anita Patel",
      date: "2023-12-24",
      time: "3:00 PM",
      duration: "45 min",
      topic: "Mobile App Development",
      type: "In-Person",
      status: "Completed",
      rating: 4,
    },
  ]

  const SessionCard = ({ session, isPast = false }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {session.mentor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{session.mentor}</p>
            <p className="text-sm text-gray-500">with {session.mentee}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            session.status === "Confirmed"
              ? "bg-green-100 text-green-600"
              : session.status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {session.status}
        </span>
      </div>

      <h3 className="font-medium text-gray-900 mb-3">{session.topic}</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{session.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {session.time} ({session.duration})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {session.type === "Video Call" ? (
            <Video className="w-4 h-4 text-blue-500" />
          ) : (
            <MessageCircle className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm text-gray-600">{session.type}</span>
        </div>

        {isPast && session.rating && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < session.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {!isPast && (
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
              Edit
            </button>
            <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Join</button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Session Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Session</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "upcoming" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Upcoming Sessions
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "past" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Past Sessions
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter</span>
        </button>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Types</option>
          <option>Video Call</option>
          <option>In-Person</option>
        </select>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === "upcoming"
          ? upcomingSessions.map((session) => <SessionCard key={session.id} session={session} />)
          : pastSessions.map((session) => <SessionCard key={session.id} session={session} isPast={true} />)}
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mentee</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Select Mentee</option>
                  <option>Rahul Verma</option>
                  <option>Priya Sharma</option>
                  <option>Karan Singh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Session topic"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Video Call</option>
                  <option>In-Person</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionManagement
