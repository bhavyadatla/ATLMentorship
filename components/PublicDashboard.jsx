"use client"

import { useState } from "react"
import { School, GraduationCap, Users, UserCheck, TrendingUp, MapPin } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"

const PublicDashboard = ({ onNavigate }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  // Example data - can be replaced with real API data later
  const stateStats = [
    { title: "Universities", value: "19", icon: GraduationCap, color: "bg-blue-500", bgColor: "bg-blue-100" },
    { title: "Colleges", value: "1,779", icon: School, color: "bg-green-500", bgColor: "bg-green-100" },
    {
      title: "Registered Preranamitras",
      value: "958",
      icon: UserCheck,
      color: "bg-purple-500",
      bgColor: "bg-purple-100",
    },
    { title: "Schools Selected", value: "159", icon: School, color: "bg-gray-700", bgColor: "bg-gray-100" },
    { title: "Children Benefited", value: "45,678", icon: Users, color: "bg-orange-500", bgColor: "bg-orange-100" },
  ]

  // Andhra Pradesh districts data with example statistics
  const districtsData = [
    { name: "Visakhapatnam", mentors: 45, schools: 12, color: "#3B82F6" },
    { name: "Vijayawada", mentors: 38, schools: 10, color: "#10B981" },
    { name: "Guntur", mentors: 32, schools: 8, color: "#F59E0B" },
    { name: "Tirupati", mentors: 28, schools: 7, color: "#EF4444" },
    { name: "Kakinada", mentors: 25, schools: 6, color: "#8B5CF6" },
    { name: "Rajahmundry", mentors: 22, schools: 5, color: "#06B6D4" },
    { name: "Nellore", mentors: 20, schools: 5, color: "#84CC16" },
    { name: "Kurnool", mentors: 18, schools: 4, color: "#F97316" },
    { name: "Anantapur", mentors: 15, schools: 4, color: "#EC4899" },
    { name: "Chittoor", mentors: 12, schools: 3, color: "#6366F1" },
  ]

  // Monthly progress data for charts
  const monthlyData = [
    { month: "Jan", mentors: 120, sessions: 450, projects: 25 },
    { month: "Feb", mentors: 145, sessions: 520, projects: 32 },
    { month: "Mar", mentors: 168, sessions: 580, projects: 38 },
    { month: "Apr", mentors: 192, sessions: 640, projects: 45 },
    { month: "May", mentors: 215, sessions: 720, projects: 52 },
    { month: "Jun", mentors: 238, sessions: 800, projects: 58 },
  ]

  // Project categories data
  const projectCategories = [
    { category: "IoT & Electronics", count: 145, percentage: 35, color: "#3B82F6" },
    { category: "AI & Machine Learning", count: 104, percentage: 25, color: "#10B981" },
    { category: "Robotics", count: 87, percentage: 21, color: "#F59E0B" },
    { category: "Mobile Apps", count: 58, percentage: 14, color: "#EF4444" },
    { category: "Others", count: 21, percentage: 5, color: "#8B5CF6" },
  ]

  const apDistrictsDetailed = [
    {
      name: "Srikakulam",
      path: "M100,50 L180,45 L185,80 L120,85 Z",
      color: "#3B82F6",
      labelX: 140,
      labelY: 65,
      mentors: 25,
      schools: 8,
    },
    {
      name: "Vizianagaram",
      path: "M180,45 L250,50 L245,85 L185,80 Z",
      color: "#10B981",
      labelX: 215,
      labelY: 65,
      mentors: 30,
      schools: 10,
    },
    {
      name: "Visakhapatnam",
      path: "M245,85 L320,80 L325,120 L250,125 Z",
      color: "#F59E0B",
      labelX: 285,
      labelY: 100,
      mentors: 45,
      schools: 15,
    },
    {
      name: "East Godavari",
      path: "M250,125 L350,120 L345,160 L245,165 Z",
      color: "#EF4444",
      labelX: 295,
      labelY: 140,
      mentors: 38,
      schools: 12,
    },
    {
      name: "West Godavari",
      path: "M200,165 L300,160 L295,200 L195,205 Z",
      color: "#8B5CF6",
      labelX: 245,
      labelY: 180,
      mentors: 32,
      schools: 11,
    },
    {
      name: "Krishna",
      path: "M295,200 L380,195 L375,235 L290,240 Z",
      color: "#06B6D4",
      labelX: 335,
      labelY: 215,
      mentors: 40,
      schools: 13,
    },
    {
      name: "Guntur",
      path: "M240,240 L340,235 L335,275 L235,280 Z",
      color: "#84CC16",
      labelX: 285,
      labelY: 255,
      mentors: 35,
      schools: 12,
    },
    {
      name: "Prakasam",
      path: "M180,280 L280,275 L275,315 L175,320 Z",
      color: "#F97316",
      labelX: 225,
      labelY: 295,
      mentors: 28,
      schools: 9,
    },
    {
      name: "Nellore",
      path: "M275,315 L360,310 L355,350 L270,355 Z",
      color: "#EC4899",
      labelX: 315,
      labelY: 330,
      mentors: 30,
      schools: 10,
    },
    {
      name: "Chittoor",
      path: "M270,355 L350,350 L345,390 L265,395 Z",
      color: "#6366F1",
      labelX: 305,
      labelY: 370,
      mentors: 25,
      schools: 8,
    },
    {
      name: "Tirupati",
      path: "M345,390 L420,385 L415,425 L340,430 Z",
      color: "#10B981",
      labelX: 380,
      labelY: 405,
      mentors: 33,
      schools: 11,
    },
    {
      name: "Kadapa",
      path: "M200,320 L280,315 L275,355 L195,360 Z",
      color: "#F59E0B",
      labelX: 235,
      labelY: 335,
      mentors: 22,
      schools: 7,
    },
    {
      name: "Kurnool",
      path: "M120,280 L220,275 L215,320 L115,325 Z",
      color: "#EF4444",
      labelX: 165,
      labelY: 300,
      mentors: 26,
      schools: 8,
    },
    {
      name: "Anantapur",
      path: "M115,325 L215,320 L210,365 L110,370 Z",
      color: "#8B5CF6",
      labelX: 160,
      labelY: 345,
      mentors: 24,
      schools: 7,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CommonHeader currentPage="public-dashboard" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Dashboard</h1>
          <p className="text-gray-600">ATL Mentorship Program - Andhra Pradesh State Overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {stateStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Andhra Pradesh Map */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Presence of ATL in Andhra Pradesh</h3>
            <div className="relative">
              {/* Simplified AP Map Representation */}
              <div className="w-full h-96 bg-gray-50 rounded-lg relative overflow-hidden border border-gray-200">
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  {/* Detailed AP Districts */}
                  {apDistrictsDetailed.map((district) => (
                    <path
                      key={district.name}
                      d={district.path}
                      fill={district.color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity="0.8"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedDistrict(district)}
                    />
                  ))}
                  {/* District labels */}
                  {apDistrictsDetailed.map((district) => (
                    <text
                      key={`label-${district.name}`}
                      x={district.labelX}
                      y={district.labelY}
                      textAnchor="middle"
                      className="text-xs fill-gray-700 font-medium pointer-events-none"
                      style={{ fontSize: "10px" }}
                    >
                      {district.name}
                    </text>
                  ))}
                </svg>
              </div>

              {/* District Info Panel */}
              {selectedDistrict && (
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedDistrict.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      Mentors: <span className="font-medium">{selectedDistrict.mentors}</span>
                    </p>
                    <p className="text-gray-600">
                      Schools: <span className="font-medium">{selectedDistrict.schools}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-2">
              {districtsData.slice(0, 5).map((district) => (
                <div key={district.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: district.color }}></div>
                  <span className="text-xs text-gray-600">{district.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preranamitra Details Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preranamitra Details - (2024-25)</h3>
            <div className="h-80 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative" style={{ height: "240px" }}>
                    <div
                      className="bg-blue-500 rounded-t absolute bottom-0 w-full transition-all duration-500"
                      style={{ height: `${(data.mentors / 250) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs font-medium text-gray-900">{data.mentors}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Monthly Mentor Registration Growth</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Categories</h3>
            <div className="space-y-4">
              {projectCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{category.count}</span>
                    <span className="text-xs text-gray-500 ml-1">({category.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart Representation */}
            <div className="mt-6 flex justify-center">
              <div
                className="w-32 h-32 rounded-full relative"
                style={{
                  background: `conic-gradient(
                  ${projectCategories[0].color} 0deg ${projectCategories[0].percentage * 3.6}deg,
                  ${projectCategories[1].color} ${projectCategories[0].percentage * 3.6}deg ${(projectCategories[0].percentage + projectCategories[1].percentage) * 3.6}deg,
                  ${projectCategories[2].color} ${(projectCategories[0].percentage + projectCategories[1].percentage) * 3.6}deg ${(projectCategories[0].percentage + projectCategories[1].percentage + projectCategories[2].percentage) * 3.6}deg,
                  ${projectCategories[3].color} ${(projectCategories[0].percentage + projectCategories[1].percentage + projectCategories[2].percentage) * 3.6}deg ${(projectCategories[0].percentage + projectCategories[1].percentage + projectCategories[2].percentage + projectCategories[3].percentage) * 3.6}deg,
                  ${projectCategories[4].color} ${(projectCategories[0].percentage + projectCategories[1].percentage + projectCategories[2].percentage + projectCategories[3].percentage) * 3.6}deg 360deg
                )`,
                }}
              >
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Sessions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sessions</h3>
            <div className="h-48 flex items-end justify-between space-x-1">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative" style={{ height: "160px" }}>
                    <div
                      className="bg-green-500 rounded-t absolute bottom-0 w-full"
                      style={{ height: `${(data.sessions / 800) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Sessions</span>
                <span className="font-medium text-gray-900">3,710</span>
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15% from last month</span>
              </div>
            </div>
          </div>

          {/* Top Performing Districts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Districts</h3>
            <div className="space-y-3">
              {districtsData.slice(0, 5).map((district, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ backgroundColor: district.color }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{district.name}</p>
                      <p className="text-xs text-gray-500">{district.schools} schools</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{district.mentors}</p>
                    <p className="text-xs text-gray-500">mentors</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">New ATL Setup</span>
              </div>
              <p className="text-sm text-blue-700">5 new labs established in Guntur district</p>
              <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <UserCheck className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Mentor Registration</span>
              </div>
              <p className="text-sm text-green-700">15 new mentors joined from Visakhapatnam</p>
              <p className="text-xs text-green-600 mt-1">4 hours ago</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <School className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Project Submission</span>
              </div>
              <p className="text-sm text-purple-700">25 projects submitted from Vijayawada schools</p>
              <p className="text-xs text-purple-600 mt-1">6 hours ago</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Achievement</span>
              </div>
              <p className="text-sm text-orange-700">1000+ students completed IoT workshop</p>
              <p className="text-xs text-orange-600 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PublicDashboard
