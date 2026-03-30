# Inner Circle Winners: Design System v1.0

**Core Philosophy**: Premium. Powerful. Accessible.
The design system is engineered to communicate authority and urgency while maintaining a clean, high-end aesthetic that builds trust.

---

## 1. Color Palette

### Primary (Energetic & Conversion-Focused)
*   **Winner Orange**: `#F97316` (Tailwind `orange-500`)
    *   *Usage*: Primary CTAs, key accents, success states.
*   **Winner Orange Hover**: `#EA580C` (Tailwind `orange-600`)
*   **Winner Orange Muted**: `rgba(249, 115, 22, 0.1)`

### Secondary (Trust & Authority)
*   **Authority Navy**: `#1E1B4B` (Tailwind `indigo-950`)
    *   *Usage*: Dark backgrounds, secondary buttons, deep accents.
*   **Authority Indigo**: `#4F46E5` (Tailwind `indigo-600`)

### Neutrals (Modern & Clean)
*   **Ink**: `#09090B` (Tailwind `zinc-950`) - Primary background.
*   **Coal**: `#18181B` (Tailwind `zinc-900`) - Card backgrounds.
*   **Steel**: `#71717A` (Tailwind `zinc-500`) - Secondary text.
*   **Paper**: `#F4F4F5` (Tailwind `zinc-100`) - Primary text.

### States
*   **Success**: `#22C55E` (Green-500)
*   **Error**: `#EF4444` (Red-500)
*   **Warning**: `#F59E0B` (Amber-500)
*   **Focus**: `0 0 0 2px #F97316` (2px Orange Ring)

---

## 2. Typography

**Primary Font Family**: `Inter` (Sans-serif)
**Alternative Display**: `Space Grotesk` (for a more technical/premium feel)

### Type Scale (8pt System)
| Level | Size | Line Height | Weight | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 112px (7rem) | 0.85 | 900 (Black) | -0.04em | Hero Headings (Italic) |
| **H1** | 72px (4.5rem) | 0.9 | 900 (Black) | -0.02em | Section Headers |
| **H2** | 48px (3rem) | 1.0 | 800 (ExtraBold) | -0.02em | Sub-headers |
| **H3** | 32px (2rem) | 1.1 | 700 (Bold) | -0.01em | Card Titles |
| **Body L** | 18px (1.125rem) | 1.6 | 400 (Regular) | 0 | Intro Paragraphs |
| **Body M** | 16px (1rem) | 1.5 | 400 (Regular) | 0 | Standard Copy |
| **Micro** | 10px (0.625rem) | 1.0 | 700 (Bold) | 0.2em | Labels (Uppercase) |

---

## 3. Spacing Scale (8pt System)

| Name | Value | Usage |
| :--- | :--- | :--- |
| **xs** | 4px | Tight icon/text spacing |
| **sm** | 8px | Internal component padding |
| **md** | 16px | Standard gap between elements |
| **lg** | 24px | Card padding, small section gaps |
| **xl** | 32px | Large card padding, container gutters |
| **2xl** | 48px | Mobile section padding |
| **3xl** | 64px | Tablet section padding |
| **4xl** | 96px | Desktop section padding |
| **5xl** | 128px | Hero/Large section padding |

---

## 4. Component Library Specs

### Buttons
*   **Primary**: Background `#F97316`, Text `#FFFFFF`, Rounded `9999px` (Full).
    *   *Hover*: Background `#EA580C`, Scale `1.05`.
    *   *Active*: Scale `0.95`.
    *   *Disabled*: Opacity `0.5`, Cursor `not-allowed`.
*   **Secondary**: Background `transparent`, Border `1px solid #27272A`, Text `#FFFFFF`.
*   **Ghost**: Background `transparent`, Text `#71717A`, Hover Text `#FFFFFF`.

### Cards
*   **Radius**: `32px` or `40px` (Oversized for premium feel).
*   **Background**: `zinc-900/40` with `backdrop-blur-md`.
*   **Border**: `1px solid rgba(255, 255, 255, 0.05)`.
*   **Shadow**: `0 20px 40px rgba(0, 0, 0, 0.4)`.

### Form Inputs
*   **Height**: `56px` (Touch-friendly).
*   **Background**: `#09090B`.
*   **Border**: `1px solid #27272A`.
*   **Focus**: Border `#F97316`, Ring `2px orange-500/20`.

---

## 5. Accessibility Specs (WCAG 2.1 AA)

*   **Contrast**: All text must maintain a minimum contrast ratio of **4.5:1** against its background.
    *   *Note*: Orange-500 on Zinc-950 is ~5.1:1 (Pass).
*   **Tap Targets**: Minimum `48x48px` for all interactive elements on mobile.
*   **Focus States**: Visible focus rings on all keyboard-navigable elements.
*   **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, and `aria-label` for icons.
