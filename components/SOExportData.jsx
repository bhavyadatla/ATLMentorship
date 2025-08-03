"use client"

import { useState } from "react"
import { Download } from "lucide-react"

const SOExportData = () => {
  const [exportData, setExportData] = useState([
    {
      id: 1,
      category: "Student Data",
      records: 15420,
      lastUpdated: "2024-08-03",
      status: "Ready",
    },
    {
      id: 2,
      category: "School Data",
      records: 1250,
      lastUpdated: "2024-08-02",
      status: "Ready",
    },
    {
      id: 3,
      category: "ATL Performance",
      records: 890,
      lastUpdated: "2024-08-01",
      status: "Processing",
    },
    {
      id: 4,
      category: "Mentor Data",
      records: 2340,
      lastUpdated: "2024-07-30",
      status: "Ready",
    },
  ])

  const handleExport = (category) => {
    alert(`Exporting ${category} data...`)
  }

  const handleExportAll = () => {
    alert("Exporting all data...")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Export Data</h2>
        <button
          onClick={handleExportAll}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                  Data Category
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Records</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Last Updated</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {exportData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.category}</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.records.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.lastUpdated}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Ready" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <button
                      onClick={() => handleExport(item.category)}
                      disabled={item.status !== "Ready"}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        item.status === "Ready"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SOExportData
