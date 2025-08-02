"use client"

import { useState } from "react"
import { FolderOpen, Plus, Calendar, User, Clock } from "lucide-react"

const ProjectTracker = () => {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Smart Home IoT System",
      description: "Developing an integrated IoT system for home automation using Arduino and sensors.",
      mentor: "Dr. Sarah Johnson",
      mentee: "Rahul Verma",
      progress: 75,
      status: "In Progress",
      startDate: "2023-11-01",
      deadline: "2024-01-15",
      category: "IoT",
      milestones: [
        { id: 1, title: "Hardware Setup", completed: true },
        { id: 2, title: "Sensor Integration", completed: true },
        { id: 3, title: "Mobile App Development", completed: false },
        { id: 4, title: "Testing & Deployment", completed: false },
      ],
    },
    {
      id: 2,
      title: "AI-Powered Chatbot",
      description: "Creating an intelligent chatbot using natural language processing for student queries.",
      mentor: "Prof. Michael Chen",
      mentee: "Priya Sharma",
      progress: 45,
      status: "In Progress",
      startDate: "2023-11-15",
      deadline: "2024-02-20",
      category: "AI/ML",
      milestones: [
        { id: 1, title: "Data Collection", completed: true },
        { id: 2, title: "Model Training", completed: false },
        { id: 3, title: "Integration", completed: false },
        { id: 4, title: "Testing", completed: false },
      ],
    },
    {
      id: 3,
      title: "Robotic Arm Controller",
      description: "Building a precise robotic arm with computer vision for object manipulation.",
      mentor: "Dr. Lisa Wang",
      mentee: "Karan Singh",
      progress: 90,
      status: "Testing",
      startDate: "2023-10-01",
      deadline: "2023-12-30",
      category: "Robotics",
      milestones: [
        { id: 1, title: "Mechanical Design", completed: true },
        { id: 2, title: "Control System", completed: true },
        { id: 3, title: "Vision Integration", completed: true },
        { id: 4, title: "Final Testing", completed: false },
      ],
    },
    {
      id: 4,
      title: "Educational Mobile App",
      description: "Developing a gamified learning app for science concepts.",
      mentor: "Dr. Sarah Johnson",
      mentee: "Anita Patel",
      progress: 30,
      status: "Planning",
      startDate: "2023-12-01",
      deadline: "2024-03-15",
      category: "Mobile Dev",
      milestones: [
        { id: 1, title: "UI/UX Design", completed: true },
        { id: 2, title: "Backend Development", completed: false },
        { id: 3, title: "Frontend Development", completed: false },
        { id: 4, title: "Testing & Launch", completed: false },
      ],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true
    return project.status.toLowerCase().replace(" ", "-") === activeFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-600"
      case "Testing":
        return "bg-green-100 text-green-600"
      case "Planning":
        return "bg-yellow-100 text-yellow-600"
      case "Completed":
        return "bg-gray-100 text-gray-600"
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
        <h2 className="text-3xl font-bold text-gray-800">Project Tracker</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
        {["all", "planning", "in-progress", "testing", "completed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeFilter === filter ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filter.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            {/* Team Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Mentor: {project.mentor}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Mentee: {project.mentee}</span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Started: {project.startDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Due: {project.deadline}</span>
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
              <div className="space-y-2">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        milestone.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}
                    >
                      {milestone.completed && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${milestone.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                      {milestone.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectTracker
