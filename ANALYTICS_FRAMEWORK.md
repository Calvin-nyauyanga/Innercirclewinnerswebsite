# Inner Circle Winners: Analytics Tracking Framework

**Goal**: Transform raw user data into actionable growth insights through a robust GA4-centric tracking architecture.

---

## 1. Event Tracking Specification

| Event Name | Category | Trigger | Parameters |
| :--- | :--- | :--- | :--- |
| `cta_click` | Engagement | Click on any primary/secondary CTA | `cta_location`, `cta_text`, `traffic_source` |
| `form_start` | Conversion | First interaction with a form field | `form_id`, `form_name` |
| `form_complete` | Conversion | Successful form submission | `form_id`, `lead_type`, `conversion_value` |
| `scroll_depth` | Engagement | Reaching 25%, 50%, 75%, 90% depth | `percent_scrolled`, `page_path` |
| `roi_calc_use` | Engagement | Adjusting any slider in ROI calculator | `traffic_val`, `cr_val`, `lift_val` |
| `exit_intent_show` | Retention | Modal triggered by mouse leave | `trigger_time`, `page_path` |
| `pricing_toggle` | Engagement | Switching between Monthly/Yearly | `selected_cycle` |
| `faq_expand` | Engagement | Clicking to expand an FAQ item | `question_text` |

---

## 2. GA4 Setup Guide

### Core Conversions
1.  **Trial Signup**: `form_complete` where `form_id == 'trial_signup'`.
2.  **Demo Request**: `form_complete` where `form_id == 'demo_request'`.
3.  **Newsletter Opt-in**: `form_complete` where `form_id == 'newsletter'`.

### Custom Dimensions
*   `visitor_segment`: (e.g., "Entrepreneur", "Agency", "E-com") based on pricing card clicks or form data.
*   `ab_test_variant`: The specific variant ID the user is currently seeing.
*   `traffic_intent`: Derived from UTM parameters (e.g., "Educational", "Transactional").

---

## 3. Dashboard Mock-ups (Structure)

### Overview Dashboard (Executive View)
*   **KPIs**: Total Sessions, Conversion Rate (CR), Total Trials, CAC (Customer Acquisition Cost).
*   **Trend Line**: Daily Trials vs. Ad Spend.
*   **Pie Chart**: Traffic Source Distribution (Organic vs. Paid vs. Referral).

### Conversion Funnel (User Journey)
1.  **Landing**: Home Page View.
2.  **Engagement**: Clicked "Start Building" or "See Pricing".
3.  **Intent**: Form Field Focus.
4.  **Success**: Trial Signup Confirmed.

---

## 4. Weekly Reporting Template

| Metric | Last Week | This Week | % Change | Insight/Action |
| :--- | :--- | :--- | :--- | :--- |
| **Sessions** | 12,400 | 14,200 | +14.5% | Paid search scaling successful. |
| **Trial CR** | 3.2% | 3.8% | +18.7% | Headline A/B test (W1) winner implemented. |
| **CAC** | $42.50 | $38.20 | -10.1% | Improved landing page relevance score. |
| **LTV (Proj)** | $450 | $465 | +3.3% | Higher mix of "Agency Pro" signups. |

---

## 5. Attribution & A/B Testing

### Attribution Model
*   **Recommended**: Data-Driven Attribution (DDA) in GA4.
*   **Secondary**: First-Click (to understand awareness) and Last-Click (to understand closing).

### A/B Test Tracking
*   **Implementation**: Use `window.gtag('event', 'experiment_view', { experiment_id: 'H1_TEST', variant_id: 'VARIANT_B' });`
*   **Significance**: Target 95% confidence using a Bayesian calculator before declaring winners.
