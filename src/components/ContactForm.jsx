import { useRef, useState } from 'react'
import { contactLimits, validateContact } from '../../shared/contact.js'
import './ContactForm.css'

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
  { name: 'message', label: 'Message' },
]

function ContactForm() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  function focusError(nextErrors) {
    const firstField = fields.find((field) => nextErrors[field.name])
    if (firstField) formRef.current.elements.namedItem(firstField.name)?.focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'loading') return
    const input = Object.fromEntries(new FormData(event.currentTarget))
    const validation = validateContact(input)
    setErrors(validation.errors)
    if (Object.keys(validation.errors).length) {
      setStatus('error')
      setFeedback('Please check the highlighted fields.')
      focusError(validation.errors)
      return
    }
    setStatus('loading')
    setFeedback('Sending your message...')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validation.values, website: input.website }),
        signal: AbortSignal.timeout(15000),
      })
      const result = await response.json()
      if (!response.ok) {
        setErrors(result.errors || {})
        focusError(result.errors || {})
        throw new Error(result.error || 'Your message could not be sent. Please try again.')
      }
      setStatus('success')
      setFeedback(result.message)
      formRef.current.reset()
    } catch (error) {
      setStatus('error')
      setFeedback(error.name === 'TimeoutError' || error instanceof TypeError
        ? 'The server could not be reached. Please try again later.' : error.message)
    }
  }

  return (
    <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="contact-introduction">
        <p className="contact-eyebrow">Get in touch</p>
        <h2 id="contact-title">Let's talk.</h2>
        <p>Have a project or question in mind? Send me a message.</p>
      </div>
      <form ref={formRef} className="contact-form" noValidate onSubmit={handleSubmit} aria-busy={status === 'loading'} aria-describedby="contact-privacy">
        {fields.map((field) => {
          const attributes = {
            id: `contact-${field.name}`, name: field.name, required: true,
            maxLength: contactLimits[field.name],
            'aria-invalid': Boolean(errors[field.name]),
            'aria-describedby': errors[field.name] ? `contact-${field.name}-error` : undefined,
          }
          return (
            <div className={`contact-field contact-field-${field.name}`} key={field.name}>
              <label htmlFor={attributes.id}>{field.label} <span className="contact-required">(required)</span></label>
              {field.name === 'message' ? <textarea {...attributes} rows={6} minLength={10} /> : <input {...attributes} type={field.type} autoComplete={field.autoComplete} />}
              {errors[field.name] && <p className="contact-field-error" id={`contact-${field.name}-error`}>{errors[field.name]}</p>}
            </div>
          )
        })}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <p id="contact-privacy" className="contact-privacy">
          Your name, email, and message are used to respond to your enquiry and processed through Brevo for email delivery. They are not used to subscribe you to marketing. Please avoid sharing sensitive information.
        </p>
        <button className="contact-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : 'Send message'}</button>
        <div className={`contact-feedback contact-feedback-${status}`} role="status" aria-live="polite" aria-atomic="true">{feedback}</div>
      </form>
    </section>
  )
}

export default ContactForm
