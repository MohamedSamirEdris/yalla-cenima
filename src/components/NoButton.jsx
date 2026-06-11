import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const FUNNY_MESSAGES = [
  'Nice try 😏',
  "You can't escape movie night 😂",
  'Wrong button!',
  'Try again 🤭',
  'Nope! Cinema awaits 🎬',
  'The popcorn is calling 🍿',
  'Not today, friend 😎',
  'YES is that way 👉',
  'Resistance is futile 🎭',
  'Movie magic wins ✨',
]

const FLEE_RADIUS = 100

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function fleeFromPointer(pointerX, pointerY, buttonRef, currentPos) {
  const padding = 16
  const btn = buttonRef.current
  const width = btn?.offsetWidth ?? 130
  const height = btn?.offsetHeight ?? 52
  const vw = window.innerWidth
  const vh = window.innerHeight

  const rect = btn?.getBoundingClientRect()
  const btnX = currentPos?.x ?? rect?.left ?? vw / 2 - width / 2
  const btnY = currentPos?.y ?? rect?.top ?? vh * 0.72
  const centerX = btnX + width / 2
  const centerY = btnY + height / 2

  let dx = centerX - pointerX
  let dy = centerY - pointerY
  const dist = Math.hypot(dx, dy) || 1
  dx /= dist
  dy /= dist

  const fleeDistance = 140 + Math.random() * 120
  let newX = centerX + dx * fleeDistance - width / 2
  let newY = centerY + dy * fleeDistance - height / 2

  const dramatic = Math.random()
  if (dramatic < 0.25) {
    newY = padding
  } else if (dramatic < 0.5) {
    newY = vh - height - padding
  } else if (dramatic < 0.65) {
    newX = padding
  } else if (dramatic < 0.8) {
    newX = vw - width - padding
  }

  newX += (Math.random() - 0.5) * 60
  newY += (Math.random() - 0.5) * 60

  return {
    x: clamp(newX, padding, vw - width - padding),
    y: clamp(newY, padding, vh - height - padding),
  }
}

export default function NoButton({ disabled, anchorRef }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState(null)
  const [message, setMessage] = useState('')
  const [animKey, setAnimKey] = useState(0)
  const messageTimeout = useRef(null)
  const lastFlee = useRef(0)

  useLayoutEffect(() => {
    if (!anchorRef?.current) return

    const placeInitial = () => {
      const anchor = anchorRef.current.getBoundingClientRect()
      setPosition({ x: anchor.left, y: anchor.top })
    }

    placeInitial()
    window.addEventListener('resize', placeInitial)
    return () => window.removeEventListener('resize', placeInitial)
  }, [anchorRef])

  const flee = useCallback(
    (clientX, clientY) => {
      if (disabled) return

      const now = Date.now()
      if (now - lastFlee.current < 120) return
      lastFlee.current = now

      setPosition((prev) => fleeFromPointer(clientX, clientY, buttonRef, prev))
      setAnimKey((k) => k + 1)
      setMessage(FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)])

      if (messageTimeout.current) clearTimeout(messageTimeout.current)
      messageTimeout.current = setTimeout(() => setMessage(''), 2000)
    },
    [disabled],
  )

  const handlePointer = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      flee(e.clientX, e.clientY)
    },
    [flee],
  )

  useEffect(() => {
    if (disabled || !position) return

    const onPointerMove = (e) => {
      const btn = buttonRef.current
      if (!btn) return

      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)

      if (dist < FLEE_RADIUS) {
        flee(e.clientX, e.clientY)
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: false })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [disabled, position, flee])

  if (disabled || !position) return null

  return createPortal(
    <>
      <AnimatePresence>
        {message && (
          <motion.div
            key={message + animKey}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-none fixed left-1/2 top-8 z-[60] -translate-x-1/2 rounded-2xl border border-pink-400/40 bg-gradient-to-r from-pink-500/30 to-purple-500/30 px-5 py-2.5 text-center text-sm font-bold text-pink-100 shadow-lg backdrop-blur-md sm:text-base"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        tabIndex={-1}
        aria-label="No button - good luck clicking it"
        className="fixed z-50 cursor-not-allowed touch-none select-none rounded-2xl border-2 border-red-400/60 bg-gradient-to-r from-red-600/40 to-orange-600/40 px-8 py-3.5 text-lg font-bold text-red-100 shadow-xl shadow-red-500/20 backdrop-blur-sm sm:px-10 sm:py-4 sm:text-xl"
        style={{ left: position.x, top: position.y }}
        onPointerEnter={handlePointer}
        onPointerDown={handlePointer}
        onClick={handlePointer}
        onTouchStart={handlePointer}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, -4, 4, 0],
        }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 400, damping: 12 }}
        key={animKey}
      >
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          NO ❌
        </motion.span>
      </motion.button>
    </>,
    document.body,
  )
}
