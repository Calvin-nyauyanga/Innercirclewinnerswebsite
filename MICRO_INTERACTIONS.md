# Inner Circle Winners: Micro-Interaction Library

**Goal**: Enhance conversion through subtle, purposeful motion that guides attention and provides instant feedback.

---

## 1. Animation Principles
*   **Purposeful**: Every movement must serve a goal (e.g., "Click here," "Success," "Keep reading").
*   **Performance-First**: Use `transform` (scale, translate) and `opacity` to leverage GPU acceleration. Avoid animating `width`, `height`, or `top/left`.
*   **Natural Easing**: Use `[0.23, 1, 0.32, 1]` (Ease Out Quint) for a premium, snappy feel.
*   **Accessibility**: Respect `prefers-reduced-motion` by disabling non-essential transitions.

---

## 2. Interaction Specs

### 1. CTA Buttons (The "Magnet" Effect)
*   **Trigger**: Hover / Focus
*   **Action**: Scale `1.05`, slight brightness increase, and icon translation.
*   **Spec**: `duration: 0.3s`, `easing: easeOutQuint`.
*   **Code Hint**: `whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}`.
*   **Video Description**: Button grows slightly while the arrow icon nudges 4px to the right, creating a "pull" toward the click.

### 2. Form Submission (The "Success Loop")
*   **Trigger**: Submit click
*   **Action**: Button text fades -> Spinner appears -> Checkmark draws in SVG path.
*   **Spec**: `duration: 0.5s` for transition, `0.8s` for checkmark draw.
*   **Code Hint**: Use `AnimatePresence` for state switching.
*   **Video Description**: A seamless transition from a "Start Free" label to a rotating loader, ending with a satisfying green checkmark that "pops" into place.

### 3. Scroll Reveals (The "Unfolding" Experience)
*   **Trigger**: Element enters 20% of viewport.
*   **Action**: `opacity: 0 -> 1`, `y: 20 -> 0`.
*   **Spec**: `duration: 0.6s`, `staggerChildren: 0.1s`.
*   **Code Hint**: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}`.
*   **Video Description**: Sections slide up gently as the user scrolls, creating a sense of discovery rather than a static page load.

### 4. Feature Cards (The "Interactive Lift")
*   **Trigger**: Hover
*   **Action**: `y: -8`, `shadow: 0 20px 40px rgba(0,0,0,0.2)`, Border color shift.
*   **Spec**: `duration: 0.4s`.
*   **Video Description**: The card appears to lift off the page, with a subtle glow appearing behind it, signaling that the entire card is a clickable portal.

### 5. Product Demo (The "Attention Pulse")
*   **Trigger**: Continuous Loop
*   **Action**: Subtle scale pulse `1 -> 1.02` and outer glow expansion.
*   **Spec**: `duration: 2s`, `repeat: Infinity`, `repeatType: "reverse"`.
*   **Video Description**: The main product UI has a soft, rhythmic "heartbeat" that draws the eye without being distracting.

---

## 3. Performance & Accessibility

### GPU Acceleration Strategy
*   **Layer Promotion**: Use `will-change: transform, opacity` for complex animated elements.
*   **Hardware Rendering**: Ensure all animations are handled by the compositor thread.

### Graceful Degradation
*   **Fail-safe**: If JS fails or Framer Motion doesn't load, all elements remain visible and functional in their final state (`opacity: 1`, `scale: 1`).
*   **Reduced Motion**:
    ```css
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```

---

## 4. Implementation Checklist
- [ ] Use `motion.div` instead of standard `div` for animated containers.
- [ ] Implement `AnimatePresence` for all conditional UI (modals, menus).
- [ ] Use `staggerChildren` for list items (Testimonials, Features).
- [ ] Ensure all hover states have a corresponding `focus-visible` state for keyboard users.
