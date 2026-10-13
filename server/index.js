import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { createContactHandler } from './contact.js'

const handleContact = createContactHandler()
const distRoot = resolve('dist')
const contentTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff' }

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  response.end(JSON.stringify(body))
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost')
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return sendJson(response, 405, { error: 'Use POST to submit the form.' })
      const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || 'http://localhost:5173'
      if (request.headers.origin !== allowedOrigin) return sendJson(response, 403, { error: 'Submission origin not allowed.' })
      if (request.headers['content-type']?.split(';')[0] !== 'application/json') return sendJson(response, 415, { error: 'Use JSON for submissions.' })
      const chunks = []
      let bytes = 0
      for await (const chunk of request) {
        bytes += chunk.length
        if (bytes > 32768) return sendJson(response, 413, { error: 'Submission is too large.' })
        chunks.push(chunk)
      }
      let body
      try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return sendJson(response, 400, { error: 'Invalid JSON.' }) }
      // Use the actual socket address; forwarded headers are not trusted.
      const result = await handleContact({ body, ip: request.socket.remoteAddress })
      return sendJson(response, result.status, result.body)
    }
    if (url.pathname.startsWith('/api/')) return sendJson(response, 404, { error: 'Endpoint not found.' })
    if (!['GET', 'HEAD'].includes(request.method)) return sendJson(response, 405, { error: 'Method not allowed.' })
    const pathname = decodeURIComponent(url.pathname)
    const file = resolve(distRoot, `.${pathname}`)
    if (file !== distRoot && !file.startsWith(`${distRoot}${sep}`)) return sendJson(response, 403, { error: 'Access denied.' })
    let data
    let extension = extname(file)
    try {
      data = await readFile(file)
    } catch {
      if (!['/', '/projects', '/projects/'].includes(pathname)) return sendJson(response, 404, { error: 'Page not found.' })
      data = await readFile(resolve(distRoot, 'index.html'))
      extension = '.html'
    }
    response.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' })
    response.end(request.method === 'HEAD' ? undefined : data)
  } catch {
    sendJson(response, 500, { error: 'The server could not complete this request.' })
  }
})
server.requestTimeout = 15000
server.listen(Number(process.env.PORT || 3001), () => console.log('Portfolio server listening'))
