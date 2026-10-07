export const MAX_NAME_LENGTH = 50
export const MIN_AGE = 1
export const MAX_AGE = 120

/**
 * Cleans a name: collapses repeated spaces, trims the ends,
 * and caps the length so extreme URLs can't break the layout.
 * Always returns a string ('' if the input is unusable).
 */
export function cleanName(raw) {
  if (typeof raw !== 'string') return ''
  return raw.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_LENGTH)
}

/**
 * Parses an age. Returns a whole number between MIN_AGE and MAX_AGE,
 * or null if the value is empty, missing, or invalid.
 */
export function parseAge(raw) {
  if (raw === null || raw === undefined) return null
  const text = String(raw).trim()
  if (!/^\d{1,3}$/.test(text)) return null
  const value = Number(text)
  return value >= MIN_AGE && value <= MAX_AGE ? value : null
}

/**
 * Builds the shareable path, e.g. /wish?name=Rahul%20Sharma&age=21
 * The age parameter is added only when a valid age exists.
 */
export function buildWishPath(name, age) {
  const params = new URLSearchParams()
  params.set('name', name)
  if (age !== null && age !== undefined) {
    params.set('age', String(age))
  }
  // URLSearchParams writes spaces as "+", we use %20 for cleaner links
  return `/wish?${params.toString().replace(/\+/g, '%20')}`
}

/**
 * Reads and sanitizes the query string of the wish page.
 * `searchParams` is a URLSearchParams object (from useSearchParams).
 * Decoding is handled by URLSearchParams, and we only ever render
 * the result as plain text, never as HTML.
 */
export function readWishParams(searchParams) {
  return {
    name: cleanName(searchParams.get('name') ?? ''),
    age: parseAge(searchParams.get('age')),
  }
}