"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Mail, Smartphone, Play, HelpCircle } from "lucide-react"
import CommonHeader from "./CommonHeader"
import Footer from "./Footer"

export default function SupportPage({ onNavigate }) {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const supportCards = [
    {
      icon: Mail,
      title: "Mail Us:",
      content: "Contact-atl-support@gmail.com",
      action: () => window.open("mailto:Contact-atl-support@gmail.com"),
    },
    {
      icon: Smartphone,
      title: "Visit our app:",
      content: "PlayStore",
      action: () => window.open("https://play.google.com/store"),
    },
    {
      icon: Play,
      title: "Watch the Video:",
      content: "Video Link",
      action: () => window.open("https://youtube.com"),
    },
    {
      icon: HelpCircle,
      title: "FAQ's",
      content: (
        <button
          onClick={() => scrollToFAQ()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Scroll to FAQ's
        </button>
      ),
      action: null,
    },
  ]

  const faqs = [
    {
      question: "What is the ATL Mentorship Program?",
      answer:
        "The ATL Mentorship Program is an initiative that connects experienced mentors with students across schools, colleges, and universities to foster innovation, creativity, and learning in STEM fields. It aims to bridge the gap between theoretical knowledge and practical application.",
    },
    {
      question: "How can I register as a mentor?",
      answer:
        "To register as a mentor, click on the 'Register' button on our homepage, select 'Mentor' as your role, fill in your details including your expertise areas, experience, and availability. After verification, you'll be able to start mentoring students.",
    },
    {
      question: "What are the eligibility criteria for students?",
      answer:
        "Students from ATL-enabled schools, colleges, and universities can participate. You need to be actively involved in innovation projects, have basic knowledge of STEM subjects, and commit to regular mentorship sessions.",
    },
    {
      question: "How are mentors and students matched?",
      answer:
        "Our system matches mentors and students based on expertise areas, project requirements, availability, and geographical preferences. We use an intelligent algorithm to ensure the best possible matches.",
    },
    {
      question: "What is the duration of the mentorship program?",
      answer:
        "The standard mentorship program runs for 6 months, with weekly sessions of 1-2 hours. However, the duration can be extended based on project requirements and mutual agreement between mentor and student.",
    },
    {
      question: "Is there any fee for participating in the program?",
      answer:
        "No, the ATL Mentorship Program is completely free for both mentors and students. It's a government initiative to promote innovation and learning in educational institutions.",
    },
    {
      question: "How can I track my progress?",
      answer:
        "Both mentors and students have access to a comprehensive dashboard where they can track session attendance, project milestones, skill development, and overall progress throughout the program.",
    },
    {
      question: "What support is available if I face technical issues?",
      answer:
        "We provide 24/7 technical support through multiple channels - email, phone, and live chat. You can also access our comprehensive help documentation and video tutorials.",
    },
  ]

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section")
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help and support for the ATL Mentorship Platform. We're here to assist you with any questions or issues.
          </p>
        </div>

        {/* Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {supportCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={card.action}
            >
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-black rounded-full flex items-center justify-center">
                <card.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <div className="text-gray-700">
                {typeof card.content === "string" ? <p className="text-lg">{card.content}</p> : card.content}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div id="faq-section" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <button
            onClick={() => window.open("mailto:Contact-atl-support@gmail.com")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Contact Support
          </button>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
