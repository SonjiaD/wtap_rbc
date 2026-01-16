import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Wand2,
  Send,
  MessageSquare
} from 'lucide-react'

const API_BASE = '/api'

function EmailGenerator({ user, mentor }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState({ subject: '', body: '' })
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState({ subject: false, body: false })
  const [selectedStyle, setSelectedStyle] = useState(user?.personalityStyle || 'warm')
  const [variations, setVariations] = useState([])
  const [showVariations, setShowVariations] = useState(false)

  const styles = [
    { id: 'direct', label: 'Direct', emoji: '🎯' },
    { id: 'warm', label: 'Warm', emoji: '☀️' },
    { id: 'curious', label: 'Curious', emoji: '🤔' },
    { id: 'thoughtful', label: 'Thoughtful', emoji: '📝' }
  ]

  useEffect(() => {
    if (!user || !mentor) {
      navigate('/matches')
      return
    }
    generateEmail()
  }, [user, mentor, selectedStyle])

  const generateEmail = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/email/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
          mentor,
          personalityStyle: selectedStyle
        })
      })
      const data = await res.json()
      setEmail({ subject: data.subject, body: data.body, source: data.source })
    } catch (err) {
      console.error('Failed to generate email:', err)
      // Fallback template
      setEmail({
        subject: `Fellow ${mentor?.school || 'student'} hoping to connect`,
        body: `Hi ${mentor?.name || 'there'},

I hope this message finds you well! My name is ${user?.name || 'Student'}, and I'm currently a student at ${user?.school || 'university'}.

I came across your profile and was really inspired by your journey from ${mentor?.school || 'school'} to ${mentor?.company || 'your company'}. ${mentor?.matchReasons?.[0] ? `I noticed that ${mentor.matchReasons[0].toLowerCase()}, which really resonated with me.` : ''}

I'd be incredibly grateful if you had 15-20 minutes for a virtual coffee chat. I promise to come prepared and respect your time!

Warmly,
${user?.name || 'Student'}`
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchVariations = async () => {
    try {
      const res = await fetch(`${API_BASE}/email/variations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, mentor })
      })
      const data = await res.json()
      setVariations(data.variations || [])
    } catch (err) {
      console.error('Failed to fetch variations:', err)
    }
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied({ ...copied, [type]: true })
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShowVariations = () => {
    if (variations.length === 0) {
      fetchVariations()
    }
    setShowVariations(!showVariations)
  }

  if (!user || !mentor) {
    return null
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
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Wand2 className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Message Generator</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Craft your message to {mentor.name.split(' ')[0]}
          </h1>
          <p className="text-slate-600">
            We've created a personalized message based on your style and their background
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Style Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="font-bold mb-3">Choose your communication style</h3>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedStyle === style.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {style.emoji} {style.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Email Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-3" />
                    <p className="text-slate-600">Crafting your perfect message...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Subject Line */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Subject Line</label>
                      <button
                        onClick={() => copyToClipboard(email.subject, 'subject')}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        {copied.subject ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <input
                        type="text"
                        value={email.subject}
                        onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                        className="w-full bg-transparent outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Body */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Message</label>
                      <button
                        onClick={() => copyToClipboard(email.body, 'body')}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        {copied.body ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <textarea
                        value={email.body}
                        onChange={(e) => setEmail({ ...email, body: e.target.value })}
                        rows={12}
                        className="w-full bg-transparent outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Sidebar navigation */}
                  <motion.div
                    className="fixed top-1/2 right-6 transform -translate-y-1/2 z-20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="bg-white rounded-full p-2 shadow-lg border-2 border-sky/30">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => navigate('/prep')}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-110"
                          title="Prepare for Coffee Chat"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate('/matches')}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-sky/20 text-slate-600 hover:bg-primary-500/20 hover:text-primary-500"
                          title="Back to Matches"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                    <button
                      onClick={generateEmail}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
                    >
                      <RefreshCw className="w-4 h-4" />
                      {email.source === 'ai' ? 'Regenerate with AI' : 'Regenerate'}
                    </button>
                    <button
                      onClick={handleShowVariations}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Sparkles className="w-4 h-4" />
                      {showVariations ? 'Hide' : 'See'} other styles
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Variations */}
            {showVariations && variations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <h3 className="font-bold">Other styles to try:</h3>
                {variations.filter(v => v.style !== selectedStyle).map((variation, i) => (
                  <div key={i} className="card border-2 border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="chip">
                        {styles.find(s => s.id === variation.style)?.emoji} {variation.style}
                      </span>
                      <button
                        onClick={() => {
                          setEmail({ subject: variation.subject, body: variation.body })
                          setSelectedStyle(variation.style)
                          setShowVariations(false)
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Use this style
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {variation.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

            {/* Sidebar moved to bottom */}
          <div className="space-y-6">
            {/* Mentor Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h3 className="font-bold mb-3">Sending to</h3>
              <div className="flex items-center gap-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-xl bg-slate-100"
                />
                <div>
                  <p className="font-medium">{mentor.name}</p>
                  <p className="text-sm text-slate-500">{mentor.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-coral to-coral-light text-white"
            >
              <h3 className="font-bold mb-3 text-black">Next Steps</h3>
              <ol className="space-y-3 text-sm text-black/90">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
                  <span>Copy the message above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
                  <span>Send via LinkedIn or email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
                  <span>Prepare for your chat!</span>
                </li>
              </ol>
              <Link
                to="/prep"
                className="w-full mt-4 bg-white text-coral font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Prepare for Coffee Chat
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="font-bold mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Personalize if you notice something specific about them</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Keep it under 150 words</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Send on Tuesday-Thursday for best response rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Follow up after 1 week if no response</span>
                </li>
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
                <strong>Remember:</strong> The person you're nervous to message was once in your shoes.
                Most professionals genuinely want to help students succeed.
              </p>
            </motion.div>

            {/* Ready to reach out section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card bg-gradient-to-br from-coral to-coral-light text-white"
            >
              <h3 className="font-bold mb-3 text-2xl">Ready to reach out?</h3>
              <p className="text-white/90 mb-4">
                We'll help you craft the perfect message.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">📝</span>
                  <span className="text-sm">Write Your Message</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">☕</span>
                  <span className="text-sm">Prepare for Coffee Chat</span>
                </div>
              </div>
              <Link
                to="/prep"
                className="w-full mt-4 bg-white text-coral font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Prepare for Coffee Chat
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailGenerator
