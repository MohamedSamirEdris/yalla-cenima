import { motion } from 'framer-motion'

const elements = [
  { emoji: '🍿', left: '8%', top: '12%', size: 'text-4xl sm:text-5xl', duration: 6, delay: 0 },
  { emoji: '🎟️', left: '88%', top: '18%', size: 'text-3xl sm:text-4xl', duration: 7, delay: 0.5 },
  { emoji: '⭐', left: '92%', top: '55%', size: 'text-2xl sm:text-3xl', duration: 5, delay: 1 },
  { emoji: '🎬', left: '5%', top: '65%', size: 'text-3xl sm:text-4xl', duration: 8, delay: 0.3 },
  { emoji: '🥤', left: '78%', top: '78%', size: 'text-3xl sm:text-4xl', duration: 6.5, delay: 0.8 },
  { emoji: '✨', left: '20%', top: '85%', size: 'text-2xl sm:text-3xl', duration: 4.5, delay: 1.2 },
  { emoji: '🎭', left: '50%', top: '5%', size: 'text-2xl sm:text-3xl', duration: 7.5, delay: 0.2 },
  { emoji: '💫', left: '35%', top: '25%', size: 'text-xl sm:text-2xl', duration: 5.5, delay: 0.7 },
  { emoji: '🍿', left: '65%', top: '40%', size: 'text-2xl sm:text-3xl', duration: 6, delay: 1.5 },
  { emoji: '🎞️', left: '12%', top: '42%', size: 'text-2xl sm:text-3xl', duration: 7, delay: 0.4 },
]

export default function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {elements.map((el, i) => (
        <motion.span
          key={i}
          className={`absolute select-none ${el.size}`}
          style={{ left: el.left, top: el.top }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -8, 5, 0],
            rotate: [0, 10, -8, 5, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.emoji}
        </motion.span>
      ))}
    </div>
  )
}
