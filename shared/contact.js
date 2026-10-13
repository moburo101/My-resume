export const contactLimits = { name: 100, email: 254, subject: 150, message: 5000 }

export function validateContact(input) {
  const values = {}
  const errors = {}
  for (const field of Object.keys(contactLimits)) {
    values[field] = typeof input?.[field] === 'string' ? input[field].trim() : ''
    if (!values[field]) errors[field] = `Please enter your ${field}.`
    else if (values[field].length > contactLimits[field]) errors[field] = `Use at most ${contactLimits[field]} characters.`
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  for (const field of ['name', 'email', 'subject']) {
    const hasControlCharacter = [...values[field]].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
    if (hasControlCharacter) errors[field] = 'Use a single line without control characters.'
  }
  if (values.message && values.message.length < 10) errors.message = 'Please write at least 10 characters.'
  return { values, errors }
}
