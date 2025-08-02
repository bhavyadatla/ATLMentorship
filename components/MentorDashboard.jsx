"use client"

import { useState } from "react"
import { Calendar, Users, Clock, Star, MessageCircle, Video } from "lucide-react"

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const mentorStats = [
    { title: "Active Mentees", value: "12", icon: Users, color: "bg-blue-500" },
    { title: "Sessions This Month", value: "28", icon: Calendar, color: "bg-green-500" },
    { title: "Hours Mentored", value: "45", icon: Clock, color: "bg-purple-500" },
    { title: "Average Rating", value: "4.8", icon: Star, color: "bg-orange-500" },
  ]

  const mentees = [
    { id: 1, name: "Rahul Verma", project: "IoT Smart Home", progress: 75, lastSession: "2 days ago" },
    { id: 2, name: "Priya Sharma", project: "AI Chatbot", progress: 60, lastSession: "1 day ago" },
    { id: 3, name: "Karan Singh", project: "Robotics Arm", progress: 85, lastSession: "3 days ago" },
    { id: 4, name: "Anita Patel", project: "Mobile App", progress: 40, lastSession: "1 week ago" },
  ]

  const upcomingSessions = [
    { id: 1, mentee: "Rahul Verma", time: "2:00 PM", date: "Today", topic: "IoT Sensors Integration" },
    { id: 2, mentee: "Priya Sharma", time: "4:00 PM", date: "Tomorrow", topic: "Machine Learning Models" },
    { id: 3, mentee: "Karan Singh", time: "10:00 AM", date: "Dec 28", topic: "Hardware Assembly" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mentor Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mentorStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Mentees */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">My Mentees</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mentees.map((mentee) => (
                <div key={mentee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {mentee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{mentee.name}</p>
                      <p className="text-sm text-gray-500">{mentee.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${mentee.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{mentee.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Last: {mentee.lastSession}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{session.mentee}</p>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{session.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">{session.time}</span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorDashboard
