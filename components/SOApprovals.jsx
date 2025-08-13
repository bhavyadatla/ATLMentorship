"use client"

import { useState } from "react"
import { CheckCircle, Edit } from "lucide-react"

const SOApprovals = () => {
  const [activeTab, setActiveTab] = useState("pending")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: "University Registration",
      applicant: "Andhra University",
      date: "2024-01-15",
      details: "New ATL lab setup request",
    },
    {
      id: 2,
      type: "School Registration",
      applicant: "Government High School",
      date: "2024-01-16",
      details: "ATL equipment procurement",
    },
    {
      id: 3,
      type: "Teacher Training",
      applicant: "JNTU Kakinada",
      date: "2024-01-17",
      details: "Faculty development program",
    },
    {
      id: 4,
      type: "Student Project",
      applicant: "SV University",
      date: "2024-01-18",
      details: "Innovation project funding",
    },
  ])

  const [approvedList, setApprovedList] = useState([
    {
      id: 5,
      type: "University Registration",
      applicant: "Osmania University",
      approvedDate: "2024-01-10",
      approvedBy: "Dr. Venkata Rao",
    },
    {
      id: 6,
      type: "School Registration",
      applicant: "Zilla Parishad High School",
      approvedDate: "2024-01-12",
      approvedBy: "Dr. Venkata Rao",
    },
    {
      id: 7,
      type: "Teacher Training",
      applicant: "ANU College",
      approvedDate: "2024-01-14",
      approvedBy: "Dr. Venkata Rao",
    },
  ])

  const handleApprove = (item) => {
    setSelectedItem(item)
    setShowConfirmDialog(true)
  }

  const confirmApproval = () => {
    if (selectedItem) {
      // Move from pending to approved
      setPendingApprovals((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setApprovedList((prev) => [
        ...prev,
        {
          ...selectedItem,
          approvedDate: new Date().toISOString().split("T")[0],
          approvedBy: "Dr. Venkata Rao",
        },
      ])
    }
    setShowConfirmDialog(false)
    setSelectedItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem({ ...item })
    setShowEditModal(true)
  }

  const saveEdit = () => {
    setApprovedList((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))
    setShowEditModal(false)
    setEditingItem(null)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Approvals</h2>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "pending"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending List
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "approved"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Approved List
            </button>
          </nav>
        </div>
      </div>

      {/* Pending List */}
      {activeTab === "pending" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium">Pending Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApprovals.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleApprove(item)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approved List */}
      {activeTab === "approved" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium">Approved List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedList.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.approvedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.approvedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Confirm Approval</h3>
              <div className="mt-4 text-left">
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong> {selectedItem?.type}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Applicant:</strong> {selectedItem?.applicant}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {selectedItem?.date}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Details:</strong> {selectedItem?.details}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Are you sure you want to approve this request?</p>
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

      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Approved Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Applicant</label>
                  <input
                    type="text"
                    value={editingItem.applicant}
                    onChange={(e) => setEditingItem({ ...editingItem, applicant: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Approved Date</label>
                  <input
                    type="date"
                    value={editingItem.approvedDate}
                    onChange={(e) => setEditingItem({ ...editingItem, approvedDate: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Approved By</label>
                  <input
                    type="text"
                    value={editingItem.approvedBy}
                    onChange={(e) => setEditingItem({ ...editingItem, approvedBy: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SOApprovals
