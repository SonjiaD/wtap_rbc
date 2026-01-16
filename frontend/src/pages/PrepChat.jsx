import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  AlertCircle,
  BookOpen
} from 'lucide-react'

const API_BASE = '/api'

function PrepChat({ user, mentor }) {
  const navigate = useNavigate()
  const [prep, setPrep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    agenda: true,
    questions: true,
    talking: false,
    tips: false
  })
  const [copiedQuestion, setCopiedQuestion] = useState(null)

  useEffect(() => {
    if (!user || !mentor) {
      navigate('/matches')
      return
    }
    fetchPrep()
  }, [user, mentor])

  const fetchPrep = async () => {
    try {
      const res = await fetch(`${API_BASE}/prep/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, mentor })
      })
      const data = await res.json()
      setPrep(data)
    } catch (err) {
      console.error('Failed to fetch prep:', err)
      // Fallback data
      setPrep({
        mentor: {
          name: mentor.name,
          role: mentor.role,
          company: mentor.company,
          background: mentor.background,
          bio: mentor.bio
        },
        agenda: {
          duration: "15 minutes",
          structure: [
            { time: "0-2 min", activity: "Quick introduction" },
            { time: "2-10 min", activity: "2-3 focused questions" },
            { time: "10-14 min", activity: "Follow-up discussion" },
            { time: "14-15 min", activity: "Thank you and next steps" }
          ]
        },
        recommendedQuestions: [
          `What was your path from ${mentor.school} to your current role at ${mentor.company}?`,
          "What surprised you most about transitioning from university to the working world?",
          "What skills have been most valuable in your career?",
          "What advice would you give someone trying to break into this field?",
          "Is there anything you wish you had learned earlier?"
        ],
        talkingPoints: {
          introduction: [
            `I'm a student at ${user.school || 'university'}`,
            `I became interested in ${user.industries?.[0] || 'your field'} because...`,
            "My goal is to... (keep it concise and authentic)"
          ],
          connection: [
            `I noticed we both share ${mentor.matchReasons?.[0]?.toLowerCase() || 'similar interests'}`,
            "Your journey resonated with me because...",
            `I was particularly inspired by ${mentor.background || 'your path'}`
          ],
          closing: [
            "Is there anyone else you'd recommend I speak with?",
            "What's the best way to stay in touch?",
            "Thank you so much for your time - this was incredibly helpful"
          ]
        },
        tips: [
          "Research their recent work or company news beforehand",
          "Have your questions written down but stay flexible",
          "Take brief notes during the conversation",
          "Send a thank you message within 24 hours",
          "It's okay to be nervous - they expect it!"
        ],
        dos: [
          "Be punctual - join 1-2 minutes early",
          "Have a quiet, professional background",
          "Show genuine curiosity and listen actively",
          "Be specific in your questions",
          "Express gratitude for their time"
        ],
        donts: [
          "Don't ask for a job directly",
          "Don't dominate the conversation",
          "Don't go over the scheduled time",
          "Don't be discouraged if they're busy",
          "Don't forget to follow up"
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const copyQuestion = async (question, index) => {
    try {
      await navigator.clipboard.writeText(question)
      setCopiedQuestion(index)
      setTimeout(() => setCopiedQuestion(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!user || !mentor) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-slate-600">Preparing your conversation guide...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to={`/mentor/${mentor.id}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {mentor.name}'s profile
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Your Conversation Prep Guide</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Prepare for your chat with {mentor.name.split(' ')[0]}
          </h1>
          <p className="text-slate-600">
            Everything you need to have a confident, productive conversation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Agenda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <button
                onClick={() => toggleSection('agenda')}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-bold">Suggested Agenda</h2>
                    <p className="text-sm text-slate-500">{prep?.agenda?.duration} conversation</p>
                  </div>
                </div>
                {expandedSections.agenda ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSections.agenda && (
                <div className="space-y-3 pl-13">
                  {prep?.agenda?.structure.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-600">{item.time}</span>
                      </div>
                      <span className="text-slate-700">{item.activity}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <button
                onClick={() => toggleSection('questions')}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-bold">Recommended Questions</h2>
                    <p className="text-sm text-slate-500">Tailored for {mentor.name.split(' ')[0]}</p>
                  </div>
                </div>
                {expandedSections.questions ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSections.questions && (
                <div className="space-y-3">
                  {prep?.recommendedQuestions?.map((question, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors"
                    >
                      <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="flex-1 text-slate-700">{question}</p>
                      <button
                        onClick={() => copyQuestion(question, i)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600"
                      >
                        {copiedQuestion === i ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Talking Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <button
                onClick={() => toggleSection('talking')}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-bold">Talking Points</h2>
                    <p className="text-sm text-slate-500">What to say and when</p>
                  </div>
                </div>
                {expandedSections.talking ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSections.talking && (
                <div className="space-y-6">
                  {Object.entries(prep?.talkingPoints || {}).map(([category, points]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        {category === 'introduction' ? '👋 Introduction' :
                         category === 'connection' ? '🤝 Building Connection' :
                         '👋 Closing'}
                      </h3>
                      <ul className="space-y-2">
                        {points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700">
                            <span className="text-primary-500">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <button
                onClick={() => toggleSection('tips')}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-bold">Do's and Don'ts</h2>
                    <p className="text-sm text-slate-500">Coffee chat etiquette</p>
                  </div>
                </div>
                {expandedSections.tips ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {expandedSections.tips && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3">✓ Do</h3>
                    <ul className="space-y-2">
                      {prep?.dos?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700 mb-3">✗ Don't</h3>
                    <ul className="space-y-2">
                      {prep?.donts?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentor Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="font-bold mb-3">Meeting with</h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-xl bg-slate-100"
                />
                <div>
                  <p className="font-medium">{mentor.name}</p>
                  <p className="text-sm text-slate-500">{mentor.role} at {mentor.company}</p>
                </div>
              </div>
              {prep?.mentor?.bio && (
                <p className="text-sm text-slate-600 italic border-l-2 border-primary-200 pl-3">
                  "{prep.mentor.bio}"
                </p>
              )}
            </motion.div>

            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-coral to-coral-light text-white"
            >
              <h3 className="font-bold mb-2 text-black">After your chat</h3>
              <p className="text-black/80 text-sm mb-4">
                Reflect on your conversation to track your growth
              </p>
              <Link
                to="/reflection"
                className="w-full bg-white text-coral font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Complete Reflection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-primary-50 border-primary-100"
            >
              <h3 className="font-bold text-primary-800 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                {prep?.tips?.slice(0, 3).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Encouragement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-amber-50 border-amber-100"
            >
              <p className="text-amber-800 text-sm">
                <strong>You've got this!</strong> Remember, they were once in your shoes.
                Being nervous is normal — it shows you care.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrepChat
