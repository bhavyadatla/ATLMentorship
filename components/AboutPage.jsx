"use client"

import CommonHeader from "@/components/CommonHeader"
import Footer from "@/components/Footer"

const AboutPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <CommonHeader currentPage="about" onNavigate={onNavigate} showSidebar={false} showUserMenu={false} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16 flex-1">
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
              <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center">
                <img
                  src="/images/about-description.png"
                  alt="About ATL Description"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="bg-white">
          <div className="py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Vision & Mission</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Placeholder */}
              <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center">
                <img
                  src="/images/about-vision.png"
                  alt="Vision & Mission"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

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
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} isLoggedIn={false} />
    </div>
  )
}

export default AboutPage
