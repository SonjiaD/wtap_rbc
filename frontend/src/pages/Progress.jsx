import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Star,
  Trophy,
  Flame,
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { API_BASE } from '../config'

function Progress({ user }) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.userId) {
      // Show demo data
      setProgress({
        totalChats: 3,
        totalOutreach: 7,
        averageAnxietyReduction: 2.5,
        confidenceScore: 58,
        streak: 5,
        reflectionDetails: [
          {
            mentorName: "Sarah Chen",
            chatDate: new Date(Date.now() - 86400000).toISOString(),
            overallRating: 5,
            anxietyBefore: 7,
            anxietyAfter: 4,
            keyTakeaways: "Learned about the importance of building genuine relationships"
          },
          {
            mentorName: "Marcus Johnson",
            chatDate: new Date(Date.now() - 172800000).toISOString(),
            overallRating: 4,
            anxietyBefore: 6,
            anxietyAfter: 3,
            keyTakeaways: "Got great advice on transitioning from engineering to PM"
          },
          {
            mentorName: "Priya Sharma",
            chatDate: new Date(Date.now() - 259200000).toISOString(),
            overallRating: 5,
            anxietyBefore: 8,
            anxietyAfter: 5,
            keyTakeaways: "International students can absolutely break into finance!"
          }
        ],
        nextMilestone: { target: 5, label: "Have 5 conversations" },
        encouragement: "Every expert was once a beginner."
      })
      setLoading(false)
      return
    }
    fetchProgress()
  }, [user])

  const fetchProgress = async () => {
    try {
      const res = await fetch(`${API_BASE}/reflection/progress/${user.userId}`)
      const data = await res.json()
      setProgress(data)
    } catch (err) {
      console.error('Failed to fetch progress:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const confidenceLevel = progress?.confidenceScore || 30
  const getConfidenceLabel = (score) => {
    if (score >= 80) return { label: "Networking Pro", color: "text-green-600" }
    if (score >= 60) return { label: "Growing Confident", color: "text-blue-600" }
    if (score >= 40) return { label: "Building Momentum", color: "text-amber-600" }
    return { label: "Just Starting", color: "text-slate-600" }
  }
  const confidenceInfo = getConfidenceLabel(confidenceLevel)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Progress, {user?.name || 'Friend'}
          </h1>
          <p className="text-slate-600">
            Track your networking journey and celebrate your growth
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card text-center">
            <MessageSquare className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="text-3xl font-bold">{progress?.totalChats || 0}</div>
            <div className="text-sm text-slate-500">Coffee Chats</div>
          </div>
          <div className="card text-center">
            <Users className="w-8 h-8 text-accent-500 mx-auto mb-2" />
            <div className="text-3xl font-bold">{progress?.totalOutreach || 0}</div>
            <div className="text-sm text-slate-500">Outreach Sent</div>
          </div>
          <div className="card text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-3xl font-bold">{progress?.streak || 0}</div>
            <div className="text-sm text-slate-500">Day Streak</div>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold">-{Math.round(progress?.averageAnxietyReduction || 0)}</div>
            <div className="text-sm text-slate-500">Avg Anxiety Drop</div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Confidence Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Confidence Score</h2>
                <span className={`font-semibold ${confidenceInfo.color}`}>
                  {confidenceInfo.label}
                </span>
              </div>

              <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidenceLevel}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-white drop-shadow">{confidenceLevel}%</span>
                </div>
              </div>

              <div className="flex justify-between text-xs text-slate-500">
                <span>Starting Out</span>
                <span>Growing</span>
                <span>Confident</span>
                <span>Pro</span>
              </div>
            </motion.div>

            {/* Recent Reflections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-lg font-bold mb-4">Recent Conversations</h2>

              {progress?.reflectionDetails?.length > 0 ? (
                <div className="space-y-4">
                  {progress.reflectionDetails.map((reflection, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{reflection.mentorName}</h3>
                          <p className="text-sm text-slate-500">
                            {new Date(reflection.chatDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${
                                j < reflection.overallRating
                                  ? 'text-amber-400 fill-current'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-2 text-sm">
                        <span className="text-red-500">Anxiety: {reflection.anxietyBefore}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-green-500">{reflection.anxietyAfter}</span>
                        <span className="text-green-600 font-medium">
                          (-{reflection.anxietyBefore - reflection.anxietyAfter})
                        </span>
                      </div>

                      {reflection.keyTakeaways && (
                        <p className="text-sm text-slate-600 italic">
                          "{reflection.keyTakeaways}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500 mb-4">No conversations yet</p>
                  <Link to="/matches" className="btn-primary inline-flex items-center gap-2">
                    Find a Mentor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Milestone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card bg-gradient-to-br from-primary-500 to-accent-500 text-black"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Next Milestone</h3>
                  <p className="text-black/80 text-sm">
                    {progress?.nextMilestone?.label || "Keep going!"}
                  </p>
                </div>
              </div>

              {progress?.nextMilestone?.target && (
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress.totalChats || 0}/{progress.nextMilestone.target}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: `${Math.min(100, ((progress.totalChats || 0) / progress.nextMilestone.target) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Encouragement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold">Daily Encouragement</h3>
              </div>
              <p className="text-slate-600 italic">
                "{progress?.encouragement || "Every expert was once a beginner."}"
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/matches"
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Find New Mentors
                </Link>
                <Link
                  to="/survey"
                  className="w-full text-center text-sm text-primary-600 hover:underline"
                >
                  Update your preferences
                </Link>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="card"
            >
              <h3 className="font-bold mb-4">Achievements</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "🚀", label: "First Step", earned: true },
                  { icon: "💬", label: "First Chat", earned: progress?.totalChats >= 1 },
                  { icon: "🎯", label: "5 Chats", earned: progress?.totalChats >= 5 },
                  { icon: "🔥", label: "3 Day Streak", earned: progress?.streak >= 3 },
                  { icon: "⭐", label: "Perfect Chat", earned: progress?.reflectionDetails?.some(r => r.overallRating === 5) },
                  { icon: "🏆", label: "Networking Pro", earned: progress?.confidenceScore >= 80 }
                ].map((achievement, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-center transition-all ${
                      achievement.earned
                        ? 'bg-amber-50 border-2 border-amber-200'
                        : 'bg-slate-50 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-medium text-slate-600">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
