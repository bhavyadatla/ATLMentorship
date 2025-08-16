"use client"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import CommonHeader from "./CommonHeader"
import Footer from "./Footer"

const PublicDashboard = ({ onNavigate }) => {
  const participationData = [
    { name: "Active", value: 65, color: "#6366F1" },
    { name: "Inactive", value: 20, color: "#1F2937" },
    { name: "Pending", value: 15, color: "#D1D5DB" },
  ]

  const performanceData = [
    { name: "Excellent", value: 45, color: "#6366F1" },
    { name: "Good", value: 35, color: "#8B5CF6" },
    { name: "Average", value: 20, color: "#D1D5DB" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ATL Mentorship Platform Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights and analytics for the ATL Mentorship Program across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-300 rounded-lg p-6 h-40 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mentors</h3>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Registered</h3>
              <p className="text-3xl font-bold text-gray-900">2,450</p>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-6 h-40 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Colleges</h3>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Participated</h3>
              <p className="text-3xl font-bold text-gray-900">185</p>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-6 h-40 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Universities</h3>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Participated</h3>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
          </div>

          <div className="bg-gray-300 rounded-lg p-6 h-40 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Schools</h3>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Participated</h3>
              <p className="text-3xl font-bold text-gray-900">1,280</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Children Benefitted Card */}
          <div className="bg-gray-300 rounded-lg p-8 h-64 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Childrens</h3>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Benefitted</h3>
              <p className="text-4xl font-bold text-gray-900">15,600</p>
            </div>
          </div>

          {/* Participation Status Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Participation Status</h3>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={participationData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                    {participationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {participationData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-gray-600">{entry.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{entry.value}.0%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Performance Metrics</h3>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={performanceData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {performanceData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-gray-600">{entry.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{entry.value}.0%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default PublicDashboard
