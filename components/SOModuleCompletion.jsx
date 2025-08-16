"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const SOModuleCompletion = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [moduleData, setModuleData] = useState([
    {
      id: 1,
      universityName: "Andhra University",
      collegeName: "AU College of Engineering",
      teamId: "AU-ENG-001",
      totalModules: 12,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8], // Changed to array of completed module numbers
      status: "Pending",
    },
    {
      id: 2,
      universityName: "JNTU Kakinada",
      collegeName: "JNTU College of Engineering",
      teamId: "JNTU-ENG-002",
      totalModules: 10,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All modules completed
      status: "Pending",
    },
    {
      id: 3,
      universityName: "Sri Venkateswara University",
      collegeName: "SV College of Engineering",
      teamId: "SV-ENG-003",
      totalModules: 15,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 12 modules completed
      status: "Approved",
    },
    {
      id: 4,
      universityName: "Acharya Nagarjuna University",
      collegeName: "ANU College of Engineering",
      teamId: "ANU-ENG-004",
      totalModules: 8,
      completedModules: [1, 2, 3, 4, 5, 6], // 6 modules completed
      status: "Pending",
    },
    {
      id: 5,
      universityName: "Osmania University",
      collegeName: "OU College of Engineering",
      teamId: "OU-ENG-005",
      totalModules: 12,
      completedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All modules completed
      status: "Approved",
    },
  ])

  const handleApprove = (item) => {
    setSelectedItem(item)
    setShowConfirmDialog(true)
  }

  const confirmApproval = () => {
    if (selectedItem) {
      setModuleData((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? { ...item, status: "Approved" } : item)),
      )
    }
    setShowConfirmDialog(false)
    setSelectedItem(null)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Module Completion</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Module Completion Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. of Modules
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {moduleData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.universityName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.collegeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{item.teamId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalModules}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.completedModules.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.status === "Pending" ? (
                      <button
                        onClick={() => handleApprove(item)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Confirm Module Completion Approval</h3>
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>University:</strong> {selectedItem.universityName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>College:</strong> {selectedItem.collegeName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Team ID:</strong> {selectedItem.teamId}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Total Modules:</strong> {selectedItem.totalModules}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Completed:</strong> {selectedItem.completedModules.join(", ")} (
                  {selectedItem.completedModules.length}/{selectedItem.totalModules})
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Are you sure you want to approve this module completion?</p>
              <div className="items-center px-4 py-3 mt-4">
                <button
                  onClick={confirmApproval}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SOModuleCompletion
