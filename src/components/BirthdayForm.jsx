import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gift } from 'lucide-react'
import {
  MAX_AGE,
  MAX_NAME_LENGTH,
  MIN_AGE,
  buildWishPath,
  cleanName,
  parseAge,
} from '../utils/params'

export default function BirthdayForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [errors, setErrors] = useState({})

  const handleNameChange = (event) => {
    setName(event.target.value)
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
  }

  // Keep only digits and allow at most 3 characters
  const handleAgeChange = (event) => {
    setAge(event.target.value.replace(/\D/g, '').slice(0, 3))
    if (errors.age) setErrors((prev) => ({ ...prev, age: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanedName = cleanName(name)
    const hasAge = age.trim() !== ''
    const parsedAge = hasAge ? parseAge(age) : null
    const nextErrors = {}

    if (!cleanedName) {
      nextErrors.name = "Please enter the birthday person's name."
    }
    if (hasAge && parsedAge === null) {
      nextErrors.age = `Please enter a valid age between ${MIN_AGE} and ${MAX_AGE}.`
    }

    if (nextErrors.name || nextErrors.age) {
      setErrors(nextErrors)
      return
    }

    navigate(buildWishPath(cleanedName, parsedAge))
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name" className="field__label">
          Birthday person's name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="field__input"
          placeholder="Enter their name"
          value={name}
          onChange={handleNameChange}
          maxLength={MAX_NAME_LENGTH}
          autoComplete="off"
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="field__error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="age" className="field__label">
          Age <span className="field__optional">(optional)</span>
        </label>
        <input
          id="age"
          name="age"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="field__input"
          placeholder="Age (optional)"
          value={age}
          onChange={handleAgeChange}
          autoComplete="off"
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && (
          <p id="age-error" className="field__error" role="alert">
            {errors.age}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn--primary btn--full">
        <Gift size={20} aria-hidden="true" />
        Create Birthday Wish 🎉
      </button>
    </form>
  )
}