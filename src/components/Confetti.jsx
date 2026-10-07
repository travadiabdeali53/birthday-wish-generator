import { useState } from 'react'

const COLORS = ['#f472b6', '#c084fc', '#60a5fa', '#facc15', '#34d399', '#fb7185']
const EMOJIS = ['🎈', '🎂', '🎉', '✨', '🎁', '🎈', '✨']

const rand = (min, max) => Math.random() * (max - min) + min

function createPieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      '--left': `${rand(0, 100)}%`,
      '--size': `${rand(6, 12)}px`,
      '--delay': `${rand(0, 8)}s`,
      '--duration': `${rand(4, 8)}s`,
      '--drift': `${rand(-80, 80)}px`,
      '--rotate': `${rand(0, 360)}deg`,
      '--color': COLORS[i % COLORS.length],
    },
  }))
}

function createFloaters(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    style: {
      '--left': `${Math.min(95, Math.max(2, (i / count) * 100 + rand(-4, 4)))}%`,
      '--size': `${rand(1.4, 2.6)}rem`,
      '--delay': `${rand(0, 10)}s`,
      '--duration': `${rand(7.5, 13.5)}s`,
    },
  }))
}

export default function Confetti({ pieces = 40, floaters = 10 }) {
  // Lazy initial state: the random values are generated once, not on every render
  const [confetti] = useState(() => createPieces(pieces))
  const [emojis] = useState(() => createFloaters(floaters))

  return (
    <div className="confetti" aria-hidden="true">
      {confetti.map((piece) => (
        <span key={piece.id} className="confetti__piece" style={piece.style} />
      ))}
      {emojis.map((item) => (
        <span key={item.id} className="confetti__floater" style={item.style}>
          {item.emoji}
        </span>
      ))}
    </div>
  )
}