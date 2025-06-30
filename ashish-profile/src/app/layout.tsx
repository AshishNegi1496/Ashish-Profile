import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
 <html lang="en">
      <head>
        <title>Never Settle</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="bg-blue-900 text-neutral-900 relative min-h-screen flex flex-col overflow-hidden">
        {/* Bg image */}
        <div className="absolute inset-0 -z-10 bg-white/30 backdrop-blur-sm" />

        {/* Navbar always at the top */}
        <Navbar />

        {/* Main content fills available space between navbar and footer */}
        <main className=" bg-[#101323] relative z-10 flex-1 flex flex-col">{children}</main>

        {/* Footer always at the bottom */}
        <Footer />
      </body>
    </html>
  )
}
