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
        "Atal Tinkering Labs are dedicated innovation workspaces where students can give shape to their ideas through hands-on do-it-yourself mode and learn innovation skills. They are equipped with state-of-the-art equipment including 3D printers, robotics kits, IoT devices, sensors and other cutting-edge technology to foster creativity and innovation among students from Class VI to XII.",
    },
    {
      id: 2,
      question: "How do engineering colleges and their students contribute to this initiative?",
      answer:
        "Engineering colleges provide mentorship, technical expertise, and resources to support ATL students in their innovation journey. College students and faculty members serve as mentors, guiding school students through project development, technical problem-solving, and innovation methodologies.",
    },
    {
      id: 3,
      question: "What are Atal Tinkering Labs (ATLs) and how do they support the mission?",
      answer:
        "ATLs serve as innovation hubs that foster creativity, critical thinking, and problem-solving skills among students. They provide a platform for students to work on real-world problems and develop innovative solutions using modern technology and tools.",
    },
    {
      id: 4,
      question: "How do engineering colleges and their students contribute to this initiative?",
      answer:
        "They contribute through mentorship programs, project guidance, technical workshops, and sharing knowledge with ATL students. This creates a bridge between theoretical learning and practical application, benefiting both school and college students.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CommonHeader currentPage="about" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* About ATL Mentorship Section */}
        <section className="bg-white">
          <div className="py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">About ATL Mentorship</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Atal Innovation Mission (AIM), NITI Aayog is Government of India's flagship initiative to promote a
                  culture of innovation and entrepreneurship in the country and was setup in 2016. It takes a
                  comprehensive approach, aiming to foster a problem-solving mindset in schools and build an
                  entrepreneurial ecosystem across universities, research institutions, and the private and MSME
                  sectors.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  AIM has launched the Atal Tinkering Lab (ATL) program and it is a state-of-the-art space established
                  in a school with a goal to foster curiosity and innovation in young minds, between grade 6th to 12th
                  across the country through 21st century tools and technologies such as Internet of Things, 3D
                  printing, rapid prototyping tools, robotics, miniaturized electronics, do-it-yourself kits and many
                  more. The aim is to stimulate a problem-solving innovative mindset within the children of the ATL in
                  Schools across the country.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="bg-white">
          <div className="py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Vision & Mission</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Placeholder */}
              <div className="w-full h-80 bg-gray-300 rounded-lg"></div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to foster a nationwide culture of innovation and entrepreneurship, encouraging a
                  problem-solving mindset in young people, and establishing a strong entrepreneurial ecosystem
                  throughout all educational levels and sectors. We aim for a future where theoretical knowledge and
                  practical application are seamlessly integrated, empowering students to become innovators and
                  problem-solvers.
                </p>

                <div>
                  <p className="text-gray-700 font-semibold mb-4">Our mission is to:</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <div>
                        <span className="font-semibold">Promote Innovation at the School Level</span> by establishing
                        Atal Tinkering Labs (ATLs) in schools, equipping students with 21st-century tools like IoT, 3D
                        printing, and robotics.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <div>
                        <span className="font-semibold">Strengthen the Innovation Ecosystem</span> through
                        collaborations between higher education institutions (especially engineering colleges) and ATLs.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <div>
                        <span className="font-semibold">Bridge Theory and Practice</span> by providing specialized
                        mentorship to school students from engineering colleges.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white">
          <div className="py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">FAQ's</h2>
            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-300">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 px-2"
                  >
                    <span className="text-lg font-medium text-gray-900 pr-4">
                      {index + 1}. {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-2 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
