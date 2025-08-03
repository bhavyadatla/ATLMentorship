"use client"

import { useState } from "react"
import CommonHeader from "@/components/CommonHeader"

const PublicDashboard = ({ onNavigate }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  // Stats data matching the image layout
  const stateStats = [
    { title: "Mentors Registered", value: "958", color: "bg-gray-200" },
    { title: "Colleges Participated", value: "1,779", color: "bg-gray-200" },
    { title: "Universities Participated", value: "19", color: "bg-gray-200" },
    { title: "Schools Participated", value: "159", color: "bg-gray-200" },
    { title: "Childrens Benefitted", value: "45,678", color: "bg-gray-200" },
  ]

  // Project categories data for pie chart
  const projectCategories = [
    { category: "IoT & Electronics", count: 145, percentage: 35, color: "#8B5CF6" },
    { category: "AI & Machine Learning", count: 104, percentage: 25, color: "#1F2937" },
    { category: "Robotics", count: 87, percentage: 21, color: "#D1D5DB" },
    { category: "Mobile Apps", count: 58, percentage: 14, color: "#6366F1" },
    { category: "Others", count: 21, percentage: 5, color: "#9CA3AF" },
  ]

  // All 26 districts of Andhra Pradesh with accurate positioning and colors
  const apDistricts = [
    // Northern districts
    {
      name: "Srikakulam",
      path: "M50,20 L120,15 L125,45 L55,50 Z",
      color: "#FFB6C1",
      labelX: 85,
      labelY: 32,
      mentors: 25,
      schools: 8,
    },
    {
      name: "Vizianagaram",
      path: "M125,45 L180,40 L185,70 L130,75 Z",
      color: "#DDA0DD",
      labelX: 155,
      labelY: 57,
      mentors: 30,
      schools: 10,
    },
    {
      name: "Visakhapatnam",
      path: "M185,70 L250,65 L255,95 L190,100 Z",
      color: "#F0E68C",
      labelX: 220,
      labelY: 82,
      mentors: 45,
      schools: 15,
    },
    {
      name: "Alluri Sitharama Raju",
      path: "M130,75 L185,70 L190,100 L135,105 Z",
      color: "#87CEEB",
      labelX: 160,
      labelY: 87,
      mentors: 20,
      schools: 6,
    },
    {
      name: "Anakapalli",
      path: "M255,95 L320,90 L325,120 L260,125 Z",
      color: "#FFB6C1",
      labelX: 290,
      labelY: 107,
      mentors: 28,
      schools: 9,
    },
    {
      name: "Kakinada",
      path: "M260,125 L325,120 L330,150 L265,155 Z",
      color: "#98FB98",
      labelX: 295,
      labelY: 137,
      mentors: 35,
      schools: 12,
    },

    // Central-Eastern districts
    {
      name: "East Godavari",
      path: "M190,100 L260,95 L265,155 L195,160 Z",
      color: "#87CEEB",
      labelX: 225,
      labelY: 127,
      mentors: 38,
      schools: 12,
    },
    {
      name: "West Godavari",
      path: "M135,105 L190,100 L195,160 L140,165 Z",
      color: "#DDA0DD",
      labelX: 165,
      labelY: 132,
      mentors: 32,
      schools: 11,
    },
    {
      name: "Eluru",
      path: "M140,165 L195,160 L200,190 L145,195 Z",
      color: "#F0E68C",
      labelX: 170,
      labelY: 177,
      mentors: 30,
      schools: 10,
    },
    {
      name: "Krishna",
      path: "M200,190 L265,185 L270,215 L205,220 Z",
      color: "#FFB6C1",
      labelX: 235,
      labelY: 202,
      mentors: 40,
      schools: 13,
    },
    {
      name: "NTR",
      path: "M145,195 L200,190 L205,220 L150,225 Z",
      color: "#98FB98",
      labelX: 175,
      labelY: 207,
      mentors: 42,
      schools: 14,
    },

    // Central districts
    {
      name: "Guntur",
      path: "M205,220 L270,215 L275,245 L210,250 Z",
      color: "#87CEEB",
      labelX: 240,
      labelY: 232,
      mentors: 35,
      schools: 12,
    },
    {
      name: "Palnadu",
      path: "M150,225 L205,220 L210,250 L155,255 Z",
      color: "#DDA0DD",
      labelX: 180,
      labelY: 237,
      mentors: 25,
      schools: 8,
    },
    {
      name: "Prakasam",
      path: "M210,250 L275,245 L280,275 L215,280 Z",
      color: "#F0E68C",
      labelX: 245,
      labelY: 262,
      mentors: 28,
      schools: 9,
    },
    {
      name: "Bapatla",
      path: "M275,245 L330,240 L335,270 L280,275 Z",
      color: "#FFB6C1",
      labelX: 305,
      labelY: 257,
      mentors: 22,
      schools: 7,
    },

    // Western districts
    {
      name: "Kurnool",
      path: "M80,180 L155,175 L160,255 L85,260 Z",
      color: "#98FB98",
      labelX: 120,
      labelY: 217,
      mentors: 26,
      schools: 8,
    },
    {
      name: "Nandyal",
      path: "M85,260 L160,255 L165,285 L90,290 Z",
      color: "#87CEEB",
      labelX: 125,
      labelY: 272,
      mentors: 24,
      schools: 7,
    },
    {
      name: "Anantapur",
      path: "M90,290 L165,285 L170,315 L95,320 Z",
      color: "#DDA0DD",
      labelX: 130,
      labelY: 302,
      mentors: 24,
      schools: 7,
    },
    {
      name: "Sri Sathya Sai",
      path: "M95,320 L170,315 L175,345 L100,350 Z",
      color: "#F0E68C",
      labelX: 135,
      labelY: 332,
      mentors: 18,
      schools: 5,
    },

    // Southern districts
    {
      name: "Nellore",
      path: "M215,280 L280,275 L285,305 L220,310 Z",
      color: "#98FB98",
      labelX: 250,
      labelY: 292,
      mentors: 30,
      schools: 10,
    },
    {
      name: "Tirupati",
      path: "M175,345 L240,340 L245,370 L180,375 Z",
      color: "#FFB6C1",
      labelX: 210,
      labelY: 357,
      mentors: 33,
      schools: 11,
    },
    {
      name: "Chittoor",
      path: "M100,350 L175,345 L180,375 L105,380 Z",
      color: "#87CEEB",
      labelX: 140,
      labelY: 362,
      mentors: 25,
      schools: 8,
    },
    {
      name: "Annamayya",
      path: "L180,375 L245,370 L250,400 L185,405 Z",
      color: "#DDA0DD",
      labelX: 215,
      labelY: 387,
      mentors: 20,
      schools: 6,
    },

    // Coastal southern districts
    {
      name: "SPSR Nellore",
      path: "M220,310 L285,305 L290,335 L225,340 Z",
      color: "#F0E68C",
      labelX: 255,
      labelY: 322,
      mentors: 28,
      schools: 9,
    },
    {
      name: "Kadapa",
      path: "M170,315 L220,310 L225,340 L175,345 Z",
      color: "#98FB98",
      labelX: 195,
      labelY: 327,
      mentors: 22,
      schools: 7,
    },
    {
      name: "YSR",
      path: "M225,340 L290,335 L295,365 L230,370 Z",
      color: "#87CEEB",
      labelX: 260,
      labelY: 352,
      mentors: 26,
      schools: 8,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CommonHeader currentPage="public-dashboard" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* First 4 cards in top row */}
          {stateStats.slice(0, 4).map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-lg p-8 text-center`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bottom row with Children Benefitted card and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Children Benefitted Card */}
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{stateStats[4].title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stateStats[4].value}</p>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Distribution</h3>
            <div className="flex justify-center mb-4">
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

            {/* Legend */}
            <div className="space-y-2">
              {projectCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-gray-700">{category.category}</span>
                  </div>
                  <span className="text-gray-600">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PublicDashboard
