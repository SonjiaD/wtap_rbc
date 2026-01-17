import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Calendar,
  Clock,
  GraduationCap,
  Briefcase,
  Star,
  Heart,
  ExternalLink,
  CheckCircle2
} from 'lucide-react'
import { API_BASE } from '../config'

function MentorDetail({ user, selectedMentor, setSelectedMentor }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [mentor, setMentor] = useState(selectedMentor)
  const [loading, setLoading] = useState(!selectedMentor)

  useEffect(() => {
    if (!selectedMentor) {
      fetchMentor()
    }
  }, [id, selectedMentor])

  const fetchMentor = async () => {
    try {
      const res = await fetch(`${API_BASE}/mentors/${id}`)
      const data = await res.json()
      setMentor(data)
      setSelectedMentor(data)
    } catch (err) {
      console.error('Failed to fetch mentor:', err)
      navigate('/matches')
    } finally {
      setLoading(false)
    }
  }

  if (loading || !mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to matches
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-start gap-6">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-28 h-28 rounded-2xl bg-slate-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <div className="flex items-center gap-1 text-sm text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Great match</span>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 mb-3">
                    {mentor.role} at <span className="font-semibold">{mentor.company}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.tags?.map((tag, i) => (
                      <span key={i} className="chip text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-lg font-bold mb-4">About {mentor.name.split(' ')[0]}</h2>
              <p className="text-slate-600 mb-4">
                {mentor.background || "Experienced professional passionate about helping students navigate their career journey."}
              </p>
              {mentor.bio && (
                <blockquote className="border-l-4 border-primary-200 pl-4 italic text-slate-600">
                  "{mentor.bio}"
                </blockquote>
              )}
            </motion.div>

            {/* Why They're a Great Match */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-gradient-to-br from-primary-50 to-accent-50"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary-500" />
                Why {mentor.name.split(' ')[0]} is a great match for you
              </h2>
              <ul className="space-y-3">
                {mentor.matchReasons?.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{reason}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Open to mentoring students like you</span>
                </li>
              </ul>
            </motion.div>

            {/* Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-lg font-bold mb-4">Background</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{mentor.school}</p>
                    <p className="text-sm text-slate-500">
                      {mentor.program} • Class of {mentor.graduationYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{mentor.company}</p>
                    <p className="text-sm text-slate-500">{mentor.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="font-bold mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{mentor.responseRate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{mentor.reachOutHistory}</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-coral to-coral-light text-white"
            >
              <h3 className="font-bold mb-2 text-black">Ready to reach out?</h3>
              <p className="text-black/80 text-sm mb-4">
                We'll help you craft the perfect message.
              </p>
              <div className="space-y-3">
                <Link
                  to="/email"
                  className="w-full bg-white text-coral font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Write Your Message
                </Link>
                <Link
                  to="/prep"
                  className="w-full bg-white/20 text-black font-semibold py-3 px-4 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Prepare for Coffee Chat
                </Link>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-amber-50 border-amber-100"
            >
              <h3 className="font-bold text-amber-800 mb-3">Before you reach out</h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Be authentic — they can tell when messages are generic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Make a specific, small ask (15-20 min chat)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Mention something specific about their background</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorDetail
