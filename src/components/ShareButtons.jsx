import { useEffect, useRef, useState } from 'react'
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react'

const canNativeShare =
  typeof navigator !== 'undefined' && typeof navigator.share === 'function'

// Fallback for browsers/contexts where navigator.clipboard isn't available
function legacyCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  let success = false
  try {
    success = document.execCommand('copy')
  } catch {
    success = false
  }
  document.body.removeChild(textarea)
  return success
}

export default function ShareButtons({ name }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  // Clear the timer if the component unmounts
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const getUrl = () => window.location.href

  const handleCopy = async () => {
    const url = getUrl()
    let success = false

    try {
      await navigator.clipboard.writeText(url)
      success = true
    } catch {
      success = legacyCopy(url)
    }

    if (success) {
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleWhatsApp = () => {
    const message = `🎂 I created a special birthday wish for you! 🎉\nOpen your birthday wish here:\n${getUrl()}`
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: `Happy Birthday ${name} 🎂`,
        text: '🎂 I created a special birthday wish for you! 🎉',
        url: getUrl(),
      })
    } catch {
      // User closed the share sheet, nothing to do
    }
  }

  return (
    <section className="share" aria-labelledby="share-heading">
      <h2 id="share-heading" className="share__title">
        Share this wish
      </h2>

      <div className="share__buttons">
        <button
          type="button"
          className={`btn btn--glass ${copied ? 'btn--success' : ''}`}
          onClick={handleCopy}
        >
          {copied ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
          {copied ? 'Link Copied! ✓' : 'Copy Link'}
        </button>

        <button type="button" className="btn btn--whatsapp" onClick={handleWhatsApp}>
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </button>

        {canNativeShare && (
          <button type="button" className="btn btn--glass" onClick={handleNativeShare}>
            <Share2 size={18} aria-hidden="true" />
            Share
          </button>
        )}
      </div>

      {/* Announces the copy result to screen readers */}
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </p>
    </section>
  )
}