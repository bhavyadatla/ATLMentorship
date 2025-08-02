import { BookOpen, Target, Clock, Award, Calendar, User } from "lucide-react"

const MenteeDashboard = () => {
  const menteeStats = [
    { title: "Current Projects", value: "3", icon: BookOpen, color: "bg-blue-500" },
    { title: "Goals Completed", value: "8", icon: Target, color: "bg-green-500" },
    { title: "Learning Hours", value: "32", icon: Clock, color: "bg-purple-500" },
    { title: "Certificates", value: "2", icon: Award, color: "bg-orange-500" },
  ]

  const currentProjects = [
    {
      id: 1,
      title: "IoT Smart Home System",
      mentor: "Dr. Sarah Johnson",
      progress: 65,
      deadline: "Jan 15, 2024",
      status: "In Progress",
    },
    {
      id: 2,
      title: "AI-Powered Chatbot",
      mentor: "Prof. Michael Chen",
      progress: 40,
      deadline: "Feb 20, 2024",
      status: "Planning",
    },
    {
      id: 3,
      title: "Mobile Learning App",
      mentor: "Dr. Lisa Wang",
      progress: 80,
      deadline: "Dec 30, 2023",
      status: "Testing",
    },
  ]

  const learningGoals = [
    { id: 1, goal: "Complete Arduino Programming Course", completed: true },
    { id: 2, goal: "Build First IoT Project", completed: true },
    { id: 3, goal: "Learn Machine Learning Basics", completed: false },
    { id: 4, goal: "Develop Mobile App", completed: false },
    { id: 5, goal: "Present at Science Fair", completed: false },
  ]

  const upcomingSessions = [
    { id: 1, mentor: "Dr. Sarah Johnson", time: "2:00 PM", date: "Today", topic: "IoT Sensors Review" },
    { id: 2, mentor: "Prof. Michael Chen", time: "4:00 PM", date: "Tomorrow", topic: "AI Model Training" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mentee Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {menteeStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Projects */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Current Projects</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {currentProjects.map((project) => (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : project.status === "Planning"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{project.mentor}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                    <span className="text-sm text-gray-500">Due: {project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Learning Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Learning Goals</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {learningGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        goal.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}
                    >
                      {goal.completed && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${goal.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                      {goal.goal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{session.mentor}</p>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{session.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{session.topic}</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-blue-600">{session.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenteeDashboard
