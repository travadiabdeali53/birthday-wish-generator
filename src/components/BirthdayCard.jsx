export default function BirthdayCard({ name, age }) {
  const hasAge = typeof age === 'number'

  return (
    <article className="birthday-card">
      <div className="birthday-card__glow" aria-hidden="true" />

      <h1 className="birthday-card__title">
        HAPPY BIRTHDAY <span aria-hidden="true">🎉</span>
      </h1>

      <p className="birthday-card__name">{name}</p>

      {hasAge && (
        <p className="birthday-card__age">
          <span aria-hidden="true">🎂</span> {age} {age === 1 ? 'Year' : 'Years'}{' '}
          <span aria-hidden="true">🎂</span>
        </p>
      )}

      <div className="birthday-card__divider" aria-hidden="true">
        <span>✨</span>
      </div>

      <blockquote className="birthday-card__message">
        <p>Wishing you a very Happy Birthday!</p>
        <p>
          May your day be filled with happiness, laughter, love, and
          unforgettable memories.
        </p>
      </blockquote>
    </article>
  )
}