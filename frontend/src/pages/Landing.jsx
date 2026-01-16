import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Lightbulb,
  Target
} from 'lucide-react'
import RedPanda, { JourneyPanda } from '../components/RedPanda'

function Landing() {
  const features = [
    {
      icon: Heart,
      title: "Reflect on Your Goals",
      description: "Understand what you want from mentorship and where you want to go",
      color: "from-coral to-coral-light"
    },
    {
      icon: Target,
      title: "Identify Challenges",
      description: "Figure out what's holding you back so a mentor can help",
      color: "from-royal to-sky"
    },
    {
      icon: Users,
      title: "Find Your Match",
      description: "Get matched with mentors just one level above you who get it",
      color: "from-lavender to-sky-light"
    },
    {
      icon: MessageSquare,
      title: "Craft Your Message",
      description: "Use what others like you found helpful to reach out",
      color: "from-coral-light to-peach"
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description: "Build your network through two-way verified connections",
      color: "from-mint to-sky"
    }
  ]

  const challenges = [
    { text: "Not having much in common with potential mentors", emoji: "😕" },
    { text: "Social anxiety about speaking to new people", emoji: "😰" },
    { text: "Feeling intimidated by people in higher positions", emoji: "🙈" },
    { text: "Not knowing what questions to ask", emoji: "❓" },
    { text: "Worrying about wasting someone's time", emoji: "⏰" },
    { text: "Fear of being judged or rejected", emoji: "💭" }
  ]

  const testimonials = [
    {
      quote: "I was terrified to send my first message. Approachable helped me realize I wasn't alone - and now I have 3 mentors!",
      name: "Sarah",
      detail: "First-gen student at UofT",
      avatar: "🎓"
    },
    {
      quote: "The questions from people like me were so helpful. I finally knew what to ask!",
      name: "Priya",
      detail: "International student at McGill",
      avatar: "🌏"
    },
    {
      quote: "Being matched with someone just one level ahead made it feel so much less scary.",
      name: "Alex",
      detail: "Career changer at Waterloo",
      avatar: "🚀"
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-lavender-light/30 to-sky-light/20" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-coral/10 blob animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-royal/10 blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-lavender/30 rounded-full blur-3xl" />

        {/* Decorative swirls like in the slide */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 600">
          <path d="M100,100 Q300,50 500,100 T900,100" stroke="#4169E1" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M0,300 Q200,250 400,300 T800,280" stroke="#4169E1" strokeWidth="2" fill="none" />
          <path d="M100,500 Q400,450 700,500 T1000,480" stroke="#4169E1" strokeWidth="2" fill="none" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Red Panda Mascot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              className="mb-6"
            >
              <RedPanda size="xl" mood="excited" />
            </motion.div>

            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-5 py-2.5 rounded-full border-2 border-royal/20 mb-6 shadow-cute">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-bold text-royal">Your confidence journey starts here!</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="gradient-text-blue">approachable</span>
            </h1>

            <p className="text-2xl md:text-3xl font-display font-semibold text-slate-700 mb-4">
              Making mentorship feel
              <span className="wavy-underline ml-2">less scary</span>
            </p>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with mentors who <span className="font-bold text-royal">actually get it</span>.
              Get matched with people just one step ahead of you, not miles away.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link to="/survey" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary flex items-center gap-2">
                See How It Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-mint-dark" />
                <span className="font-medium text-slate-600">Free to use</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-mint-dark" />
                <span className="font-medium text-slate-600">Made by students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-mint-dark" />
                <span className="font-medium text-slate-600">Personalized matches</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement - The Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <RedPanda size="sm" mood="thinking" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800">
                We get it. Reaching out is <span className="text-coral">hard</span>.
              </h2>
            </div>

            <p className="text-xl text-slate-600 mb-12">
              It's not just you. These are the challenges students actually face:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-lavender/20 rounded-2xl border-2 border-lavender/30 hover:border-coral/30 transition-all"
                >
                  <span className="text-3xl">{challenge.emoji}</span>
                  <p className="text-slate-700 font-medium text-left">{challenge.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-gradient-to-r from-coral/10 to-royal/10 rounded-3xl border-2 border-coral/20"
            >
              <div className="flex items-center justify-center gap-3">
                <RedPanda size="md" mood="happy" />
                <p className="text-xl font-display font-bold text-slate-800">
                  That's exactly why we built <span className="gradient-text-blue">approachable</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-800">
              How <span className="gradient-text-blue">approachable</span> works
            </h2>
            <p className="text-xl text-slate-600">
              A step-by-step journey with your red panda friend
            </p>
          </div>

          {/* Journey visualization with growing panda */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-coral via-royal to-mint -translate-y-1/2 rounded-full" />

            <div className="grid md:grid-cols-5 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="card text-center relative z-10 hover:-translate-y-2 transition-transform">
                    {/* Panda that grows with each step */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <JourneyPanda progress={(index + 1) * 20} />
                    </div>

                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 mt-8 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="inline-block px-3 py-1 bg-royal/10 rounded-full text-xs font-bold text-royal mb-3">
                      Step {index + 1}
                    </div>

                    <h3 className="font-display font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-slate-800">
            What makes us <span className="text-coral">different</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card bg-gradient-to-br from-coral/5 to-coral/10 border-coral/20"
            >
              <div className="w-12 h-12 bg-coral/20 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Level-Based Matching</h3>
              <p className="text-slate-600">
                Get matched with mentors just <span className="font-bold">one or two levels ahead</span> - not intimidating executives miles away.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-royal/5 to-royal/10 border-royal/20"
            >
              <div className="w-12 h-12 bg-royal/20 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-royal" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Two-Way Verification</h3>
              <p className="text-slate-600">
                When you both confirm a chat happened, you <span className="font-bold">unlock each other's networks</span>. Real connections, real growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card bg-gradient-to-br from-lavender/30 to-lavender/50 border-lavender"
            >
              <div className="w-12 h-12 bg-lavender rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-royal" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Community Insights</h3>
              <p className="text-slate-600">
                See what <span className="font-bold">people like you asked</span> and what they found helpful. You're never starting from scratch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-lavender/20 to-cream">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-800">
              From students like you
            </h2>
            <p className="text-slate-600">Real stories from the approachable community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-slate-700 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-royal via-royal-dark to-sky-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-coral rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <RedPanda size="lg" mood="cheering" className="mb-6" />

            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to make your first connection?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Your red panda friend is excited to guide you through the journey!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/survey"
                className="inline-flex items-center gap-2 bg-white text-royal font-bold py-4 px-8 rounded-full hover:bg-cream transition-all shadow-xl text-lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/invite"
                className="inline-flex items-center gap-2 bg-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/30 transition-all text-lg border-2 border-white/30"
              >
                Invite a Friend
                <Send className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing
