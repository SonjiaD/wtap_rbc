import { Link, useLocation } from 'react-router-dom'
import { Rocket, Home, BarChart3 } from 'lucide-react'

function Layout({ children }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      {!isLanding && (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">Launchpad</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Home"
              >
                <Home className="w-5 h-5 text-slate-600" />
              </Link>
              <Link
                to="/progress"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Your Progress"
              >
                <BarChart3 className="w-5 h-5 text-slate-600" />
              </Link>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200 bg-white/50">
        <p>Built with care for students who want to build meaningful connections</p>
      </footer>
    </div>
  )
}

export default Layout
