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
      <body className="bg-blue-900 text-neutral-900 min-h-screen flex flex-col overflow-hidden">
        {/* Background layer */}
        <div className="absolute inset-0 -z-10 bg-white/30 backdrop-blur-sm" />

        {/* Navbar with 5% height */}
        <div style={{ height: '4vh', flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Main with 90% height */}
        <main style={{ height: '90vh', overflowY: 'auto' }} className="bg-[#101323] relative z-10">
          {children}
        </main>

        {/* Footer with 5% height */}
        <div style={{ height: '20vh', flexShrink: 0 }}>
          <Footer />
        </div>
      </body>
    </html>
  )
}
