"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import CommonHeader from "@/components/CommonHeader"

const AboutPage = ({ onNavigate }) => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "What are Atal Tinkering Labs (ATLs) and how do they support the mission?",
      answer:
        "Atal Tinkering Labs are dedicated innovation workspaces where students can give shape to their ideas through hands-on do-it-yourself mode and learn innovation skills.",
    },
    {
      id: 2,
      question: "How do engineering colleges and their students contribute to this initiative?",
      answer:
        "Engineering colleges provide mentorship, technical expertise, and resources to support ATL students in their innovation journey.",
    },
    {
      id: 3,
      question: "What are Atal Tinkering Labs (ATLs) and how do they support the mission?",
      answer:
        "ATLs serve as innovation hubs that foster creativity, critical thinking, and problem-solving skills among students.",
    },
    {
      id: 4,
      question: "How do engineering colleges and their students contribute to this initiative?",
      answer:
        "They contribute through mentorship programs, project guidance, and sharing technical knowledge with ATL students.",
    },
  ]

  const stats = [
    { label: "Mentors Registered", value: "1,234" },
    { label: "Colleges Participated", value: "156" },
    { label: "Universities Participated", value: "89" },
    { label: "Schools Participated", value: "2,456" },
    { label: "Children Benefited", value: "45,678" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CommonHeader currentPage="about" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Vision & Mission Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vision & Mission</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Our vision is to foster a nationwide culture of innovation and entrepreneurship, encouraging a
              problem-solving mindset in young people, and establishing a strong entrepreneurial ecosystem. We aim for a
              future where theoretical knowledge and practical application seamlessly integrate, creating students
              equipped for the challenges of tomorrow.
            </p>
            <p className="font-semibold">Our mission is to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Strengthen Innovation at the School Level</strong> by establishing Atal Tinkering Labs (ATLs) in
                schools, equipping students with necessary tools and resources for innovation.
              </li>
              <li>
                <strong>Foster Collaborations</strong> between higher education institutions, especially engineering
                colleges and universities.
              </li>
              <li>
                <strong>Bridge Theory and Practice</strong> by providing specialized mentorship to engineering students.
              </li>
            </ul>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-4 relative">
                  <div
                    className="absolute inset-0 bg-purple-500 rounded-full"
                    style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 bg-gray-400 rounded-full"
                    style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                  ></div>
                </div>
                <p className="text-gray-600 text-sm">Impact Distribution</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ's</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {faq.id}. {faq.question}
                  </span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* About ATL Mentorship Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About ATL Mentorship</h2>
          <div className="text-blue-600 underline space-y-2 text-sm leading-relaxed">
            <p>
              ATL Innovation Mission (AIM): ATL Atal is Government of India's flagship initiative to create and promote
              a culture of innovation and entrepreneurship across the length and breadth of our country. AIM's objective
              is to develop new programmes and policies for fostering innovation in different sectors of the economy,
              provide platforms and collaboration opportunities for different stakeholders, and create an umbrella
              structure to oversee the innovation & entrepreneurship ecosystem of the country.
            </p>
            <p>
              ATL Atal Tinkering Labs (ATL): To foster curiosity, creativity and imagination in young minds; and
              inculcate skills such as design mindset, computational thinking, adaptive learning, physical computing
              etc. AIM is setting up Atal Tinkering Laboratories in schools across the country. Provided with
              world-class equipment such as 3D printers, robotics & electronics development tools, IoT devices, sensors
              and many more, these labs are fostering inventiveness among students between Class VI to Class XII.
            </p>
            <p>
              ATL Community: The objective is to create a nationwide community of educators, innovators, students and
              mentors to promote innovation and entrepreneurship in the country through various initiatives.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
