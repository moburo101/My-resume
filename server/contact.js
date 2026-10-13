import { validateContact } from '../shared/contact.js'

export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  const attempts = new Map()
  return async function handleContact({ body, ip }) {
    const timestamp = now()
    for (const [key, value] of attempts) {
      if (value.expires <= timestamp) attempts.delete(key)
    }
    const attempt = attempts.get(ip) ?? { count: 0, expires: timestamp + 15 * 60 * 1000 }
    if (attempt.count >= 5 || (!attempts.has(ip) && attempts.size >= 10000)) {
      return { status: 429, body: { error: 'Too many attempts. Please try again in 15 minutes.' } }
    }
    attempt.count += 1
    attempts.set(ip, attempt)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { status: 400, body: { error: 'Invalid submission.' } }
    }
    // A hidden field catches simple bots; reject without sending email.
    if (typeof body.website !== 'string' || body.website.trim()) {
      return { status: 400, body: { error: 'Submission rejected. Please try again.' } }
    }
    const { values, errors } = validateContact(body)
    if (Object.keys(errors).length) return { status: 422, body: { errors, error: 'Please check the highlighted fields.' } }
    if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL || !env.CONTACT_TO_EMAIL) {
      return { status: 503, body: { error: 'Message delivery is not configured yet. Please try again later.' } }
    }
    try {
      const response = await fetchImpl('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          sender: { email: env.BREVO_SENDER_EMAIL, name: 'Portfolio contact form' },
          to: [{ email: env.CONTACT_TO_EMAIL }],
          replyTo: { email: values.email, name: values.name },
          subject: `Portfolio enquiry: ${values.subject}`,
          textContent: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
        }),
      })
      if (!response.ok) throw new Error('Delivery rejected')
      const result = await response.json()
      if (!result.messageId) throw new Error('Delivery not acknowledged')
      return { status: 200, body: { message: 'Your message was accepted for delivery. Thank you for getting in touch.' } }
    } catch {
      return { status: 502, body: { error: 'Your message could not be confirmed for delivery. Please try again later.' } }
    }
  }
}
