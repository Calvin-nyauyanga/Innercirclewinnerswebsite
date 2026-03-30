# Inner Circle Winners: Technical Architecture

**Goal**: Build a high-performance, scalable, and secure platform optimized for conversion and growth.

---

## 1. Technology Stack

| Layer | Recommendation | Why? |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (App Router)** | Best-in-class SEO, SSR/ISR for performance, and React ecosystem. |
| **Styling** | **Tailwind CSS** | Rapid development, utility-first, and zero runtime CSS overhead. |
| **Hosting** | **Vercel / Cloud Run** | Edge deployment for <1.5s load times and global scalability. |
| **Database** | **Firebase (Firestore)** | Real-time sync, serverless, and native Google Cloud integration. |
| **Auth** | **Firebase Auth** | Secure, multi-provider support, and seamless Firestore integration. |
| **CMS** | **Sanity.io** | Headless, real-time editing, and structured content for A/B testing. |
| **Analytics** | **GA4 + PostHog** | GA4 for traffic; PostHog for session recording and feature flags. |
| **Email** | **Resend** | Modern developer experience, high deliverability, and clean API. |

---

## 2. CI/CD Pipeline Spec

1.  **Source Control**: GitHub (Main branch protected).
2.  **Lint & Test**: `npm run lint` and `npm test` (Vitest) on every PR.
3.  **Preview**: Vercel Preview Deployments for every branch.
4.  **Build**: `npm run build` (Static Generation where possible).
5.  **Deploy**: Automatic deployment to Production on merge to `main`.
6.  **Smoke Test**: Automated Playwright tests post-deployment to verify core funnel.

---

## 3. Performance Budget

| Asset Type | Max Size (Gzip) | Target Metric |
| :--- | :--- | :--- |
| **JavaScript** | < 120 KB | TBT < 100ms |
| **CSS** | < 30 KB | CLS < 0.1 |
| **Fonts** | < 50 KB | No layout shift (swap) |
| **Images** | < 200 KB / section | LCP < 2.5s |
| **Total Page** | < 1.5 MB | Load Time < 1.5s (4G) |

---

## 4. Security & Monitoring

### Security Checklist
- [ ] **SSL/TLS**: Enforce HTTPS only.
- [ ] **CSP**: Strict Content Security Policy to prevent XSS.
- [ ] **CORS**: Restricted to specific domains.
- [ ] **Auth**: JWT-based session management via Firebase.
- [ ] **Validation**: Zod for schema validation on all API endpoints.

### Monitoring Setup
*   **Error Tracking**: **Sentry** for frontend/backend exception monitoring.
*   **Uptime**: **Better Stack** for 1-minute interval heartbeat checks.
*   **Performance**: **Vercel Speed Insights** for real-user Core Web Vitals.
*   **Alerting**: Slack notifications for 5xx errors or performance regressions.
