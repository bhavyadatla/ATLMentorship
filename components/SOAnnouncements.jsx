"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, Megaphone } from "lucide-react"

const SOAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "State-wide ATL Innovation Challenge",
      content:
        "Announcing the annual State-wide ATL Innovation Challenge for all schools. Registrations open next week!",
      date: "2024-07-25",
    },
    {
      id: 2,
      title: "Training Session for New ATL Coordinators",
      content: "A mandatory training session for all newly appointed ATL coordinators will be held on August 10th.",
      date: "2024-07-20",
    },
  ])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })
  const [isPublishing, setIsPublishing] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)

  const handlePublish = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      if (editingAnnouncement) {
        setAnnouncements(
          announcements.map((ann) =>
            ann.id === editingAnnouncement.id ? { ...newAnnouncement, id: ann.id, date: ann.date } : ann,
          ),
        )
        setEditingAnnouncement(null)
      } else {
        setAnnouncements([
          {
            id: announcements.length > 0 ? Math.max(...announcements.map((a) => a.id)) + 1 : 1,
            ...newAnnouncement,
            date: new Date().toISOString().slice(0, 10),
          },
          ...announcements,
        ])
      }
      setNewAnnouncement({ title: "", content: "" })
      setIsPublishing(false)
    }
  }

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id))
  }

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement)
    setNewAnnouncement({ title: announcement.title, content: announcement.content })
    setIsPublishing(true)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publish Announcement Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-blue-600" />
            {editingAnnouncement ? "Edit Announcement" : "Publish New Announcement"}
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="announcement-title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <label htmlFor="announcement-content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="announcement-content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your announcement here..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                {editingAnnouncement ? <Edit className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {editingAnnouncement ? "Update" : "Publish"}
              </button>
              {editingAnnouncement && (
                <button
                  onClick={() => {
                    setEditingAnnouncement(null)
                    setNewAnnouncement({ title: "", content: "" })
                    setIsPublishing(false)
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Announcements List Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Announcements Published</h3>
          {announcements.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No announcements published yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="border border-gray-200 rounded-lg p-4 relative">
                  <h4 className="font-semibold text-gray-900 mb-1">{ann.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{ann.content}</p>
                  <p className="text-xs text-gray-500">Published: {ann.date}</p>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(ann)}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SOAnnouncements
