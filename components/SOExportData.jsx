"use client"

import { useState } from "react"
import { FileText, ChevronDown } from "lucide-react"

const SOExportData = () => {
  const [activeTab, setActiveTab] = useState("university")
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false)
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false)

  // Sample university data
  const universityData = [
    {
      sno: 1,
      universityName: "Andhra University",
      district: "Visakhapatnam",
      college: "AU College of Engineering",
      active: "Yes",
    },
    {
      sno: 2,
      universityName: "JNTU Kakinada",
      district: "East Godavari",
      college: "JNTU College of Engineering",
      active: "Yes",
    },
    {
      sno: 3,
      universityName: "Sri Venkateswara University",
      district: "Chittoor",
      college: "SV College of Engineering",
      active: "No",
    },
    {
      sno: 4,
      universityName: "Acharya Nagarjuna University",
      district: "Guntur",
      college: "ANU College of Engineering",
      active: "Yes",
    },
    {
      sno: 5,
      universityName: "Osmania University",
      district: "Hyderabad",
      college: "OU College of Engineering",
      active: "Yes",
    },
  ]

  // Sample school data
  const schoolData = [
    {
      sno: 1,
      udiseCode: "28230100101",
      schoolName: "Government High School Vijayawada",
      district: "Krishna",
      mandal: "Vijayawada Urban",
      active: "Yes",
      students: { girls: 245, boys: 267, total: 512 },
      teachers: 18,
    },
    {
      sno: 2,
      udiseCode: "28230100102",
      schoolName: "Zilla Parishad High School Guntur",
      district: "Guntur",
      mandal: "Guntur Urban",
      active: "Yes",
      students: { girls: 189, boys: 203, total: 392 },
      teachers: 15,
    },
    {
      sno: 3,
      udiseCode: "28230100103",
      schoolName: "Municipal High School Tirupati",
      district: "Chittoor",
      mandal: "Tirupati Urban",
      active: "No",
      students: { girls: 156, boys: 178, total: 334 },
      teachers: 12,
    },
    {
      sno: 4,
      udiseCode: "28230100104",
      schoolName: "Government High School Visakhapatnam",
      district: "Visakhapatnam",
      mandal: "Visakhapatnam Urban",
      active: "Yes",
      students: { girls: 298, boys: 312, total: 610 },
      teachers: 22,
    },
    {
      sno: 5,
      udiseCode: "28230100105",
      schoolName: "Zilla Parishad High School Kurnool",
      district: "Kurnool",
      mandal: "Kurnool Urban",
      active: "Yes",
      students: { girls: 167, boys: 189, total: 356 },
      teachers: 14,
    },
  ]

  const downloadCSV = (data, filename, type) => {
    let csvContent = ""

    if (type === "university") {
      csvContent = "S.No,University Name,District,College,Active\n"
      data.forEach((row) => {
        csvContent += `${row.sno},"${row.universityName}","${row.district}","${row.college}","${row.active}"\n`
      })
    } else {
      csvContent = "S.No,UDISE Code,School Name,District,Mandal,Active,Girls,Boys,Total Students,Teachers\n"
      data.forEach((row) => {
        csvContent += `${row.sno},"${row.udiseCode}","${row.schoolName}","${row.district}","${row.mandal}","${row.active}",${row.students.girls},${row.students.boys},${row.students.total},${row.teachers}\n`
      })
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadExcel = (data, filename, type) => {
    // Simple Excel-like format using HTML table
    let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
      <body><table>`

    if (type === "university") {
      excelContent += "<tr><th>S.No</th><th>University Name</th><th>District</th><th>College</th><th>Active</th></tr>"
      data.forEach((row) => {
        excelContent += `<tr><td>${row.sno}</td><td>${row.universityName}</td><td>${row.district}</td><td>${row.college}</td><td>${row.active}</td></tr>`
      })
    } else {
      excelContent +=
        "<tr><th>S.No</th><th>UDISE Code</th><th>School Name</th><th>District</th><th>Mandal</th><th>Active</th><th>Girls</th><th>Boys</th><th>Total Students</th><th>Teachers</th></tr>"
      data.forEach((row) => {
        excelContent += `<tr><td>${row.sno}</td><td>${row.udiseCode}</td><td>${row.schoolName}</td><td>${row.district}</td><td>${row.mandal}</td><td>${row.active}</td><td>${row.students.girls}</td><td>${row.students.boys}</td><td>${row.students.total}</td><td>${row.teachers}</td></tr>`
      })
    }

    excelContent += "</table></body></html>"

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Export Data</h2>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("university")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "university"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              University Data
            </button>
            <button
              onClick={() => setActiveTab("school")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "school"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              School Data
            </button>
          </nav>
        </div>
      </div>

      {/* University Data Tab */}
      {activeTab === "university" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">University Data</h3>
              <div className="relative">
                <button
                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {showUniversityDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        downloadCSV(universityData, "university_data.csv", "university")
                        setShowUniversityDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => {
                        downloadExcel(universityData, "university_data.xls", "university")
                        setShowUniversityDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                    >
                      Excel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {universityData.map((university) => (
                  <tr key={university.sno}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{university.sno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{university.universityName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{university.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{university.college}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          university.active === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {university.active}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* School Data Tab */}
      {activeTab === "school" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">School Data</h3>
              <div className="relative">
                <button
                  onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {showSchoolDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        downloadCSV(schoolData, "school_data.csv", "school")
                        setShowSchoolDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => {
                        downloadExcel(schoolData, "school_data.xls", "school")
                        setShowSchoolDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                    >
                      Excel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UDISE Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mandal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Girls
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Boys
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teachers
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schoolData.map((school) => (
                  <tr key={school.sno}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.sno}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.udiseCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.schoolName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.mandal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          school.active === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {school.active}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.students.girls}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.students.boys}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {school.students.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.teachers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SOExportData
