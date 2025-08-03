"use client"

import { useState } from "react"

const SOModuleCompletion = () => {
  const [moduleData, setModuleData] = useState([
    {
      id: 1,
      clgCode: "GCET001",
      clg: "Government College of Engineering",
      noOfModComp: 8,
      approval: "Approved",
    },
    {
      id: 2,
      clgCode: "PVIT002",
      clg: "Private Institute of Technology",
      noOfModComp: 6,
      approval: "Pending",
    },
    {
      id: 3,
      clgCode: "GOVT003",
      clg: "Government Polytechnic College",
      noOfModComp: 10,
      approval: "Approved",
    },
    {
      id: 4,
      clgCode: "ENGG004",
      clg: "Engineering College",
      noOfModComp: 4,
      approval: "Pending",
    },
    {
      id: 5,
      clgCode: "TECH005",
      clg: "Technical Institute",
      noOfModComp: 7,
      approval: "Approved",
    },
  ])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Module Completion</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-blue-600 px-4 py-3 text-left font-semibold">Clg Code</th>
                <th className="border border-blue-600 px-4 py-3 text-left font-semibold">Clg</th>
                <th className="border border-blue-600 px-4 py-3 text-left font-semibold">No. of mod comp</th>
                <th className="border border-blue-600 px-4 py-3 text-left font-semibold">Approval</th>
              </tr>
            </thead>
            <tbody>
              {moduleData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.clgCode}</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.clg}</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">{item.noOfModComp}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.approval === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.approval}
                    </span>
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

export default SOModuleCompletion
