import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Target,
  User,
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Compass,
  Settings,
  MessageSquare
} from 'lucide-react'
import RedPanda, { JourneyPanda } from '../components/RedPanda'

const API_BASE = '/api'

function Survey({ user, setUser }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    yearLevel: '',
    challenges: [],
    industries: [],
    identities: [],
    goals: [],
    whereYouWantToBe: '',
    mentorLevels: 1,
    personalityStyle: ''
  })
  const [insight, setInsight] = useState(null)

  useEffect(() => {
    fetchOptions()
  }, [])

  const fetchOptions = async () => {
    try {
      const res = await fetch(`${API_BASE}/survey/options`)
      const data = await res.json()
      setOptions(data)
    } catch (err) {
      console.error('Failed to fetch options:', err)
      setOptions({
        challenges: [
          { id: 'no-common', label: 'Not much in common with potential mentors', description: "Hard to find relatable people", emoji: "😕" },
          { id: 'social-anxiety', label: 'Social anxiety about speaking to new people', description: "Nervous about reaching out", emoji: "😰" },
          { id: 'intimidated', label: 'Feeling intimidated by people in higher positions', description: "They seem so far ahead", emoji: "🙈" },
          { id: 'questions', label: "Not knowing what questions to ask", description: "What do I even say?", emoji: "❓" },
          { id: 'burden', label: "Worried about wasting someone's time", description: "Don't want to be a bother", emoji: "⏰" },
          { id: 'rejection', label: 'Fear of being judged or rejected', description: "What if they say no?", emoji: "💭" }
        ],
        industries: ['Technology', 'Finance', 'Consulting', 'Healthcare', 'Design', 'Marketing', 'Data Science', 'Product Management', 'Entrepreneurship', 'Research', 'Law', 'Non-profit'],
        identities: ['First Generation Student', 'International Student', 'Women in STEM', 'BIPOC in Tech', 'LGBTQ+', 'Career Changer', 'Non-traditional Background', 'Rural/Small Town Background', 'Transfer Student', 'Mature Student'],
        goals: [
          { id: 'experiences', label: "Getting to know other people's experiences", description: 'Learn from their journey', emoji: "🎯" },
          { id: 'career', label: 'Getting career advice', description: 'Understand different paths', emoji: "🛤️" },
          { id: 'industry', label: 'Learning about an industry', description: "What's it really like?", emoji: "🏢" },
          { id: 'skills', label: 'Figuring out what skills to develop', description: 'What should I learn?', emoji: "📚" },
          { id: 'network', label: 'Building my professional network', description: 'Make real connections', emoji: "🤝" },
          { id: 'confidence', label: 'Building confidence in networking', description: 'Get more comfortable', emoji: "💪" }
        ],
        yearLevels: [
          { id: 'year1', label: '1st Year', description: 'Just starting out' },
          { id: 'year2', label: '2nd Year', description: 'Finding my path' },
          { id: 'year3', label: '3rd Year', description: 'Getting serious' },
          { id: 'year4', label: '4th Year+', description: 'Almost there' },
          { id: 'grad', label: 'Graduate Student', description: 'Advanced studies' },
          { id: 'recent', label: 'Recent Graduate', description: 'Just finished' }
        ],
        personalityStyles: [
          { id: 'direct', label: 'Direct & to the point', description: 'Keep it short and sweet', emoji: "🎯" },
          { id: 'warm', label: 'Warm & personable', description: 'I like building rapport', emoji: "☀️" },
          { id: 'curious', label: 'Curious & inquisitive', description: 'Lots of questions!', emoji: "🤔" },
          { id: 'thoughtful', label: 'Thoughtful & prepared', description: 'I research beforehand', emoji: "📝" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      id: 'intro',
      title: "Let's get to know you!",
      subtitle: 'Your red panda friend wants to learn about you',
      icon: User,
      emoji: "👋"
    },
    {
      id: 'reflection',
      title: 'Where do you want to go?',
      subtitle: "Reflect on your goals and where you see yourself",
      icon: Compass,
      emoji: "🧭"
    },
    {
      id: 'challenges',
      title: 'What makes this hard for you?',
      subtitle: "Be honest - this helps us match you better",
      icon: Heart,
      emoji: "💭"
    },
    {
      id: 'goals',
      title: 'What do you want from mentorship?',
      subtitle: 'Select what matters most to you',
      icon: Target,
      emoji: "🎯"
    },
    {
      id: 'industries',
      title: 'What fields interest you?',
      subtitle: "We'll find mentors in these areas",
      icon: Briefcase,
      emoji: "🏢"
    },
    {
      id: 'identities',
      title: 'What identities resonate with you?',
      subtitle: 'Find mentors who truly get you (optional)',
      icon: User,
      emoji: "🤝"
    },
    {
      id: 'settings',
      title: 'Customize your matches',
      subtitle: 'How many levels ahead should your mentor be?',
      icon: Settings,
      emoji: "⚙️"
    },
    {
      id: 'style',
      title: 'How do you like to communicate?',
      subtitle: "We'll tailor your outreach messages",
      icon: MessageSquare,
      emoji: "💬"
    }
  ]

  const toggleSelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/survey/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setUser({ ...formData, userId: data.userId })
      setInsight(data)
    } catch (err) {
      console.error('Failed to submit survey:', err)
      setUser({ ...formData, userId: 'local-' + Date.now() })
      setInsight({
        insight: `We understand you, ${formData.name}! Based on your challenges, we'll match you with mentors who've been in your shoes.`,
        tips: [
          'Your feelings are valid - many students feel the same way',
          "Being matched with someone just ahead of you makes it less intimidating",
          'Your unique background is an asset, not a barrier'
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 0: return formData.name.trim() !== '' && formData.yearLevel !== ''
      case 1: return formData.whereYouWantToBe.trim() !== ''
      case 2: return formData.challenges.length > 0
      case 3: return formData.goals.length > 0
      case 4: return formData.industries.length > 0
      case 5: return true // Optional
      case 6: return true // Has default
      case 7: return formData.personalityStyle !== ''
      default: return true
    }
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const progress = ((step + 1) / steps.length) * 100

  if (loading && !options) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <RedPanda size="lg" mood="thinking" className="mb-4" />
          <p className="font-display font-semibold text-royal">Loading your journey...</p>
        </div>
      </div>
    )
  }

  if (insight) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4 bg-cream"
      >
        <div className="max-w-2xl w-full">
          <div className="card text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <RedPanda size="xl" mood="cheering" className="mb-4" />
            </motion.div>

            <h2 className="text-3xl font-display font-bold mb-4 text-slate-800">
              We get you, {formData.name}!
            </h2>
            <p className="text-lg text-slate-600 mb-6">{insight.insight}</p>

            <div className="bg-gradient-to-r from-coral/10 to-royal/10 rounded-2xl p-6 mb-6 text-left border-2 border-coral/20">
              <h3 className="font-display font-bold text-coral mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Remember:
              </h3>
              <ul className="space-y-3">
                {insight.tips?.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-xl">{['💫', '🌟', '✨'][i] || '⭐'}</span>
                    <span className="font-medium">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/matches')}
              className="btn-primary flex items-center gap-2 mx-auto text-lg px-8 py-4"
            >
              Find Your Matches
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const CurrentIcon = steps[step].icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cream">
      <div className="max-w-2xl w-full">
        {/* Progress section with growing panda */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <JourneyPanda progress={progress} />
              <div>
                <span className="text-sm font-bold text-royal">
                  Step {step + 1} of {steps.length}
                </span>
                <p className="text-xs text-slate-500">Your panda grows as you progress!</p>
              </div>
            </div>
            <span className="text-sm font-bold text-coral">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-coral to-coral-light rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">{steps[step].emoji}</span>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-800">{steps[step].title}</h2>
                <p className="text-slate-600">{steps[step].subtitle}</p>
              </div>
            </div>

            {/* Step 0: Intro */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your first name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    What school are you at?
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="e.g., University of Waterloo"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Where are you in your journey?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {options?.yearLevels?.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setFormData({ ...formData, yearLevel: level.id })}
                        className={`p-4 rounded-2xl border-3 text-left transition-all ${
                          formData.yearLevel === level.id
                            ? 'border-coral bg-coral/10'
                            : 'border-sky/30 hover:border-coral/50'
                        }`}
                      >
                        <p className="font-bold text-slate-800">{level.label}</p>
                        <p className="text-sm text-slate-500">{level.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Reflection */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-lavender/30 rounded-2xl p-5 border-2 border-lavender">
                  <p className="text-slate-700 font-medium mb-3">
                    Take a moment to reflect on where you want to be. This helps us understand what kind of mentor would be most helpful for you.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Where do you see yourself in 2-3 years? What does your ideal role look like?
                  </label>
                  <textarea
                    value={formData.whereYouWantToBe}
                    onChange={(e) => setFormData({ ...formData, whereYouWantToBe: e.target.value })}
                    placeholder="e.g., Working as a product manager at a tech company, or exploring different roles in finance to figure out what I like..."
                    rows={5}
                    className="input-field resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Don't worry if you're not sure - that's what mentors can help with!
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Challenges */}
            {step === 2 && options && (
              <div className="space-y-3">
                {options.challenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    onClick={() => toggleSelection('challenges', challenge.id)}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.challenges.includes(challenge.id)
                        ? 'border-coral bg-coral/10'
                        : 'border-sky/30 hover:border-coral/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{challenge.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{challenge.label}</p>
                        <p className="text-sm text-slate-500">{challenge.description}</p>
                      </div>
                      {formData.challenges.includes(challenge.id) && (
                        <CheckCircle2 className="w-6 h-6 text-coral flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && options && (
              <div className="space-y-3">
                {options.goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleSelection('goals', goal.id)}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.goals.includes(goal.id)
                        ? 'border-royal bg-royal/10'
                        : 'border-sky/30 hover:border-royal/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{goal.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{goal.label}</p>
                        <p className="text-sm text-slate-500">{goal.description}</p>
                      </div>
                      {formData.goals.includes(goal.id) && (
                        <CheckCircle2 className="w-6 h-6 text-royal flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Industries */}
            {step === 4 && options && (
              <div className="flex flex-wrap gap-3">
                {options.industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => toggleSelection('industries', industry)}
                    className={`chip text-base ${
                      formData.industries.includes(industry) ? 'chip-selected' : ''
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Identities */}
            {step === 5 && options && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-peach/30 rounded-2xl text-slate-700">
                  <span className="text-xl">💝</span>
                  <span className="font-medium">
                    This helps us match you with mentors who share similar experiences. It's completely optional and private.
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {options.identities.map((identity) => (
                    <button
                      key={identity}
                      onClick={() => toggleSelection('identities', identity)}
                      className={`chip text-base ${
                        formData.identities.includes(identity) ? 'chip-selected' : ''
                      }`}
                    >
                      {identity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Settings - Mentor Levels */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="bg-lavender/30 rounded-2xl p-5 border-2 border-lavender">
                  <p className="text-slate-700 font-medium">
                    Being matched with someone just a few steps ahead can feel less intimidating than connecting with a senior executive. You can always expand later!
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-4">
                    How many levels ahead should your mentor be?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 1, label: '1 level ahead', description: 'Upper-year students or recent grads who just went through what you\'re experiencing', recommended: true },
                      { value: 2, label: '2 levels ahead', description: 'Early-career professionals who remember being in your shoes' },
                      { value: 3, label: '3+ levels ahead', description: 'Mid-career professionals with broader perspective' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, mentorLevels: option.value })}
                        className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                          formData.mentorLevels === option.value
                            ? 'border-royal bg-royal/10'
                            : 'border-sky/30 hover:border-royal/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-800">{option.label}</p>
                              {option.recommended && (
                                <span className="px-2 py-0.5 bg-coral/20 text-coral text-xs font-bold rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{option.description}</p>
                          </div>
                          {formData.mentorLevels === option.value && (
                            <CheckCircle2 className="w-6 h-6 text-royal flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Personality Style */}
            {step === 7 && options && (
              <div className="space-y-3">
                {options.personalityStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, personalityStyle: style.id })}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.personalityStyle === style.id
                        ? 'border-coral bg-coral/10'
                        : 'border-sky/30 hover:border-coral/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{style.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{style.label}</p>
                        <p className="text-sm text-slate-500">{style.description}</p>
                      </div>
                      {formData.personalityStyle === style.id && (
                        <CheckCircle2 className="w-6 h-6 text-coral flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-sky/20">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`flex items-center gap-2 font-bold ${
                  step === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-royal hover:text-royal-dark'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={nextStep}
                disabled={!canProceed() || loading}
                className={`btn-primary flex items-center gap-2 ${
                  !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    {step === steps.length - 1 ? 'See My Matches!' : 'Continue'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Survey
