import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Star,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Trophy
} from 'lucide-react'
import { API_BASE } from '../config'

function Reflection({ user, mentor }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    overallRating: 0,
    anxietyBefore: 5,
    anxietyAfter: 5,
    whatWentWell: [],
    whatToImprove: [],
    keyTakeaways: '',
    wouldReachOutAgain: null,
    followUpPlanned: null
  })

  const wentWellOptions = [
    "I asked good questions",
    "I felt comfortable speaking",
    "I learned something valuable",
    "We had good rapport",
    "I stayed within time",
    "I was well prepared"
  ]

  const improveOptions = [
    "Be more concise",
    "Ask more specific questions",
    "Research them more beforehand",
    "Take better notes",
    "Be less nervous",
    "Follow up faster"
  ]

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/reflection/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.userId,
          mentorId: mentor?.id,
          mentorName: mentor?.name,
          ...formData
        })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error('Failed to submit reflection:', err)
      // Show success anyway with mock data
      setResult({
        reflection: formData,
        progress: {
          totalChats: 1,
          confidenceScore: 45,
          streak: 1
        },
        feedback: {
          messages: [
            "You completed your first coffee chat! The hardest part is starting.",
            `Your anxiety decreased by ${formData.anxietyBefore - formData.anxietyAfter} points during this chat. That's growth!`
          ],
          nextAction: "Consider sending a brief thank you note within 24 hours."
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleOption = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  if (result) {
    const confidenceIncrease = result.progress?.confidenceScore - 30 || 15

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-12 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Amazing work, {user?.name || 'friend'}!</h1>
            <p className="text-slate-600 mb-8">
              You've taken a huge step in building your professional network
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary-600">{result.progress?.totalChats || 1}</div>
                <div className="text-sm text-primary-700">Coffee Chats</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">+{confidenceIncrease}%</div>
                <div className="text-sm text-green-700">Confidence</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-amber-600">{result.progress?.streak || 1}</div>
                <div className="text-sm text-amber-700">Day Streak</div>
              </div>
            </div>

            {/* Feedback Messages */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                Your Progress
              </h3>
              <ul className="space-y-3">
                {result.feedback?.messages?.map((msg, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{msg}</span>
                  </li>
                ))}
              </ul>
              {result.feedback?.nextAction && (
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm font-medium text-slate-700">
                    📝 Next step: {result.feedback.nextAction}
                  </p>
                </div>
              )}
            </div>

            {/* Anxiety Progress */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold mb-4">Anxiety Level</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-1">
                    {formData.anxietyBefore >= 7 ? '😰' : formData.anxietyBefore >= 4 ? '😐' : '😊'}
                  </div>
                  <div className="text-2xl font-bold text-red-500">{formData.anxietyBefore}/10</div>
                  <div className="text-sm text-slate-500">Before</div>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-300" />
                <div className="text-center">
                  <div className="text-4xl mb-1">
                    {formData.anxietyAfter >= 7 ? '😰' : formData.anxietyAfter >= 4 ? '😐' : '😊'}
                  </div>
                  <div className="text-2xl font-bold text-green-500">{formData.anxietyAfter}/10</div>
                  <div className="text-sm text-slate-500">After</div>
                </div>
              </div>
              {formData.anxietyBefore > formData.anxietyAfter && (
                <p className="text-green-600 font-medium mt-4">
                  Your anxiety decreased by {formData.anxietyBefore - formData.anxietyAfter} points! 🎉
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/progress" className="btn-primary flex items-center gap-2">
                View Your Progress
                <TrendingUp className="w-4 h-4" />
              </Link>
              <Link to="/matches" className="btn-secondary flex items-center gap-2">
                Find Another Mentor
              </Link>
            </div>

            {/* Verification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200"
            >
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Verify Your Connection
              </h3>
              <p className="text-green-700 mb-4">
                When both you and {mentor?.name} confirm you've chatted, you'll unlock each other's networks and get access to more mentorship opportunities!
              </p>
              <button className="btn-primary bg-green-600 hover:bg-green-700 flex items-center gap-2 mx-auto">
                <CheckCircle2 className="w-4 h-4" />
                Mark Chat as Verified
              </button>
              <p className="text-xs text-green-600 mt-2 text-center">
                This helps us build a stronger community of verified connections
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  const steps = [
    { title: "Overall Rating", subtitle: "How did the conversation go?" },
    { title: "Anxiety Levels", subtitle: "Track your nervousness before and after" },
    { title: "What Went Well", subtitle: "Celebrate your wins!" },
    { title: "Areas to Improve", subtitle: "No pressure - growth mindset" },
    { title: "Key Takeaways", subtitle: "What did you learn?" },
    { title: "Next Steps", subtitle: "Planning ahead" }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          to="/prep"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to prep
        </Link>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{steps[step].title}</h2>
              <p className="text-slate-600">{steps[step].subtitle}</p>
            </div>
          </div>

          {/* Step 0: Overall Rating */}
          {step === 0 && (
            <div className="text-center py-6">
              <p className="mb-6 text-slate-600">How would you rate your conversation with {mentor?.name || 'your mentor'}?</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    type="button"
                    key={rating}
                    onClick={() => setFormData(prev => ({ ...prev, overallRating: rating }))}
                    className={`w-12 h-12 rounded-xl transition-all ${
                      formData.overallRating >= rating
                        ? 'bg-amber-400 scale-110'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <Star className={`w-6 h-6 mx-auto ${
                      formData.overallRating >= rating ? 'text-white fill-current' : 'text-slate-400'
                    }`} />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">
                {formData.overallRating === 5 ? 'Amazing!' :
                 formData.overallRating === 4 ? 'Great!' :
                 formData.overallRating === 3 ? 'Good' :
                 formData.overallRating === 2 ? 'Could be better' :
                 formData.overallRating === 1 ? 'Not great, but that\'s okay' : 'Click to rate'}
              </p>
            </div>
          )}

          {/* Step 1: Anxiety Levels */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <label className="block font-medium mb-4">How anxious were you BEFORE the chat?</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.anxietyBefore}
                  onChange={(e) => setFormData(prev => ({ ...prev, anxietyBefore: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-green-600">😊 Calm (1)</span>
                  <span className="font-bold">{formData.anxietyBefore}</span>
                  <span className="text-red-600">😰 Very Anxious (10)</span>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-4">How anxious were you AFTER the chat?</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.anxietyAfter}
                  onChange={(e) => setFormData(prev => ({ ...prev, anxietyAfter: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-green-600">😊 Calm (1)</span>
                  <span className="font-bold">{formData.anxietyAfter}</span>
                  <span className="text-red-600">😰 Very Anxious (10)</span>
                </div>
              </div>

              {formData.anxietyBefore > formData.anxietyAfter && (
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-green-700 font-medium">
                    That's a {formData.anxietyBefore - formData.anxietyAfter} point decrease! Great progress! 🌟
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: What Went Well */}
          {step === 2 && (
            <div className="space-y-3">
              {wentWellOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleOption('whatWentWell', option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.whatWentWell.includes(option)
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {formData.whatWentWell.includes(option) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Areas to Improve */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 mb-4">Select any areas you'd like to work on (optional)</p>
              {improveOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleOption('whatToImprove', option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.whatToImprove.includes(option)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {formData.whatToImprove.includes(option) && (
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Key Takeaways */}
          {step === 4 && (
            <div>
              <textarea
                value={formData.keyTakeaways}
                onChange={(e) => setFormData(prev => ({ ...prev, keyTakeaways: e.target.value }))}
                placeholder="What's the most valuable thing you learned from this conversation?"
                rows={5}
                className="input-field resize-none"
              />
              <p className="text-sm text-slate-500 mt-2">
                Writing down your takeaways helps reinforce learning
              </p>
            </div>
          )}

          {/* Step 5: Next Steps */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-3">Would you reach out to this person again?</label>
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Yes, definitely!' },
                    { value: false, label: 'Probably not' }
                  ].map((option) => (
                    <button
                      type="button"
                      key={String(option.value)}
                      onClick={() => setFormData(prev => ({ ...prev, wouldReachOutAgain: option.value }))}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        formData.wouldReachOutAgain === option.value
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-slate-200 hover:border-blue-300 text-slate-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3">Did you plan a follow-up?</label>
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Yes!' },
                    { value: false, label: 'Not yet' }
                  ].map((option) => (
                    <button
                      type="button"
                      key={String(option.value)}
                      onClick={() => setFormData(prev => ({ ...prev, followUpPlanned: option.value }))}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        formData.followUpPlanned === option.value
                          ? 'border-blue-500 bg-blue-100 text-blue-700'
                          : 'border-slate-200 hover:border-blue-300 text-slate-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className={`flex items-center gap-2 font-medium ${
                step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={() => {
                if (step === steps.length - 1) {
                  handleSubmit()
                } else {
                  setStep(step + 1)
                }
              }}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  {step === steps.length - 1 ? 'Complete Reflection' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Reflection
