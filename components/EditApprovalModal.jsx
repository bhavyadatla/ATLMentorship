"use client"

import { useState, useEffect } from "react"

const EditApprovalModal = ({ item, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(item)

  useEffect(() => {
    setEditedItem(item)
  }, [item])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedItem)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Approved Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={editedItem.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="applicant" className="block text-sm font-medium text-gray-700 mb-1">
              Applicant
            </label>
            <input
              type="text"
              id="applicant"
              name="applicant"
              value={editedItem.applicant}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Approved Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={editedItem.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700 mb-1">
              Approved By
            </label>
            <input
              type="text"
              id="approvedBy"
              name="approvedBy"
              value={editedItem.approvedBy}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditApprovalModal
