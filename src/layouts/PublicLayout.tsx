import { Outlet } from 'react-router-dom'
import { CustomizeDemo } from '../components/CustomizeDemo'
import { DemoBanner } from '../components/DemoBanner'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CustomizeDemo />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </div>
  )
}
