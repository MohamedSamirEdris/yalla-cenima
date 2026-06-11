import { motion } from 'framer-motion'

const celebrationEmojis = ['🎉', '🍿', '🎬', '⭐', '🎊', '✨', '🥤', '🎟️']

export default function SuccessScreen({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <motion.div
        className="relative"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          className="text-7xl sm:text-8xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎬
        </motion.span>

        {celebrationEmojis.map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl sm:text-3xl"
            style={{
              left: `${50 + 45 * Math.cos((i / celebrationEmojis.length) * Math.PI * 2)}%`,
              top: `${50 + 45 * Math.sin((i / celebrationEmojis.length) * Math.PI * 2)}%`,
            }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="shimmer-text text-3xl leading-tight font-black sm:text-5xl"
      >
        {message}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 300 }}
        className="mt-2 flex gap-3"
      >
        {['🍿', '🎟️', '🥤'].map((emoji, i) => (
          <motion.span
            key={emoji}
            className="text-4xl"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
