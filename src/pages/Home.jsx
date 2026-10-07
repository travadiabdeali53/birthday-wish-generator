import { useEffect } from 'react'
import BirthdayForm from '../components/BirthdayForm'
import Confetti from '../components/Confetti'

export default function Home() {
  useEffect(() => {
    document.title = 'Birthday Wish Generator 🎂 | Create a Personalized Birthday Wish'
  }, [])

  return (
    <>
      <Confetti pieces={24} floaters={8} />
      <main className="page">
        <section className="hero">
          <p className="hero__eyebrow">Birthday Wish Generator</p>
          <h1 className="hero__title">
            Create a Special <span className="hero__highlight">Birthday Wish</span>{' '}
            <span aria-hidden="true">🎂</span>
          </h1>
          <p className="hero__text">
            Make a personalized birthday page in seconds and share it with
            someone special. No sign-up needed, just a name and a link.
          </p>
        </section>

        <BirthdayForm />
      </main>
    </>
  )
}