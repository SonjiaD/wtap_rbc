import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  Copy,
  Check,
  Mail,
  Link as LinkIcon,
  Users,
  Heart,
  Sparkles
} from 'lucide-react'
import RedPanda from '../components/RedPanda'

function Invite() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const inviteLink = `${window.location.origin}/survey?ref=invite`

  const handleSend = async () => {
    // In a real app, this would send an email
    console.log('Sending invite to:', email)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setEmail('')
    setMessage('')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const emailTemplate = `Hey!

I found this really cool app called Approachable that helps students connect with mentors who actually get it. It matches you with people just a few steps ahead in their journey, which makes it way less intimidating.

I thought you might find it helpful too! Check it out: ${inviteLink}

${message ? `\n${message}\n` : ''}
See you there!`

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <RedPanda size="lg" mood="excited" className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">
            Invite a Friend!
          </h1>
          <p className="text-lg text-slate-600">
            Know someone who could use a mentor? Invite them to join the approachable community!
          </p>
        </motion.div>

        {/* Why invite section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8 bg-gradient-to-r from-coral/10 to-royal/10 border-2 border-coral/20"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-coral" />
            Why invite friends?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-xl">🤝</span>
              <span className="text-slate-700">The more students join, the stronger our community becomes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🌟</span>
              <span className="text-slate-700">Help your friends overcome the same challenges you faced</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🔗</span>
              <span className="text-slate-700">Verified connections help everyone grow their network</span>
            </li>
          </ul>
        </motion.div>

        {/* Copy link section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-royal" />
            Share your invite link
          </h2>
          <div className="flex gap-3">
            <div className="flex-1 bg-lavender/30 rounded-2xl px-4 py-3 border-2 border-lavender/50 overflow-hidden">
              <p className="text-slate-600 text-sm truncate">{inviteLink}</p>
            </div>
            <button
              onClick={copyLink}
              className={`px-5 py-3 rounded-2xl font-bold transition-all ${
                copied
                  ? 'bg-mint text-slate-800'
                  : 'bg-royal text-white hover:bg-royal-dark'
              }`}
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Send email section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-coral" />
            Send an invite email
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Friend's email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@email.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Add a personal note (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., I thought of you because I know you've been looking for mentors..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Preview */}
            <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-100">
              <p className="text-xs font-bold text-slate-500 mb-2">PREVIEW</p>
              <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans">
                {emailTemplate}
              </pre>
            </div>

            <button
              onClick={handleSend}
              disabled={!email || sent}
              className={`w-full btn-primary flex items-center justify-center gap-2 ${
                !email ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {sent ? (
                <>
                  <Check className="w-5 h-5" />
                  Invite Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Invite
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-cute">
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm text-slate-600">
              <strong>Fun fact:</strong> Students who invite friends are 2x more likely to have a successful coffee chat!
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Invite
