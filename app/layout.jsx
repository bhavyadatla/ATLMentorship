import "./globals.css"

export const metadata = {
  title: "ATL Mentorship Platform",
  description: "Atal Tinkering Lab Mentorship and Innovation Platform",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
