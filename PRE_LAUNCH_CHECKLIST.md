# Inner Circle Winners: Pre-Launch Checklist

This document outlines the final verification steps required before the official launch of the Inner Circle Winners homepage and vertical landing pages.

---

## 1. Functionality Testing
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **CTA Redirection** | Click every button (Hero, Nav, Footer, Verticals). | All links lead to the correct destination (Signup Modal or Subpage). | [ ] |
| **Form Submission** | Submit the Trial Signup form with valid/invalid data. | Valid data triggers success state; invalid data shows validation errors. | [ ] |
| **Email Confirmation** | Perform a test signup using a real email address. | Confirmation email is received within 2 minutes with correct branding. | [ ] |
| **Subpage Links** | Navigate to `/commerce`, `/agencies`, and `/saas`. | Pages load correctly with vertical-specific content and no 404s. | [ ] |
| **Payment Gateway** | (If applicable) Perform a test transaction in Sandbox mode. | Transaction completes; user is redirected to success page. | [ ] |
| **Mobile Responsiveness** | Test on Chrome DevTools (iPhone, Pixel, iPad) + physical devices. | Layout remains intact; touch targets are ≥44px; no horizontal scrolling. | [ ] |
| **Cross-Browser** | Open site in Chrome, Firefox, Safari, Edge. | Visuals and functionality are consistent across all engines. | [ ] |

---

## 2. Performance Testing
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **Lighthouse Score** | Run Chrome Lighthouse audit in Incognito mode. | Performance score >90; LCP < 1.5s; CLS < 0.1. | [ ] |
| **Core Web Vitals** | Check PageSpeed Insights for real-world data. | All metrics (LCP, FID, CLS) are in the "Green" zone. | [ ] |
| **Image Optimization** | Inspect network tab for image formats and sizes. | Images are WebP/AVIF; lazy-loading is active for below-fold assets. | [ ] |
| **Minification** | Check source code in production build. | CSS and JS bundles are minified and compressed (Gzip/Brotli). | [ ] |
| **CDN Config** | Verify assets are served from the edge (e.g., Cloudflare/Vercel). | `x-cache` header shows HIT; latency is <50ms for static assets. | [ ] |

---

## 3. SEO & Indexing
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **Title Tags** | Inspect `<title>` in `<head>`. | Unique, keyword-rich, and <60 characters. | [ ] |
| **Meta Description** | Inspect `<meta name="description">`. | Compelling CTA included; <160 characters. | [ ] |
| **H1 Tag** | Search for `<h1>` in source code. | Exactly one `<h1>` per page, containing primary keyword. | [ ] |
| **Schema Markup** | Run Google Rich Results Test. | Organization and Product schema detected with zero errors. | [ ] |
| **Sitemap.xml** | Visit `/sitemap.xml`. | All live URLs included; submitted to Google Search Console. | [ ] |
| **Robots.txt** | Visit `/robots.txt`. | Search engines allowed to crawl; sitemap URL linked. | [ ] |
| **Canonical Tags** | Inspect `<link rel="canonical">`. | Prevents duplicate content issues by pointing to the primary URL. | [ ] |

---

## 4. Accessibility (A11y)
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **Alt Text** | Inspect all `<img>` tags. | Meaningful descriptions present; decorative images have `alt=""`. | [ ] |
| **Color Contrast** | Use a contrast checker (e.g., Axe or WAVE). | Text-to-background ratio is ≥4.5:1 (WCAG AA). | [ ] |
| **Form Labels** | Check `<label>` for every `<input>`. | Labels are explicitly linked via `for`/`id` attributes. | [ ] |
| **Keyboard Nav** | Tab through the entire page without a mouse. | Focus indicators are visible; all interactive elements reachable. | [ ] |
| **Screen Reader** | Test with VoiceOver (Mac) or NVDA (Windows). | Content hierarchy is logical; interactive elements announced correctly. | [ ] |

---

## 5. Analytics & Tracking
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **GA4 Pixel** | Check Google Tag Assistant or Real-Time report. | Page views and user sessions are recording correctly. | [ ] |
| **Conversion Events** | Trigger a signup and check DebugView in GA4. | `generate_lead` or `sign_up` events fire with correct parameters. | [ ] |
| **UTM Parameters** | Visit site with `?utm_source=test`. | Source/Medium correctly captured in analytics session. | [ ] |
| **Heatmaps** | Log into Hotjar/Microsoft Clarity. | Click and scroll data is populating for the homepage. | [ ] |

---

## 6. Security
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **SSL (HTTPS)** | Check browser address bar for lock icon. | Site is served over HTTPS; HTTP redirects to HTTPS. | [ ] |
| **CSP Headers** | Check security headers via `securityheaders.com`. | Content Security Policy is active and blocking unauthorized scripts. | [ ] |
| **Input Validation** | Attempt XSS/SQL injection in signup form. | All inputs are sanitized; no scripts executed. | [ ] |
| **Rate Limiting** | Spam the signup API endpoint. | API returns 429 (Too Many Requests) after threshold. | [ ] |

---

## 7. Compliance
| Item | Test Procedure | Success Criteria | Status |
| :--- | :--- | :--- | :--- |
| **Privacy Policy** | Locate link in footer. | Leads to a valid, up-to-date Privacy Policy page. | [ ] |
| **Cookie Banner** | Visit from an EU IP (or use VPN). | Banner appears; cookies only set after consent (GDPR). | [ ] |
| **Terms of Service** | Locate link in footer. | Leads to a valid Terms of Service page. | [ ] |
| **GDPR Opt-in** | Check signup form for checkbox. | Explicit consent checkbox present for marketing emails. | [ ] |

---

## Final Sign-Off

| Role | Name | Date | Signature |
| :--- | :--- | :--- | :--- |
| **Product Manager** | | | |
| **Lead Developer** | | | |
| **QA Engineer** | | | |
| **Marketing Lead** | | | |
