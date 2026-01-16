import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Rocket,
  MessageSquare,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

function Landing() {
  const features = [
    {
      icon: Heart,
      title: "Identify Your Challenges",
      description: "Understand what's holding you back from reaching out"
    },
    {
      icon: Users,
      title: "Find Relatable People",
      description: "Connect with mentors who share your background and journey"
    },
    {
      icon: MessageSquare,
      title: "Craft Your Message",
      description: "Generate authentic outreach that sounds like you"
    },
    {
      icon: Sparkles,
      title: "Prepare with Confidence",
      description: "Get questions, talking points, and a clear agenda"
    },
    {
      icon: TrendingUp,
      title: "Track Your Growth",
      description: "See your confidence increase with every conversation"
    }
  ]

  const testimonials = [
    {
      quote: "I was terrified to send my first message. Launchpad helped me realize I wasn't alone.",
      name: "First-gen student",
      school: "UofT"
    },
    {
      quote: "The prep materials made me feel like I actually belonged in the conversation.",
      name: "International student",
      school: "McGill"
    },
    {
      quote: "I've had 5 coffee chats now. My anxiety has completely transformed into excitement.",
      name: "Career changer",
      school: "Waterloo"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-primary-100 mb-6">
              <Rocket className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Your confidence journey starts here</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Turn anxiety into
              <span className="block gradient-text">confident connections</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Most students don't struggle with finding mentors — they struggle with the courage to reach out.
              <span className="font-semibold text-slate-800"> We're here to change that.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/survey" className="btn-primary flex items-center gap-2 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary flex items-center gap-2">
                See How It Works
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Personalized experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The real problem isn't finding mentors
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              It's the voice in your head that says:
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                "What if they don't respond?",
                "I don't know what to say",
                "Why would they want to talk to me?",
                "I don't want to waste their time",
                "I'll sound awkward",
                "What do I even ask?"
              ].map((thought, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 text-lg">?</span>
                  </div>
                  <p className="text-slate-700 italic">"{thought}"</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-12 text-xl font-medium text-slate-800">
              We designed Launchpad to address exactly these barriers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Launchpad Works
            </h2>
            <p className="text-xl text-slate-600">
              A step-by-step system to build real professional relationships
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < features.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent z-0" />
                )}
                <div className="card text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-primary-500 mb-2">STEP {index + 1}</div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From students like you
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <p className="text-lg italic text-slate-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full" />
                  <div>
                    <p className="font-medium text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.school}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to make your first connection?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              It takes just 2 minutes to get started. No sign-up required.
            </p>
            <Link
              to="/survey"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-all shadow-xl text-lg"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing
