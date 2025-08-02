"use client"

import { useState } from "react"
import { TrendingUp, Users, Calendar, Award, Clock } from "lucide-react"

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month")

  const overviewStats = [
    { title: "Total Sessions", value: "1,234", change: "+12%", icon: Calendar, color: "bg-blue-500" },
    { title: "Active Users", value: "456", change: "+8%", icon: Users, color: "bg-green-500" },
    { title: "Projects Completed", value: "89", change: "+15%", icon: Award, color: "bg-purple-500" },
    { title: "Avg Session Duration", value: "45 min", change: "+5%", icon: Clock, color: "bg-orange-500" },
  ]

  const mentorshipData = [
    { month: "Jan", sessions: 45, mentors: 12, mentees: 28 },
    { month: "Feb", sessions: 52, mentors: 15, mentees: 32 },
    { month: "Mar", sessions: 48, mentors: 14, mentees: 30 },
    { month: "Apr", sessions: 61, mentors: 18, mentees: 38 },
    { month: "May", sessions: 55, mentors: 16, mentees: 35 },
    { month: "Jun", sessions: 67, mentors: 20, mentees: 42 },
  ]

  const topMentors = [
    { name: "Dr. Sarah Johnson", sessions: 45, rating: 4.9, specialization: "IoT" },
    { name: "Prof. Michael Chen", sessions: 38, rating: 4.8, specialization: "AI/ML" },
    { name: "Dr. Lisa Wang", sessions: 32, rating: 4.7, specialization: "Robotics" },
    { name: "Dr. James Wilson", sessions: 28, rating: 4.6, specialization: "Mobile Dev" },
  ]

  const projectCategories = [
    { category: "IoT", count: 25, percentage: 35 },
    { category: "AI/ML", count: 18, percentage: 25 },
    { category: "Robotics", count: 15, percentage: 21 },
    { category: "Mobile Dev", count: 10, percentage: 14 },
    { category: "Others", count: 4, percentage: 5 },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {["week", "month", "quarter", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sessions Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Trends</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mentorshipData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t relative" style={{ height: "200px" }}>
                  <div
                    className="bg-blue-500 rounded-t absolute bottom-0 w-full"
                    style={{ height: `${(data.sessions / 70) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-medium text-gray-900">{data.sessions}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Categories</h3>
          <div className="space-y-4">
            {projectCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 bg-blue-500 rounded-full"
                    style={{
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                    }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({category.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Mentors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Mentors</h3>
          <div className="space-y-4">
            {topMentors.map((mentor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{mentor.name}</p>
                    <p className="text-sm text-gray-500">{mentor.specialization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{mentor.sessions} sessions</p>
                  <div className="flex items-center">
                    <span className="text-sm text-yellow-600">★ {mentor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900">New project submitted by Team Innovation</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900">Session completed: IoT Workshop</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900">New mentor registration approved</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900">Resource uploaded: AI/ML Guide</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
