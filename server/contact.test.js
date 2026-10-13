import test from 'node:test'
import assert from 'node:assert/strict'
import { createContactHandler } from './contact.js'
import { validateContact } from '../shared/contact.js'

const validBody = { name: 'Test Visitor', email: 'visitor@example.com', subject: 'Project enquiry', message: 'I would like to discuss a project.', website: '' }
const env = { BREVO_API_KEY: 'test-key', BREVO_SENDER_EMAIL: 'sender@example.com', CONTACT_TO_EMAIL: 'owner@example.com' }

test('validation rejects missing values, invalid email, header injection and oversized messages', () => {
  assert.equal(Object.keys(validateContact({}).errors).length, 4)
  const result = validateContact({ ...validBody, email: 'invalid', subject: 'Subject\r\nInjected', message: 'a'.repeat(5001) })
  assert.deepEqual(Object.keys(result.errors).sort(), ['email', 'message', 'subject'])
})

test('invalid submissions and honeypots never call Brevo', async () => {
  let calls = 0
  const handler = createContactHandler({ env, fetchImpl: async () => { calls += 1 } })
  assert.equal((await handler({ body: { ...validBody, email: 'invalid' }, ip: 'one' })).status, 422)
  assert.equal((await handler({ body: { ...validBody, website: 'spam' }, ip: 'two' })).status, 400)
  assert.equal(calls, 0)
})

test('missing delivery configuration reports unavailable rather than success', async () => {
  const handler = createContactHandler({ env: {} })
  assert.equal((await handler({ body: validBody, ip: 'one' })).status, 503)
})

test('accepted message uses verified sender and visitor reply-to, not visitor sender', async () => {
  let payload
  const handler = createContactHandler({ env, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.brevo.com/v3/smtp/email')
    payload = JSON.parse(options.body)
    return { ok: true, json: async () => ({ messageId: 'mock-message' }) }
  } })
  assert.equal((await handler({ body: validBody, ip: 'one' })).status, 200)
  assert.equal(payload.sender.email, env.BREVO_SENDER_EMAIL)
  assert.equal(payload.replyTo.email, validBody.email)
  assert.equal(payload.to[0].email, env.CONTACT_TO_EMAIL)
  assert.ok(payload.textContent.includes(validBody.message))
})

test('provider failure, missing acknowledgement, and timeout do not report success', async () => {
  for (const fetchImpl of [
    async () => ({ ok: false }),
    async () => ({ ok: true, json: async () => ({}) }),
    async () => { throw new Error('Timeout') },
  ]) {
    const handler = createContactHandler({ env, fetchImpl })
    assert.equal((await handler({ body: validBody, ip: 'one' })).status, 502)
  }
})

test('rate limit blocks after five attempts and expires after fifteen minutes', async () => {
  let timestamp = 0
  const handler = createContactHandler({ env: {}, now: () => timestamp })
  for (let count = 0; count < 5; count += 1) await handler({ body: validBody, ip: 'one' })
  assert.equal((await handler({ body: validBody, ip: 'one' })).status, 429)
  assert.equal((await handler({ body: validBody, ip: 'two' })).status, 503)
  timestamp = 15 * 60 * 1000
  assert.equal((await handler({ body: validBody, ip: 'one' })).status, 503)
})
