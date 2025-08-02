"use client"

import { useState } from "react"
import { BookOpen, Download, Eye, Search, FileText, Video, Link } from "lucide-react"

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Arduino Programming Guide",
      description: "Complete guide to Arduino programming with examples and projects.",
      type: "PDF",
      category: "IoT",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-12-15",
      downloads: 245,
      size: "2.5 MB",
      icon: FileText,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      description: "Introduction to ML concepts, algorithms, and practical applications.",
      type: "Video",
      category: "AI/ML",
      author: "Prof. Michael Chen",
      uploadDate: "2023-12-10",
      downloads: 189,
      size: "450 MB",
      icon: Video,
    },
    {
      id: 3,
      title: "Robotics Design Principles",
      description: "Essential principles for designing and building robotic systems.",
      type: "PDF",
      category: "Robotics",
      author: "Dr. Lisa Wang",
      uploadDate: "2023-12-08",
      downloads: 156,
      size: "3.2 MB",
      icon: FileText,
    },
    {
      id: 4,
      title: "Mobile App Development Tutorial",
      description: "Step-by-step tutorial for creating mobile applications.",
      type: "Link",
      category: "Mobile Dev",
      author: "Tech Academy",
      uploadDate: "2023-12-05",
      downloads: 298,
      size: "External",
      icon: Link,
    },
    {
      id: 5,
      title: "IoT Sensor Integration Workshop",
      description: "Hands-on workshop materials for sensor integration projects.",
      type: "Video",
      category: "IoT",
      author: "Dr. Sarah Johnson",
      uploadDate: "2023-12-01",
      downloads: 167,
      size: "680 MB",
      icon: Video,
    },
    {
      id: 6,
      title: "Python for Data Science",
      description: "Comprehensive guide to using Python for data analysis and visualization.",
      type: "PDF",
      category: "AI/ML",
      author: "Data Science Institute",
      uploadDate: "2023-11-28",
      downloads: 312,
      size: "4.1 MB",
      icon: FileText,
    },
  ]

  const categories = ["all", "IoT", "AI/ML", "Robotics", "Mobile Dev"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getTypeColor = (type) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-600"
      case "Video":
        return "bg-blue-100 text-blue-600"
      case "Link":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "IoT":
        return "bg-purple-100 text-purple-600"
      case "AI/ML":
        return "bg-indigo-100 text-indigo-600"
      case "Robotics":
        return "bg-red-100 text-red-600"
      case "Mobile Dev":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Resource Library</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <BookOpen className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const IconComponent = resource.icon
          return (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{resource.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(resource.category)}`}>
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{resource.description}</p>

              {/* Resource Meta */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Author: {resource.author}</span>
                  <span>Size: {resource.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Uploaded: {resource.uploadDate}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}

export default ResourceLibrary
