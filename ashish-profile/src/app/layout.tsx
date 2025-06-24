import './globals.css'
import Navbar from './components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
         <head>
        <title>Never Settle</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-neutral-50 text-neutral-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
