import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react'

const API_BASE = '/api'

function Matches({ user, setSelectedMentor }) {
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/survey')
      return
    }
    fetchMatches()
  }, [user])

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API_BASE}/mentors/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industries: user.industries,
          identities: user.identities,
          school: user.school
        })
      })
      const data = await res.json()
      setMatches(data.matches || [])
      setMessage(data.message || '')
    } catch (err) {
      console.error('Failed to fetch matches:', err)
      // Use fallback data
      setMatches([
        {
          id: 1,
          name: "Sarah Chen",
          role: "Software Engineer",
          company: "Shopify",
          school: "University of Waterloo",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          tags: ["Women in Tech", "First Generation"],
          matchReasons: ["Works in Technology", "Alumni from similar school"],
          bio: "I remember being terrified to send my first LinkedIn message.",
          responseRate: "Usually responds within 2 days"
        },
        {
          id: 2,
          name: "Marcus Johnson",
          role: "Product Manager",
          company: "Google",
          school: "University of Toronto",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
          tags: ["BIPOC in Tech", "PM Path"],
          matchReasons: ["Works in Technology", "Actively mentors students"],
          bio: "The tech industry can feel intimidating. I'm here to change that.",
          responseRate: "Usually responds within 1 day"
        },
        {
          id: 3,
          name: "Priya Sharma",
          role: "Data Scientist",
          company: "RBC",
          school: "McGill University",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
          tags: ["Women in STEM", "International Student"],
          matchReasons: ["Works in Finance", "International student background"],
          bio: "Cold outreach changed my career trajectory completely.",
          responseRate: "Usually responds within 3 days"
        }
      ])
      setMessage("We found people who understand your journey")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor)
    navigate(`/mentor/${mentor.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Finding your perfect matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Perfect matches found for you</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            People who understand your journey
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {message || "These mentors share similar backgrounds and experiences. You're not reaching out to strangers — you're reaching out to people like you."}
          </p>
        </motion.div>

        {/* Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-50 rounded-2xl p-6 mb-8 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-800 mb-1">Remember, {user?.name || 'friend'}</h3>
            <p className="text-primary-700">
              These are real people who were once in your shoes. They've volunteered to help students like you.
              Taking the first step is the hardest part — and you're already here.
            </p>
          </div>
        </motion.div>

        {/* Matches Grid */}
        <div className="space-y-6">
          {matches.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-hover"
              onClick={() => handleSelectMentor(mentor)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-2xl bg-slate-100"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{mentor.name}</h3>
                      <p className="text-slate-600">
                        <span className="font-medium">{mentor.role}</span> at {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Great match</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="chip text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Match Reasons */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Why this is a great match:</p>
                    <ul className="space-y-1">
                      {mentor.matchReasons?.map((reason, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{mentor.school}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{mentor.responseRate}</span>
                    </div>
                  </div>

                  {/* Bio Quote */}
                  {mentor.bio && (
                    <p className="mt-4 text-slate-600 italic border-l-2 border-primary-200 pl-4">
                      "{mentor.bio}"
                    </p>
                  )}
                </div>

                {/* Action */}
                <div className="flex md:flex-col items-center justify-end gap-2">
                  <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    Connect
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Don't see the right match? More mentors coming soon.
          </p>
          <Link to="/survey" className="text-primary-600 font-medium hover:underline">
            Update your preferences
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Matches
