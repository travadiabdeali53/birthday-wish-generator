import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PartyPopper, Plus } from 'lucide-react'
import BirthdayCard from '../components/BirthdayCard'
import Confetti from '../components/Confetti'
import ShareButtons from '../components/ShareButtons'
import { readWishParams } from '../utils/params'

export default function BirthdayWish() {
  const [searchParams] = useSearchParams()
  const { name, age } = useMemo(() => readWishParams(searchParams), [searchParams])
  const hasName = name !== ''

  // Dynamic tab title, e.g. "Happy Birthday Rahul Sharma 🎂"
  useEffect(() => {
    document.title = hasName
      ? `Happy Birthday ${name} 🎂`
      : 'Birthday Wish Generator 🎂'
  }, [hasName, name])

  if (!hasName) {
    return (
      <main className="page">
        <section className="notfound">
          <PartyPopper size={44} aria-hidden="true" />
          <h1 className="notfound__title">Oops!</h1>
          <p className="notfound__text">
            We couldn't find the birthday person's name.
          </p>
          <Link to="/" className="btn btn--primary">
            Create a Birthday Wish
          </Link>
        </section>
      </main>
    )
  }

  return (
    <>
      <Confetti />
      <main className="page page--wish">
        <BirthdayCard name={name} age={age} />
        <ShareButtons name={name} />
        <Link to="/" className="btn btn--ghost">
          <Plus size={18} aria-hidden="true" />
          Create another birthday wish
        </Link>
      </main>
    </>
  )
}