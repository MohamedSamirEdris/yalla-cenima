import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import AnimatedBackground from './components/AnimatedBackground'
import FloatingElements from './components/FloatingElements'
import NoButton from './components/NoButton'
import SuccessScreen from './components/SuccessScreen'

function fireConfetti() {
  const duration = 3000
  const end = Date.now() + duration
  const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#38bdf8', '#4ade80']

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 6,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      scalar: 1.2,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
  })

  frame()
}

export default function App() {
  const noAnchorRef = useRef(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleYes = useCallback(() => {
    setConfirmed(true)
    fireConfetti()
  }, [])

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-6 py-8"
      >
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex w-full flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                className="mb-6 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-sm font-semibold tracking-widest text-purple-300 uppercase backdrop-blur-sm"
              >
                Cinema Tonight
              </motion.div>

              <motion.div
                className="relative z-20 w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.h1
                  className="shimmer-text mb-4 text-center text-3xl leading-tight font-black sm:text-4xl md:text-5xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Are we going to the cinema tonight? 🍿🎬
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-10 text-center text-lg text-purple-200/70 sm:text-xl"
                >
                  Choose wisely 😏
                </motion.p>

                <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
                  <motion.button
                    type="button"
                    onClick={handleYes}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 px-10 py-4 text-xl font-black text-white shadow-lg shadow-purple-500/30 sm:w-auto sm:px-12 sm:py-5 sm:text-2xl"
                    whileHover={{
                      scale: 1.08,
                      boxShadow: '0 0 40px rgba(192, 132, 252, 0.6)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 4px 30px rgba(255, 107, 157, 0.4)',
                        '0 4px 50px rgba(192, 132, 252, 0.6)',
                        '0 4px 30px rgba(255, 107, 157, 0.4)',
                      ],
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      YES ✅
                    </span>
                  </motion.button>

                  <div
                    ref={noAnchorRef}
                    className="flex w-full items-center justify-center rounded-2xl border border-dashed border-red-400/25 bg-red-500/5 px-8 py-3.5 sm:w-auto sm:px-10 sm:py-4"
                    aria-hidden
                  >
                    <span className="text-sm font-semibold text-red-300/40">NO is somewhere... 👀</span>
                  </div>
                </div>
              </motion.div>

              <NoButton disabled={confirmed} anchorRef={noAnchorRef} />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center text-sm text-white/30"
              >
                Tap YES before NO runs away 🏃‍♂️
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
            >
              <SuccessScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  )
}
