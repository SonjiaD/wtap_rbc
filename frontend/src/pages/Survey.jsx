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
  AlertCircle
} from 'lucide-react'

const API_BASE = '/api'

function Survey({ user, setUser }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    anxieties: [],
    industries: [],
    identities: [],
    goals: [],
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
      // Use fallback options
      setOptions({
        anxietyTypes: [
          { id: 'rejection', label: 'Fear of rejection', description: "Worried they won't respond" },
          { id: 'awkward', label: 'Sounding awkward', description: "Don't know what to say" },
          { id: 'unqualified', label: 'Feeling unqualified', description: 'Imposter syndrome' },
          { id: 'burden', label: 'Being a burden', description: "Don't want to waste their time" },
          { id: 'followup', label: 'What comes after', description: "Don't know how to maintain the relationship" }
        ],
        industries: ['Technology', 'Finance', 'Consulting', 'Healthcare', 'Design', 'Marketing', 'Data Science', 'Product Management', 'Entrepreneurship', 'Research'],
        identities: ['First Generation Student', 'International Student', 'Women in STEM', 'BIPOC in Tech', 'LGBTQ+', 'Career Changer', 'Non-traditional Background', 'Rural/Small Town Background'],
        goals: [
          { id: 'career', label: 'Career advice', description: 'Learn about different career paths' },
          { id: 'industry', label: 'Industry insights', description: "Understand what it's like to work in a field" },
          { id: 'skills', label: 'Skill development', description: 'Learn what skills to develop' },
          { id: 'network', label: 'Build network', description: 'Expand my professional connections' },
          { id: 'confidence', label: 'Build confidence', description: 'Get more comfortable with networking' }
        ],
        personalityStyles: [
          { id: 'direct', label: 'Direct & to the point', description: 'I prefer concise, efficient communication' },
          { id: 'warm', label: 'Warm & personable', description: 'I like building rapport and connection' },
          { id: 'curious', label: 'Curious & inquisitive', description: 'I love asking lots of questions' },
          { id: 'thoughtful', label: 'Thoughtful & prepared', description: 'I prefer to research and prepare thoroughly' }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      id: 'intro',
      title: "Let's get to know you",
      subtitle: 'This helps us personalize your experience',
      icon: User
    },
    {
      id: 'anxieties',
      title: 'What makes networking feel hard?',
      subtitle: "Select all that apply — you're not alone in these feelings",
      icon: Heart
    },
    {
      id: 'industries',
      title: 'What industries interest you?',
      subtitle: "We'll find people in these fields",
      icon: Briefcase
    },
    {
      id: 'identities',
      title: 'What identities resonate with you?',
      subtitle: 'This helps us match you with relatable mentors (optional)',
      icon: User
    },
    {
      id: 'goals',
      title: 'What do you want from mentorship?',
      subtitle: 'Select your primary goals',
      icon: Target
    },
    {
      id: 'style',
      title: 'How do you prefer to communicate?',
      subtitle: "We'll tailor your outreach messages to your style",
      icon: Sparkles
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
      // Continue anyway with local data
      setUser({ ...formData, userId: 'local-' + Date.now() })
      setInsight({
        insight: "We'll help you build confidence in reaching out to professionals.",
        tips: ['Take it one step at a time', 'Everyone starts somewhere']
      })
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 0: return formData.name.trim() !== ''
      case 1: return formData.anxieties.length > 0
      case 2: return formData.industries.length > 0
      case 3: return true // Optional
      case 4: return formData.goals.length > 0
      case 5: return formData.personalityStyle !== ''
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

  if (loading && !options) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (insight) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="max-w-2xl w-full">
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">We understand you</h2>
            <p className="text-lg text-slate-600 mb-6">{insight.insight}</p>

            <div className="bg-primary-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-primary-800 mb-3">Remember:</h3>
              <ul className="space-y-2">
                {insight.tips?.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-primary-700">
                    <Sparkles className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/matches')}
              className="btn-primary flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(((step + 1) / steps.length) * 100)}% complete
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <CurrentIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{steps[step].title}</h2>
                <p className="text-slate-600">{steps[step].subtitle}</p>
              </div>
            </div>

            {/* Step 0: Intro */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What school are you at? (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="e.g., University of Waterloo"
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Anxieties */}
            {step === 1 && options && (
              <div className="grid gap-3">
                {options.anxietyTypes.map((anxiety) => (
                  <button
                    key={anxiety.id}
                    onClick={() => toggleSelection('anxieties', anxiety.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.anxieties.includes(anxiety.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{anxiety.label}</p>
                        <p className="text-sm text-slate-600">{anxiety.description}</p>
                      </div>
                      {formData.anxieties.includes(anxiety.id) && (
                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Industries */}
            {step === 2 && options && (
              <div className="flex flex-wrap gap-2">
                {options.industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => toggleSelection('industries', industry)}
                    className={`chip ${
                      formData.industries.includes(industry) ? 'chip-selected' : ''
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Identities */}
            {step === 3 && options && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-800 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>This information helps us match you with mentors who share similar experiences. It's completely optional.</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {options.identities.map((identity) => (
                    <button
                      key={identity}
                      onClick={() => toggleSelection('identities', identity)}
                      className={`chip ${
                        formData.identities.includes(identity) ? 'chip-selected' : ''
                      }`}
                    >
                      {identity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Goals */}
            {step === 4 && options && (
              <div className="grid gap-3">
                {options.goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleSelection('goals', goal.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.goals.includes(goal.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{goal.label}</p>
                        <p className="text-sm text-slate-600">{goal.description}</p>
                      </div>
                      {formData.goals.includes(goal.id) && (
                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Personality Style */}
            {step === 5 && options && (
              <div className="grid gap-3">
                {options.personalityStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, personalityStyle: style.id })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.personalityStyle === style.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{style.label}</p>
                        <p className="text-sm text-slate-600">{style.description}</p>
                      </div>
                      {formData.personalityStyle === style.id && (
                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`flex items-center gap-2 font-medium ${
                  step === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-800'
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
                    {step === steps.length - 1 ? 'See My Results' : 'Continue'}
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
