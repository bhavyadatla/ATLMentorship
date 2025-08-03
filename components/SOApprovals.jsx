"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"

const SOApprovals = () => {
  const [pendingList, setPendingList] = useState([
    {
      id: 1,
      type: "New ATL Registration",
      applicant: "XYZ School, Guntur",
      date: "2024-07-24",
      priority: "High",
    },
    {
      id: 2,
      type: "Project Proposal",
      applicant: "Student Group A, Krishna",
      date: "2024-07-23",
      priority: "Medium",
    },
    {
      id: 3,
      type: "Resource Request",
      applicant: "ABC School, West Godavari",
      date: "2024-07-22",
      priority: "Low",
    },
    {
      id: 4,
      type: "Mentor Application",
      applicant: "Dr. P. Kumar, Vijayawada",
      date: "2024-07-21",
      priority: "High",
    },
  ])

  const [approvedList, setApprovedList] = useState([
    {
      id: 101,
      type: "Mentor Application",
      applicant: "Dr. R. Sharma",
      date: "2024-07-20",
      approvedBy: "State Officer",
    },
    {
      id: 102,
      type: "Event Grant",
      applicant: "District Education Office",
      date: "2024-07-18",
      approvedBy: "State Officer",
    },
    {
      id: 103,
      type: "ATL Setup",
      applicant: "Government High School",
      date: "2024-07-15",
      approvedBy: "State Officer",
    },
  ])

  const handleApprove = (item) => {
    setPendingList(pendingList.filter((i) => i.id !== item.id))
    setApprovedList([
      ...approvedList,
      {
        ...item,
        id: Date.now(),
        approvedBy: "State Officer",
        date: new Date().toISOString().slice(0, 10),
      },
    ])
  }

  const handleReject = (item) => {
    setPendingList(pendingList.filter((i) => i.id !== item.id))
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Approvals</h2>

      {/* Pending List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Pending list</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Applicant</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Priority</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.type}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.applicant}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.date}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : item.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(item)}
                          className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(item)}
                          className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Approved List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Approved list</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Applicant</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Approved Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Approved By
                  </th>
                </tr>
              </thead>
              <tbody>
                {approvedList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.type}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.applicant}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.date}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.approvedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SOApprovals
