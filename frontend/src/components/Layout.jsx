import { Link, useLocation } from 'react-router-dom'
import { Home, BarChart3, Users, Send } from 'lucide-react'
import RedPanda from './RedPanda'

function Layout({ children }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {!isLanding && (
        <nav className="bg-white/90 backdrop-blur-md border-b-3 border-sky/30 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="group-hover:animate-wiggle transition-transform">
                <RedPanda size="xs" mood="happy" animate={false} />
              </div>
              <span className="font-display font-bold text-2xl gradient-text-blue">
                approachable
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="p-3 rounded-full hover:bg-lavender/50 transition-all duration-300"
                title="Home"
              >
                <Home className="w-5 h-5 text-royal" />
              </Link>
              <Link
                to="/matches"
                className="p-3 rounded-full hover:bg-lavender/50 transition-all duration-300"
                title="Find Mentors"
              >
                <Users className="w-5 h-5 text-royal" />
              </Link>
              <Link
                to="/invite"
                className="p-3 rounded-full hover:bg-lavender/50 transition-all duration-300"
                title="Invite Others"
              >
                <Send className="w-5 h-5 text-royal" />
              </Link>
              <Link
                to="/progress"
                className="p-3 rounded-full hover:bg-lavender/50 transition-all duration-300"
                title="Your Progress"
              >
                <BarChart3 className="w-5 h-5 text-royal" />
              </Link>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="py-8 text-center border-t-3 border-sky/20 bg-white/70">
        <div className="flex items-center justify-center gap-2 mb-2">
          <RedPanda size="xs" mood="happy" animate={false} />
          <span className="font-display font-bold text-royal">approachable</span>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Built with love for students who want to make meaningful connections
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
          <span>Made by students, for students</span>
          <span>|</span>
          <span>Your journey starts here</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
