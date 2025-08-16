"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

const SOApprovals = () => {
  const [activeTab, setActiveTab] = useState("pending")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      fullName: "Dr. Priya Sharma",
      phoneNumber: "+91 9876543210",
      role: "University Coordinator",
      email: "priya.sharma@university.edu",
      university: "Andhra University",
      date: "2024-01-15",
    },
    {
      id: 2,
      fullName: "Mr. Rajesh Kumar",
      phoneNumber: "+91 9876543211",
      role: "District State Officer",
      email: "rajesh.kumar@education.gov.in",
      district: "Visakhapatnam",
      date: "2024-01-16",
    },
    {
      id: 3,
      fullName: "Ms. Lakshmi Devi",
      phoneNumber: "+91 9876543212",
      role: "College Coordinator",
      email: "lakshmi.devi@college.edu",
      college: "Government Engineering College",
      date: "2024-01-17",
    },
    {
      id: 4,
      fullName: "Dr. Venkat Reddy",
      phoneNumber: "+91 9876543213",
      role: "University Coordinator",
      email: "venkat.reddy@jntu.edu",
      university: "JNTU Kakinada",
      date: "2024-01-18",
    },
  ])

  const [approvedList, setApprovedList] = useState([
    {
      id: 5,
      fullName: "Dr. Sita Rama",
      phoneNumber: "+91 9876543214",
      role: "University Coordinator",
      email: "sita.rama@osmania.edu",
      university: "Osmania University",
      approvedDate: "2024-01-10",
      approvedBy: "Dr. Venkata Rao",
    },
    {
      id: 6,
      fullName: "Mr. Krishna Murthy",
      phoneNumber: "+91 9876543215",
      role: "District State Officer",
      email: "krishna.murthy@education.gov.in",
      district: "Guntur",
      approvedDate: "2024-01-12",
      approvedBy: "Dr. Venkata Rao",
    },
    {
      id: 7,
      fullName: "Ms. Radha Kumari",
      phoneNumber: "+91 9876543216",
      role: "College Coordinator",
      email: "radha.kumari@anu.edu",
      college: "ANU College",
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Login Approvals</h2>

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
            <h3 className="text-lg font-medium">Pending User Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApprovals.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.role}</td>
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
            <h3 className="text-lg font-medium">Approved Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedList.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.approvedDate}</td>
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
              <h3 className="text-lg font-medium text-gray-900 mt-4">Confirm User Approval</h3>
              <div className="mt-4 text-left">
                <p className="text-sm text-gray-600">
                  <strong>Full Name:</strong> {selectedItem?.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone Number:</strong> {selectedItem?.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Role:</strong> {selectedItem?.role}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {selectedItem?.email}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-4">Are you sure you want to approve this user for login access?</p>
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

export default SOApprovals
