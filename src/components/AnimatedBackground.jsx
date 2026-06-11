import { motion } from 'framer-motion'

const orbs = [
  { color: 'rgba(255, 107, 157, 0.35)', size: 320, x: '10%', y: '15%', duration: 18 },
  { color: 'rgba(139, 92, 246, 0.3)', size: 280, x: '75%', y: '20%', duration: 22 },
  { color: 'rgba(251, 191, 36, 0.2)', size: 200, x: '60%', y: '70%', duration: 16 },
  { color: 'rgba(56, 189, 248, 0.2)', size: 240, x: '15%', y: '75%', duration: 20 },
]

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 2,
}))

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1a] via-[#1a0f2e] to-[#0a1628]" />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -10, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-x-0 top-0 h-8 overflow-hidden opacity-10">
        <div className="film-strip flex w-[200%] gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex h-8 w-16 shrink-0 items-center justify-center rounded border border-white/30 bg-black/50 text-xs"
            >
              🎬
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-8 overflow-hidden opacity-10">
        <div className="film-strip flex w-[200%] gap-4" style={{ animationDirection: 'reverse' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex h-8 w-16 shrink-0 items-center justify-center rounded border border-white/30 bg-black/50 text-xs"
            >
              🎟️
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)',
        }}
      />
    </div>
  )
}
