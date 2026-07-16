---
name: Graphodo Core
colors:
  surface: '#f3fcef'
  surface-dim: '#d4ddd0'
  surface-bright: '#f3fcef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf6ea'
  surface-container: '#e8f0e4'
  surface-container-high: '#e2ebde'
  surface-container-highest: '#dce5d9'
  on-surface: '#161d16'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#2a322a'
  inverse-on-surface: '#ebf3e7'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ef9900'
  on-tertiary-container: '#5c3800'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f3fcef'
  on-background: '#161d16'
  surface-variant: '#dce5d9'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  mono:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for a high-velocity productivity environment, blending the utilitarian precision of developer tools with the refined aesthetics of premium consumer software. The brand personality is focused, efficient, and quietly powerful—prioritizing clarity of data over decorative elements.

The style is a hybrid of **Modern Minimalism** and **Functional Glassmorphism**. It utilizes generous whitespace, purposeful motion, and a high-contrast foundation to ensure users can navigate complex workflows without cognitive fatigue. The aesthetic takes direct cues from high-performance ecosystems: the technical rigor of Geist/Vercel, the structural clarity of Linear, and the intuitive spatial awareness of Apple’s Human Interface Guidelines.

## Colors

The palette is optimized for data visualization and state management. The **Primary Green** symbolizes growth and task completion, used sparingly for "Success" states and primary calls to action. **Analytics Blue** is reserved for interactive data points and navigational highlights.

**Light Mode:** Surfaces use a pure white (`#FFFFFF`) background with subtle off-white (`#F8FAFC`) containers to create a sense of depth without heavy shadows.
**Dark Mode:** The interface shifts to a deep charcoal (`#0F172A`), using opacity-based borders rather than absolute grays to maintain a "liquid" feel.

Functional colors (Warning/Error) are high-chroma to ensure immediate visibility against the neutral interface.

## Typography

This design system utilizes a dual-font approach. **Geist** provides a technical, precise feel for headings and UI labels, while **Inter** ensures maximum readability for long-form content and body text.

Headings feature aggressive negative letter-spacing and tight line heights to create a "locked-in" visual impact. Labels and utility text use slightly wider tracking to maintain legibility at small sizes. All type should be rendered with `antialiased` smoothing to preserve the premium feel on high-density displays.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** system within a 12-column structure for desktop. To maintain a lightweight feel, the design system utilizes a strict 4px baseline rhythm.

- **Desktop (1440px+):** 12 columns, 24px gutters, 48px side margins.
- **Tablet (768px - 1439px):** 8 columns, 16px gutters, 24px side margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 16px side margins.

Content is organized into logical "zones" using dynamic padding. Vertical rhythm should favor generous spacing between sections (`xl` or `2xl`) to allow the eye to rest, contrasting with tight spacing (`xs` or `sm`) within component internal layouts.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows. 

1.  **Level 0 (Base):** The main background surface.
2.  **Level 1 (Card/Surface):** Elevated by a 1px border (`rgba(0,0,0,0.08)` in light mode, `rgba(255,255,255,0.1)` in dark mode).
3.  **Level 2 (Popovers/Modals):** Features a "Soft Ambient Shadow" (0px 10px 30px rgba(0,0,0,0.05)) and a backdrop blur (8px) to separate the element from the content below.

Interactive elements use a "Press" state where the border color intensifies or the background color shifts slightly, providing tactile feedback without physical movement.

## Shapes

The shape language is defined by the "Rounded" standard (0.5rem / 8px). This provides a friendly but professional character. 

- **Standard Components:** 8px (buttons, inputs).
- **Containers/Cards:** 16px (`rounded-lg`) to create a clear visual frame for content groups.
- **Large Modals/Banners:** 24px (`rounded-xl`).

Strict adherence to these three radii ensures a consistent visual rhythm across the application. Circles are used exclusively for avatars and status indicators.

## Components

### Buttons
- **Primary:** Solid `#22C55E` with white text. High-contrast, no gradient.
- **Secondary:** Ghost style. 1px border with `#22C55E` text.
- **Tertiary/Ghost:** Transparent background, subtle gray text that turns Primary on hover.

### Cards
- **Construction:** 16px corner radius, 1px subtle border, white or deep-charcoal background.
- **Interactive:** Slight lift (Y-axis -2px) and border color shift on hover.

### Input Fields
- **Default:** Transparent background with 1px gray border.
- **Focus:** Border transitions to Primary Green with a 2px outer glow (ring) of the same color at 20% opacity.

### Lists & Tables
- **Rows:** High-density with subtle dividers. Hover states should highlight the entire row with a faint background tint.
- **Cells:** Leading icons for data types (e.g., a blue dot for analytics, a green check for tasks).

### Feedback Components
- **Chips:** Small, pill-shaped elements with low-opacity background colors and high-opacity text (e.g., Blue chip: 10% fill, 100% text).
- **Toasts:** Positioned at the bottom-right, using Level 2 elevation with a 4px left-accent bar in the state color (Green for success, Red for error).