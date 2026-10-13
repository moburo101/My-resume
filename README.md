# React + Vite

## Contact form and Brevo

Requires Node.js 22.9+ (or Node.js 24). No additional application packages are needed.

1. Copy `.env.example` to `.env` and configure the server-only values:
   - `BREVO_API_KEY`: your Brevo API key, never a `VITE_` variable.
   - `BREVO_SENDER_EMAIL`: a sender verified in Brevo.
   - `CONTACT_TO_EMAIL`: your inbox for contact enquiries.
   - `CONTACT_ALLOWED_ORIGIN`: the exact frontend origin, such as `http://localhost:5173` locally or your production HTTPS origin.
2. Run `npm run dev:server` in one terminal and `npm run dev` in another. Vite proxies `/api` to port 3001. Keep the Vite URL consistent with the configured origin.
3. For production, run `npm run build`, set the production environment values, then `npm start`. The Node server serves both the built site (including `/projects`) and `/api/contact`. A static-only deployment will need a separately deployed API and an `/api` proxy.
4. Run `npm run test:contact` for mocked delivery and validation tests. Real email delivery requires configured credentials and an enabled Brevo transactional-email account.

The browser and server share validation rules. Spam controls include a honeypot, an origin check, payload limits, and five submission attempts per IP per fifteen minutes. Rate limits are in memory, reset on server restart, and are local to one server instance. Forwarded IP headers are deliberately not trusted; deployments behind a proxy may share a rate limit until trusted-proxy handling is configured. For multiple instances, use a shared rate-limit store.

The application does not persist submissions or log their contents. Brevo and your receiving mailbox process and retain the delivered email under their own settings. The form shows success only after Brevo returns an accepted-message ID; that does not guarantee inbox delivery. Check Brevo's delivery logs when verifying live delivery.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
