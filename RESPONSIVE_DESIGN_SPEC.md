# Inner Circle Winners: Responsive Design Spec & Performance Checklist

**Goal**: Deliver a seamless, high-performance experience across all devices while maintaining the "Premium. Powerful. Accessible." brand identity.

---

## 1. Breakpoints & Grid System

| Breakpoint | Range | Columns | Gutter | Margin |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | 320px – 480px | 4 | 16px | 16px |
| **Tablet** | 481px – 768px | 8 | 24px | 32px |
| **Desktop** | 769px – 1440px | 12 | 24px | Auto (max-width: 1280px) |
| **Large** | 1441px+ | 12 | 32px | Auto (max-width: 1440px) |

---

## 2. Section-Specific Layouts

### Hero Section
*   **Mobile**: Stacked vertically. Headline first, followed by subheadline, then CTAs (full-width). Visual element below CTAs.
*   **Tablet**: 2-column grid. Left: Headline + Subheadline + CTAs. Right: Visual element (scaled).
*   **Desktop**: 12-column split. 7 columns for text/CTAs, 5 columns for the interactive visual.

### Features (What We Deliver)
*   **Mobile**: Single column stack. Cards take full width minus margins.
*   **Tablet**: 2-column grid.
*   **Desktop**: 3-column grid.

### Proof (Testimonials & Logos)
*   **Mobile**: Single column for testimonials. Logo marquee (horizontal scroll).
*   **Tablet**: 2-column grid for testimonials.
*   **Desktop**: 4-column grid for testimonials.

### Pricing
*   **Mobile**: Vertical stack. "Most Popular" card highlighted with slightly larger scale or border.
*   **Tablet**: 2-column grid (Solo + Agency), E-com Team stacks below.
*   **Desktop**: 3-column horizontal layout.

---

## 3. Touch-Friendly Specs
*   **Minimum Tap Target**: 48x48px for all buttons, links, and form elements.
*   **Spacing**: Minimum 16px between interactive elements to prevent accidental clicks.
*   **Gestures**: Support horizontal swiping for the logo marquee and testimonial sliders on mobile.

---

## 4. Image & Asset Optimization
*   **Formats**: Use **WebP** for all photographic content. Use **SVG** for icons and logos.
*   **Responsive Images**: Use `srcset` to serve appropriate sizes (300px for mobile, 800px for tablet, 1200px+ for desktop).
*   **Lazy Loading**: Apply `loading="lazy"` to all images below the fold (Features, Proof, Pricing).
*   **Referrer Policy**: Always include `referrerPolicy="no-referrer"` for external assets.

---

## 5. Performance Budget (Target: <1.5s Load Time)

| Asset Type | Target Size (Gzipped) | Strategy |
| :--- | :--- | :--- |
| **HTML** | < 20KB | Semantic, clean structure. |
| **CSS** | < 30KB | Tailwind JIT (utility-first). |
| **JS** | < 100KB | Code splitting, minimal dependencies. |
| **Images** | < 150KB per section | WebP compression, responsive sizing. |
| **Fonts** | < 50KB | Subsetted Google Fonts (Inter, Space Grotesk). |

---

## 6. Mobile-Specific Interaction Guidelines
*   **Avoid VH/VW for Layout**: Use `%` or `rem` to avoid layout shifts caused by mobile browser chrome (address bars).
*   **Sticky Elements**: Ensure the `StickyFooter` does not overlap critical content or form fields.
*   **Modals**: Ensure the `ExitIntentModal` is easily dismissible with a large "X" button and background click.
*   **Video**: Auto-play videos must be muted and use `playsinline`.

---

## 7. Responsive Checklist
- [ ] Headline font size scales correctly (e.g., 4rem mobile -> 8rem desktop).
- [ ] All buttons are at least 48px tall.
- [ ] No horizontal scroll on mobile (320px width).
- [ ] Images have `alt` text and `loading="lazy"` where appropriate.
- [ ] Contrast ratios meet WCAG 2.1 AA (4.5:1).
- [ ] Navigation collapses into a functional hamburger menu on mobile.
