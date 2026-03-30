# Inner Circle Winners: API Integration & Data Flow Guide

**Goal**: Design a secure, scalable, and automated data pipeline for the signup and trial funnel.

---

## 1. Data Flow Architecture

1.  **Awareness**: User lands on homepage (GA4 `page_view` event).
2.  **Engagement**: User interacts with ROI calculator or clicks a CTA (GA4 `cta_click` or `roi_calc_use`).
3.  **Intent**: User opens signup modal and enters email/password.
4.  **Submission**:
    *   Client-side validation (Zod).
    *   `POST /api/trials` called.
5.  **Backend Processing**:
    *   Create user in Firebase Auth.
    *   Initialize user document in Firestore (`users` collection).
    *   Trigger `welcome_email` via Resend.
    *   Sync lead data to HubSpot CRM via Zapier Webhook.
6.  **Success**: User redirected to onboarding dashboard.

---

## 2. API Endpoint Specification

### `POST /api/trials`
*   **Description**: Creates a new trial account and initializes the user environment.
*   **Auth**: None (Public).
*   **Payload**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123",
      "name": "John Doe",
      "trafficSource": "cold",
      "utmParams": {
        "source": "google",
        "medium": "cpc",
        "campaign": "winners_launch"
      }
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "userId": "firebase_uid_123",
      "trialEndsAt": "2026-04-13T08:55:13Z",
      "status": "active"
    }
    ```

### `POST /api/leads`
*   **Description**: Captures lead data from non-signup forms (e.g., ROI calculator results).
*   **Payload**:
    ```json
    {
      "email": "lead@example.com",
      "calculatorResult": {
        "lift": 12000,
        "annual": 144000
      }
    }
    ```

---

## 3. Database Schema (Firestore)

### `users` (Collection)
*   `uid`: string (Primary Key)
*   `email`: string
*   `displayName`: string
*   `role`: enum ("admin", "user", "agency")
*   `createdAt`: timestamp
*   `trialEndsAt`: timestamp
*   `status`: enum ("trial", "active", "cancelled", "past_due")
*   `stripeCustomerId`: string (optional)

### `signups` (Collection)
*   `id`: string
*   `email`: string
*   `trafficSource`: string
*   `utmSource`: string
*   `convertedAt`: timestamp

---

## 4. Automation & Webhooks

### Zapier Recipes
1.  **New Trial -> CRM**: Trigger on `POST /api/trials` success -> Create/Update Contact in HubSpot.
2.  **Trial Expiration -> Slack**: Trigger 2 days before `trialEndsAt` -> Notify Sales Team in Slack.
3.  **Payment Success -> Email**: Trigger on Stripe Webhook -> Send "Winner's Receipt" via Resend.

### Webhook Endpoints
*   `POST /api/webhooks/stripe`: Handles `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`.
*   `POST /api/webhooks/resend`: Tracks email opens and click-through rates for onboarding sequences.

---

## 5. Security & Compliance (GDPR)

### PII Handling
*   **Encryption**: All sensitive data (emails, names) encrypted at rest using AES-256 (handled by Google Cloud).
*   **Masking**: Emails and PII are masked in server logs (e.g., `u***r@example.com`).
*   **Access Control**: Least-privilege access via Firebase Security Rules.

### Data Retention Policy
*   **Active Users**: Retained indefinitely while account is active.
*   **Expired Trials**: Automatically deleted after 90 days of inactivity unless user opts-in to newsletter.
*   **Deletion Requests**: "Right to be Forgotten" handled via `DELETE /api/user/me` which wipes Firestore and Auth records.
