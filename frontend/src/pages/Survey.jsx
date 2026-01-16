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
import RedPanda, { JourneyPanda, Sticker } from '../components/RedPanda'

const API_BASE = '/api'

function Survey({ user, setUser }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    socialComfort: {
      meetingNewPeople: '',
      conversationsExperienced: '',
      askingQuestions: '',
      networkingStatement: ''
    },
    identities: [],
    selfDescribeText: '',
    currentChallengesText: '',
    currentChallenges: [],
    mentorshipArea: '',
    direction: '',
    interests: [],
    interestOtherText: '',
    excitements: []
  })
  const [insight, setInsight] = useState(null)
  const [stickers, setStickers] = useState([])

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
        socialComfort: {
          meetingNewPeople: [
            { value: 'very_comfortable', label: 'Very comfortable' },
            { value: 'somewhat_comfortable', label: 'Somewhat comfortable' },
            { value: 'neutral', label: 'Neutral' },
            { value: 'somewhat_anxious', label: 'Somewhat anxious' },
            { value: 'very_anxious', label: 'Very anxious' }
          ],
          conversationsExperienced: [
            { value: 'confident_curios', label: 'Confident and curious' },
            { value: 'slightly_intimidated', label: 'Slightly intimidated but engaged' },
            { value: 'quiet_unsure', label: 'Quiet and unsure what to ask' },
            { value: 'overwhelmed_nervous', label: 'Overwhelmed and nervous' }
          ],
          askingQuestions: [
            { value: 'very_comfortable', label: 'Very comfortable' },
            { value: 'somewhat_comfortable', label: 'Somewhat comfortable' },
            { value: 'only_encouraged', label: 'Only if encouraged' },
            { value: 'uncomfortable', label: 'Uncomfortable' }
          ],
          networkingStatement: [
            { value: 'enjoy_networking', label: 'I enjoy networking and meeting new people' },
            { value: 'okay_effort', label: 'I\'m okay with it but it takes effort' },
            { value: 'avoid_possible', label: 'I avoid it when possible' },
            { value: 'want_anxious', label: 'I want to network but feel anxious doing so' }
          ]
        },
        identities: [
          { value: 'student', label: 'Student' },
          { value: 'early_career', label: 'Early-career professional' },
          { value: 'mid_career', label: 'Mid-career professional' },
          { value: 'career_changer', label: 'Career changer' },
          { value: 'founder', label: 'Founder / entrepreneur' },
          { value: 'woman_female', label: 'Woman / female-identifying' },
          { value: 'man_male', label: 'Man / male-identifying' },
          { value: 'non_binary', label: 'Non-binary / gender diverse' },
          { value: 'international', label: 'International background' },
          { value: 'immigrant', label: 'Immigrant' },
          { value: 'refugee', label: 'Refugee or displaced background' },
          { value: 'first_gen', label: 'First-generation (in education or career)' },
          { value: 'underrepresented', label: 'Underrepresented background in my field' },
          { value: 'returning_work', label: 'Returning to work after a break' },
          { value: 'caregiver', label: 'Caregiver responsibilities' },
          { value: 'self_describe', label: 'Prefer to self-describe', allowText: true },
          { value: 'prefer_not', label: 'Prefer not to say' }
        ],
        currentChallenges: [
          { value: 'lack_clarity', label: 'Lack of clarity about my career direction' },
          { value: 'feeling_behind', label: 'Feeling behind compared to peers' },
          { value: 'imposter_syndrome', label: 'Imposter syndrome' },
          { value: 'burnout', label: 'Burnout or lack of motivation' },
          { value: 'education_cert', label: 'Navigating education or certifications' },
          { value: 'transitioning_careers', label: 'Transitioning careers or industries' },
          { value: 'workplace_confidence', label: 'Workplace confidence or communication' },
          { value: 'building_network', label: 'Building a professional network' },
          { value: 'balancing_life', label: 'Balancing personal life and career' }
        ],
        mentorshipAreas: [
          { value: 'career_direction', label: 'Career direction' },
          { value: 'skill_development', label: 'Skill development' },
          { value: 'education_planning', label: 'Education planning' },
          { value: 'confidence_communication', label: 'Confidence and communication' },
          { value: 'networking', label: 'Networking' },
          { value: 'leadership', label: 'Leadership or advancement' },
          { value: 'personal_growth', label: 'Personal growth alongside career' }
        ],
        directions: [
          { value: 'adventurer', label: '🌍 Adventurer', description: 'I\'m exploring options, interests, or possibilities.' },
          { value: 'architect', label: '🧭 Architect', description: 'I have a specific career or goal I\'m working toward.' }
        ],
        interests: [
          { value: 'technology', label: 'Technology' },
          { value: 'business_entrepreneurship', label: 'Business / Entrepreneurship' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'arts_creative', label: 'Arts / Creative fields' },
          { value: 'education', label: 'Education' },
          { value: 'social_impact', label: 'Social impact / Nonprofit' },
          { value: 'science_research', label: 'Science / Research' },
          { value: 'trades_labor', label: 'Trades / Skilled labor' },
          { value: 'other', label: 'Other', allowText: true }
        ],
        excitements: [
          { value: 'solving_problems', label: 'Solving problems' },
          { value: 'helping_people', label: 'Helping people' },
          { value: 'creativity', label: 'Creativity' },
          { value: 'stability', label: 'Stability' },
          { value: 'income_potential', label: 'Income potential' }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const getSteps = () => {
    const baseSteps = [
      {
        id: 'intro',
        title: "Let's get to know you!",
        subtitle: 'Your red panda friend wants to learn about you',
        icon: User,
        emoji: "👋"
      },
      {
        id: 'social_comfort',
        title: 'Confidence & Social Comfort',
        subtitle: 'Help us match you with mentors at a comfortable experience level',
        icon: Heart,
        emoji: "💭"
      },
      {
        id: 'identities',
        title: 'About You',
        subtitle: 'Find mentors who understand similar experiences (optional)',
        icon: User,
        emoji: "🤝"
      },
      {
        id: 'challenges',
        title: 'Current Challenges',
        subtitle: 'What challenges are you facing right now?',
        icon: Target,
        emoji: "🎯"
      },
      {
        id: 'mentorship_area',
        title: 'Mentorship Focus',
        subtitle: 'What area do you most want mentorship in?',
        icon: Briefcase,
        emoji: "🎯"
      },
      {
        id: 'direction',
        title: 'Your Direction',
        subtitle: 'Where are you in your career journey?',
        icon: Compass,
        emoji: "🧭"
      }
    ]

    if (formData.direction === 'adventurer') {
      baseSteps.push(
        {
          id: 'interests',
          title: 'Exploring Interests',
          subtitle: 'What topics or fields are you curious about?',
          icon: Sparkles,
          emoji: "🌍"
        },
        {
          id: 'excitement',
          title: 'What Excites You?',
          subtitle: 'What aspects of these interests excite you most?',
          icon: Sparkles,
          emoji: "✨"
        }
      )
    }

    return baseSteps
  }

  const steps = getSteps()

  const toggleSelection = (field, value, emoji) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
    if (emoji) showSticker(emoji)
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
    switch (steps[step]?.id) {
      case 'intro': return formData.name.trim() !== '' && formData.school.trim() !== ''
      case 'social_comfort': return Object.values(formData.socialComfort).every(v => v !== '')
      case 'identities': return true // Optional
      case 'challenges': return formData.currentChallengesText.trim() !== '' || formData.currentChallenges.length > 0
      case 'mentorship_area': return formData.mentorshipArea !== ''
      case 'direction': return formData.direction !== ''
      case 'interests': return formData.interests.length > 0
      case 'excitement': return formData.excitements.length > 0
      default: return true
    }
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
      showSticker('🎉')
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const showSticker = (emoji = '🐼') => {
    const id = Date.now()
    setStickers(prev => [...prev, { id, emoji }])
    setTimeout(() => {
      setStickers(prev => prev.filter(s => s.id !== id))
    }, 2000)
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
            {steps[step]?.id === 'intro' && (
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
              </div>
            )}

            {/* Step 1: Social Comfort */}
            {steps[step]?.id === 'social_comfort' && options && (
              <div className="space-y-6">
                <div className="bg-lavender/30 rounded-2xl p-5 border-2 border-lavender">
                  <p className="text-slate-700 font-medium">
                    This helps us match you with mentors at a comfortable experience level. There are no right or wrong answers. Answer honestly.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    How do you typically feel about meeting new people one-on-one?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {options.socialComfort?.meetingNewPeople?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, socialComfort: { ...prev.socialComfort, meetingNewPeople: option.value } }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.socialComfort.meetingNewPeople === option.value
                            ? 'border-coral bg-coral/10'
                            : 'border-sky/30 hover:border-coral/50'
                        }`}
                      >
                        <p className="font-medium text-slate-800">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    In conversations with more experienced people, you usually feel:
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {options.socialComfort?.conversationsExperienced?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, socialComfort: { ...prev.socialComfort, conversationsExperienced: option.value } }))}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          formData.socialComfort.conversationsExperienced === option.value
                            ? 'border-coral bg-coral/10'
                            : 'border-sky/30 hover:border-coral/50'
                        }`}
                      >
                        <p className="font-medium text-slate-800">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    How comfortable are you asking questions when you don't understand something?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {options.socialComfort?.askingQuestions?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, socialComfort: { ...prev.socialComfort, askingQuestions: option.value } }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.socialComfort.askingQuestions === option.value
                            ? 'border-coral bg-coral/10'
                            : 'border-sky/30 hover:border-coral/50'
                        }`}
                      >
                        <p className="font-medium text-slate-800">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Which statement fits you best?
                  </label>
                  <div className="space-y-3">
                    {options.socialComfort?.networkingStatement?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, socialComfort: { ...prev.socialComfort, networkingStatement: option.value } }))}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          formData.socialComfort.networkingStatement === option.value
                            ? 'border-coral bg-coral/10'
                            : 'border-sky/30 hover:border-coral/50'
                        }`}
                      >
                        <p className="font-medium text-slate-800">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identities */}
            {steps[step]?.id === 'identities' && options && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-peach/30 rounded-2xl text-slate-700">
                  <span className="text-xl">💝</span>
                  <span className="font-medium">
                    Which parts of your identity feel most relevant to your journey right now? Select any that you feel comfortable sharing. This helps us connect you with mentors who may understand similar experiences.
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {options.identities.map((identity) => (
                    <button
                      key={identity.value}
                      onClick={() => {
                        if (identity.value === 'self_describe') {
                          toggleSelection('identities', identity.value, '🤝')
                        } else {
                          toggleSelection('identities', identity.value, '🤝')
                        }
                      }}
                      className={`chip text-base ${
                        formData.identities.includes(identity.value) ? 'chip-selected' : ''
                      }`}
                    >
                      {identity.label}
                    </button>
                  ))}
                </div>
                {formData.identities.includes('self_describe') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Please describe:
                    </label>
                    <input
                      type="text"
                      value={formData.selfDescribeText}
                      onChange={(e) => setFormData({ ...formData, selfDescribeText: e.target.value })}
                      placeholder="Your description"
                      className="input-field"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Challenges */}
            {steps[step]?.id === 'challenges' && options && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Describe some challenges you are currently facing? (Optional - you can also select from the options below)
                  </label>
                  <textarea
                    value={formData.currentChallengesText}
                    onChange={(e) => setFormData({ ...formData, currentChallengesText: e.target.value })}
                    placeholder="Share your challenges here..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Select all that apply:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {options.currentChallenges.map((challenge) => (
                      <button
                        key={challenge.value}
                        onClick={() => toggleSelection('currentChallenges', challenge.value, '✅')}
                        className={`chip text-base ${
                          formData.currentChallenges.includes(challenge.value) ? 'chip-selected' : ''
                        }`}
                      >
                        {challenge.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Mentorship Area */}
            {steps[step]?.id === 'mentorship_area' && options && (
              <div className="space-y-3">
                {options.mentorshipAreas.map((area) => (
                  <button
                    key={area.value}
                    onClick={() => { setFormData({ ...formData, mentorshipArea: area.value }); showSticker('🎯') }}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.mentorshipArea === area.value
                        ? 'border-royal bg-royal/10'
                        : 'border-sky/30 hover:border-royal/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-800">{area.label}</p>
                      {formData.mentorshipArea === area.value && (
                        <CheckCircle2 className="w-6 h-6 text-royal flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Direction */}
            {steps[step]?.id === 'direction' && options && (
              <div className="space-y-3">
                {options.directions.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => { setFormData({ ...formData, direction: dir.value }); showSticker('🧭') }}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.direction === dir.value
                        ? 'border-coral bg-coral/10'
                        : 'border-sky/30 hover:border-coral/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{dir.label.split(' ')[0]}</span>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{dir.label}</p>
                        <p className="text-sm text-slate-500">{dir.description}</p>
                      </div>
                      {formData.direction === dir.value && (
                        <CheckCircle2 className="w-6 h-6 text-coral flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 6: Interests */}
            {steps[step]?.id === 'interests' && options && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {options.interests.map((interest) => (
                    <button
                      key={interest.value}
                      onClick={() => {
                        if (interest.value === 'other') {
                          toggleSelection('interests', interest.value, '✅')
                        } else {
                          toggleSelection('interests', interest.value, '✅')
                        }
                      }}
                      className={`chip text-base ${
                        formData.interests.includes(interest.value) ? 'chip-selected' : ''
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                </div>
                {formData.interests.includes('other') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Please specify:
                    </label>
                    <input
                      type="text"
                      value={formData.interestOtherText}
                      onChange={(e) => setFormData({ ...formData, interestOtherText: e.target.value })}
                      placeholder="Other interests"
                      className="input-field"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 7: Excitement */}
            {steps[step]?.id === 'excitement' && options && (
              <div className="space-y-3">
                {options.excitements.map((excitement) => (
                  <button
                    key={excitement.value}
                    onClick={() => toggleSelection('excitements', excitement.value, '✨')}
                    className={`w-full p-4 rounded-2xl border-3 text-left transition-all ${
                      formData.excitements.includes(excitement.value)
                        ? 'border-royal bg-royal/10'
                        : 'border-sky/30 hover:border-royal/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-800">{excitement.label}</p>
                      {formData.excitements.includes(excitement.value) && (
                        <CheckCircle2 className="w-6 h-6 text-royal flex-shrink-0" />
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
      {/* Floating red pandas for fun */}
      <motion.div
        className="fixed top-20 right-10 z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <RedPanda size="sm" mood="happy" />
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-10 z-10"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <RedPanda size="xs" mood="shy" />
      </motion.div>

      {/* Sidebar navigation */}
      <motion.div
        className="fixed top-1/2 right-6 transform -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-white rounded-full p-2 shadow-lg border-2 border-sky/30">
          <div className="flex flex-col gap-2">
            {steps.map((stepItem, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index === step
                    ? 'bg-coral text-white shadow-lg shadow-coral/30 scale-110'
                    : 'bg-sky/20 text-slate-600 hover:bg-coral/20 hover:text-coral'
                }`}
                title={`${index + 1}. ${stepItem.title}`}
              >
                <span className="text-sm font-bold">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {stickers.map(sticker => (
        <Sticker key={sticker.id} emoji={sticker.emoji} />
      ))}
    </div>
  )
}

export default Survey
