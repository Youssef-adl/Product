# DESIGN.md — SOLARIS LUX (2026 Sage Edition)

A design system for premium, minimalist, and cinematic user interfaces. Inspired by the clarity of Apple and the natural aesthetics of modern lifestyle tech.

---

## 1. Visual Theme & Atmosphere
- **Mood**: Precise, Essential, Natural, High-End.
- **Density**: Spacious (High white-space usage).
- **Aesthetic**: Light-mode primary with soft organic textures (noise/grain).

## 2. Color Palette (Natural Technical)
| Name            | Hex / RGBA                  | Role                          |
|-----------------|-----------------------------|-------------------------------|
| **Silk White**  | `#FCFBF9`                   | Primary Background            |
| **Sage Green**  | `#8B9474`                   | Primary Accent / CTAs         |
| **Deep Olive**  | `#2D2D2A`                   | Primary Text / Headings       |
| **Soft Sage**   | `#AFB79B`                   | Secondary Background / Hover  |
| **Slate Gray**  | `#5A5A55`                   | Secondary Text / UI Details   |
| **Glass Border**| `rgba(0, 0, 0, 0.08)`       | Borders & Dividers            |
| **Glass BG**    | `rgba(255, 255, 255, 0.4)`  | Glassmorphic Surfaces         |

## 3. Typography
- **Core Font**: Inter or SF Pro (Sans-serif)
- **Heading Font**: Barlow (Bold/Black weight for impact)
- **Mono Font**: JetBrains Mono (Technical details / Stats)

| Style           | Weight | Size    | Case      | Letter Spacing |
|-----------------|--------|---------|-----------|----------------|
| Display Hero    | 900    | 5rem+   | Uppercase | -0.02em        |
| Section Header  | 800    | 3.5rem  | Uppercase | 0.05em         |
| Subheader       | 600    | 1.25rem | Sentence  | Normal         |
| Button/Label    | 700    | 0.75rem | Uppercase | 0.25em         |

## 4. Components
### Buttons
- **Primary**: Full Sage Green, rounded-full, high letter-spacing.
- **Secondary**: Outlined or underlined, minimal chrome.
- **States**: Subtle translateY(-2px) + shadow on hover.

### Cards (Bento)
- **Background**: Glass Silk (semi-transparent white).
- **Border**: Thin 1px (Glass Border).
- **Radius**: Large (24px - 32px).
- **Shadow**: Ultra-soft (low spread, low opacity).

## 5. Layout Principles
- **Grid**: 12-column masonry or strict Bento grid for features.
- **Margins**: Minimum 2rem (mobile), 8rem (desktop).
- **Transitions**: 0.8s Cubic-Bezier (Precision Motion).

## 6. Depth & Elevation
- **Elevation 0**: Primary Background with Noise Overlay.
- **Elevation 1**: Secondary Panels (Glassmorphism).
- **Elevation 2**: Floating Navbar / Tooltips.

## 7. Responsive Behavior
- **Mobile**: Single column, enlarged touch targets, simplified animations.
- **Tablet**: 2-column bento adaptations.
- **Desktop**: Full full-bleed imagery and cinematic parallax.
