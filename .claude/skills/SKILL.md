# Frontend Design Skill - Stanley Bank Edition

This skill guides Claude in creating high-end, agency-grade user interfaces for Stanley Bank.

## 🎨 Design Principles
- **Color Palette:**
  - Primary: Cobalt Blue (`--color-primary`)
  - Secondary: Bright Blue (`--color-secondary`)
  - Accent: Ice Blue/White (`--color-accent`)
- **Typography:**
  - Use a strict type scale (e.g., 1.25x ratio).
  - Headings: Bold, tight tracking, high contrast.
  - Body: Accessible, generous line-height (1.6).
- **Spacing:** 
  - Follow a strict 8px base grid (4, 8, 16, 24, 32, 48, 64).
  - Consistent padding/margin across all components.

## ⚡ Animation Standards
- **Library:** Framer Motion.
- **Patterns:**
  - Scroll Reveals: Elements fade in and slide up as they enter the viewport.
  - Staggered Lists: Grid items appear one by one with a 0.1s delay.
  - Smooth Hovers: Buttons and cards should scale slightly (1.02x) and shift shadow.
  - Page Transitions: Smooth fades between views.

## 🧱 Component Guidelines
- **Buttons:** Rounded-xl, high shadow on primary, subtle border on secondary.
- **Cards:** White background (dark: slate-900), subtle border, hover state increases border-color to primary.
- **Inputs:** Soft rounded corners, clear focus rings using the primary blue.

## 🚫 Anti-Patterns
- No generic Tailwind defaults (e.g., avoid `bg-blue-500` without a design token).
- No random font sizes.
- No static, lifeless sections. Everything must have a motion entrance.
