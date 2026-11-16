import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon } from './icons.jsx'

// Centered "thank you" popup with a check icon. Rendered into <body> so it
// sits above everything regardless of parent transforms/animations.
function SuccessPopup({ open, onClose, title, message }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="popup-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-popup-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <motion.span
              className="popup-check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <CheckIcon className="popup-check__icon" />
            </motion.span>
            <h3 id="success-popup-title" className="popup-title">
              {title}
            </h3>
            <p className="popup-message">{message}</p>
            <button type="button" className="popup-btn btn" onClick={onClose} autoFocus>
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default SuccessPopup
