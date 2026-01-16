import { motion } from 'framer-motion'

// Red Panda SVG mascot that grows based on progress
function RedPanda({ size = 'md', mood = 'happy', animate = true, className = '' }) {
  // Size presets (for different stages of the journey)
  const sizes = {
    xs: { width: 40, height: 40 },   // Start of journey
    sm: { width: 60, height: 60 },   // After survey
    md: { width: 80, height: 80 },   // Found matches
    lg: { width: 100, height: 100 }, // Sent message
    xl: { width: 120, height: 120 }, // After coffee chat
    '2xl': { width: 150, height: 150 }, // Completed reflection
  }

  const { width, height } = sizes[size] || sizes.md

  // Different expressions based on mood
  const expressions = {
    happy: { eyeScale: 1, mouthCurve: 1 },
    excited: { eyeScale: 1.2, mouthCurve: 1.5 },
    thinking: { eyeScale: 0.9, mouthCurve: 0.5 },
    proud: { eyeScale: 1.1, mouthCurve: 1.3 },
    shy: { eyeScale: 0.8, mouthCurve: 0.7 },
    cheering: { eyeScale: 1.3, mouthCurve: 2 },
  }

  const expression = expressions[mood] || expressions.happy

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={animate ? { scale: 0, rotate: -10 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : false}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={animate ? { scale: 1.1, rotate: [0, -5, 5, 0] } : undefined}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animate ? 'animate-bounce-gentle' : ''}
      >
        {/* Ears */}
        <ellipse cx="25" cy="20" rx="15" ry="18" fill="#C65D3B" />
        <ellipse cx="75" cy="20" rx="15" ry="18" fill="#C65D3B" />
        <ellipse cx="25" cy="18" rx="8" ry="10" fill="#F5E6D3" />
        <ellipse cx="75" cy="18" rx="8" ry="10" fill="#F5E6D3" />

        {/* Head */}
        <circle cx="50" cy="50" r="38" fill="#C65D3B" />

        {/* Face cream area */}
        <ellipse cx="50" cy="58" rx="28" ry="24" fill="#F5E6D3" />

        {/* Eye patches (darker rust) */}
        <ellipse cx="35" cy="45" rx="12" ry="10" fill="#8B3A1D" />
        <ellipse cx="65" cy="45" rx="12" ry="10" fill="#8B3A1D" />

        {/* Eyes */}
        <motion.g
          animate={animate && mood === 'excited' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <circle cx="35" cy="45" r={6 * expression.eyeScale} fill="#1A1A1A" />
          <circle cx="65" cy="45" r={6 * expression.eyeScale} fill="#1A1A1A" />
          {/* Eye shine */}
          <circle cx="37" cy="43" r="2" fill="white" />
          <circle cx="67" cy="43" r="2" fill="white" />
        </motion.g>

        {/* Nose */}
        <ellipse cx="50" cy="58" rx="5" ry="4" fill="#1A1A1A" />

        {/* Mouth */}
        <motion.path
          d={`M 42 ${65 - expression.mouthCurve * 2} Q 50 ${68 + expression.mouthCurve * 3} 58 ${65 - expression.mouthCurve * 2}`}
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={animate && mood === 'cheering' ? { d: ['M 42 63 Q 50 75 58 63', 'M 42 65 Q 50 72 58 65'] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />

        {/* Cheek blush */}
        <ellipse cx="25" cy="55" rx="6" ry="4" fill="#FFB6B6" opacity="0.6" />
        <ellipse cx="75" cy="55" rx="6" ry="4" fill="#FFB6B6" opacity="0.6" />

        {/* Whisker marks */}
        <line x1="32" y1="52" x2="28" y2="50" stroke="#8B3A1D" strokeWidth="1.5" />
        <line x1="32" y1="55" x2="27" y2="56" stroke="#8B3A1D" strokeWidth="1.5" />
        <line x1="68" y1="52" x2="72" y2="50" stroke="#8B3A1D" strokeWidth="1.5" />
        <line x1="68" y1="55" x2="73" y2="56" stroke="#8B3A1D" strokeWidth="1.5" />

        {/* Sparkles for excited/cheering mood */}
        {(mood === 'excited' || mood === 'cheering' || mood === 'proud') && (
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <text x="10" y="25" fontSize="10">✨</text>
            <text x="80" y="20" fontSize="8">⭐</text>
            <text x="5" y="70" fontSize="8">💫</text>
          </motion.g>
        )}
      </svg>
    </motion.div>
  )
}

// Preset components for different journey stages
export function PandaWelcome({ className }) {
  return <RedPanda size="md" mood="happy" className={className} />
}

export function PandaThinking({ className }) {
  return <RedPanda size="sm" mood="thinking" className={className} />
}

export function PandaExcited({ className }) {
  return <RedPanda size="lg" mood="excited" className={className} />
}

export function PandaProud({ className }) {
  return <RedPanda size="xl" mood="proud" className={className} />
}

export function PandaCheering({ className }) {
  return <RedPanda size="2xl" mood="cheering" className={className} />
}

export function PandaShy({ className }) {
  return <RedPanda size="xs" mood="shy" className={className} />
}

// Journey panda that grows based on progress percentage
export function JourneyPanda({ progress = 0, className }) {
  let size = 'xs'
  let mood = 'shy'

  if (progress >= 80) {
    size = '2xl'
    mood = 'cheering'
  } else if (progress >= 60) {
    size = 'xl'
    mood = 'proud'
  } else if (progress >= 40) {
    size = 'lg'
    mood = 'excited'
  } else if (progress >= 20) {
    size = 'md'
    mood = 'happy'
  } else if (progress > 0) {
    size = 'sm'
    mood = 'thinking'
  }

  return <RedPanda size={size} mood={mood} className={className} />
}

export function Sticker({ emoji = '🐼', onComplete, className = '' }) {
  return (
    <motion.div
      className={`fixed z-50 pointer-events-none ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 1],
        opacity: [0, 1, 0],
        y: [0, -100, -200]
      }}
      transition={{
        duration: 2,
        ease: 'easeOut',
        onComplete
      }}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="text-6xl">{emoji}</div>
    </motion.div>
  )
}

export default RedPanda
