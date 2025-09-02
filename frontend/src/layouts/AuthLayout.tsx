import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Logo } from '../components/Logo'

export const AuthLayout = () => {
  return (
    <main className='relative min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-100 via-pink-100 to-pink-100 opacity-30"></div>

      {/* Content Card */}
      <div className='relative z-10 w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl'>
        <Logo />

        <div>
          <Outlet />
        </div>
      </div>

      <Toaster position='top-center' richColors />
    </main>
  )
}
