# Veneth Portfolio Design Specification

## Overview
A modern, dark-themed portfolio website for UI/UX Designer Veneth ChandraKumar featuring smooth animations, 3D effects, and responsive design.

**Designer:** Veneth ChandraKumar  
**Role:** UI/UX Designer, No-Code Developer  
**Location:** Trichy, Tamil Nadu, India  
**Website Type:** Portfolio / Freelance

---

## Design Tokens

### Color Palette

#### Dark Theme (Default)
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#111111` | Main background |
| `bg-secondary` | `#0D0D0D` | Section backgrounds |
| `bg-card` | `#1A1A1A` | Card backgrounds |
| `text-primary` | `#FFFFFF` | Headings, important text |
| `text-secondary` | `#A0A0A0` | Body text |
| `text-muted` | `#666666` | Placeholder, disabled |
| `accent` | `#C9FB00` | Primary accent (lime green) |
| `accent-hover` | `#DFFC4D` | Accent on hover |
| `accent-secondary` | `#00ff88` | Secondary accent (mint) |
| `border` | `rgba(255,255,255,0.08)` | Borders, dividers |

#### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#e6ddcf` | Main background (warm beige) |
| `bg-secondary` | `#d9cfc2` | Section backgrounds |
| `bg-card` | `#ffffff` | Card backgrounds |
| `text-primary` | `#1a1a1a` | Headings |
| `text-secondary` | `#4a4a4a` | Body text |
| `text-muted` | `#8a8a8a` | Muted text |
| `accent` | `#c9a84c` | Primary accent (golden) |
| `accent-hover` | `#d4b05e` | Accent on hover |
| `accent-secondary` | `#8b7355` | Secondary accent (taupe) |
| `border` | `rgba(0,0,0,0.08)` | Borders |

---

## Typography

### Font Families
| Name | Value | Usage |
|------|-------|-------|
| Display | `'Inter Tight', sans-serif` | Hero headings, large titles |
| Heading | `'Inter Tight', sans-serif` | Section headings |
| Body | `'Inter', sans-serif` | Body text, paragraphs |

### Font Sizes
| Token | Value | Usage |
|-------|-------|-------|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Navigation links |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Large body |
| `text-xl` | 20px | Subheadings |
| `text-2xl` | 24px | Section titles |
| `text-3xl` | 32px | Large headings |
| `text-4xl` | 48px | Hero subtext |
| `text-5xl` | 64px | Hero main titles |
| `text-6xl` | 96px | Large hero text |

### Font Weights
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)
- Extrabold (800)
- Black (900)

---

## Layout

### Container
- **Max Width:** 1400px
- **Padding:** 40px horizontal
- **Mobile Padding:** 20px

### Grid
- **Columns:** 12
- **Gap:** 24px

### Breakpoints
| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 640px | Small devices |
| Tablet | 640px - 1024px | Tablets, small laptops |
| Desktop | 1024px - 1440px | Standard screens |
| Large | > 1440px | Large monitors |

---

## Components

### 1. Navigation (Nav Pill)

**Style:** Floating pill navigation bar
**Position:** Fixed, top center (24px from top)
**Width:** Auto, centered
**Background:** Semi-transparent with backdrop blur

| State | Background | Border |
|-------|------------|--------|
| Dark | `rgba(17, 17, 17, 0.85)` | 1px solid `rgba(255,255,255,0.08)` |
| Light | `rgba(230, 221, 207, 0.9)` | 1px solid `rgba(0,0,0,0.08)` |

**Animation:** Slide down on load (0.8s)

#### Nav Profile
- **Size:** 44px × 44px
- **Shape:** Circle
- **Border:** 2px solid accent color
- **Image:** Object-fit cover, center 15%

#### Nav Links
- **Padding:** 10px 20px
- **Font Size:** 14px
- **Font Weight:** 500
- **Border Radius:** 100px (full round)
- **Color:** text-secondary
- **Hover:** text-primary, background rgba

#### Nav Contact (CTA)
- **Style:** Pill button
- **Background:** accent
- **Text:** Dark (for contrast)
- **Hover:** accent-hover

---

### 2. Hero Section

**Layout:** Three-column asymmetric grid
```
[Title Left] [Image Center] [Title Right]
   VENETH                    DESIGNER
               [IMAGE]
```

#### Hero Title (Left)
- **Label:** "VENETH" - uppercase, small text
- **Main Title:** "UI" - Extra large, bold
- **Transform:** Rotated -3deg default

#### Hero Image
- **Container:** 300px max-width
- **Aspect Ratio:** 4.5:5
- **Border Radius:** 32px (radius-lg)
- **Transform:** -3deg rotation
- **Hover:** Straightens to 0deg, scale 1.02
- **Shadow:** 
  - Dark: `0 30px 60px rgba(0,0,0,0.5)`
  - Light: `0 15px 40px rgba(0,0,0,0.1)`

#### Available Pill (Floating Card)
- **Position:** Bottom of image, centered
- **Background:** accent
- **Text:** Dark, uppercase, 11px
- **Animation:** Float (6s infinite)

#### Floating "HI" Bubble
- **Position:** Adjacent to image
- **Style:** Circle, accent background
- **Animation:** Bounce

#### Hero Title (Right)
- **Main Title:** "DESIGNER" - Extra large, bold
- **Subtitle:** 48px, semibold
- **Body Text:** 16px, text-secondary
- **Transform:** Rotated 3deg default

#### Stroke Text Effect
- **Style:** Text with stroke outline
- **Hover:** Fill with accent color
- **Usage:** Service keywords

#### Theme Toggle
- **Position:** Bottom right of hero
- **Style:** Circle button
- **Icon:** Sun (light mode) / Moon (dark mode)

---

### 3. Services Section

**Background:** Section with glow orbs
**Layout:** Grid of 4 service cards (2×2 on desktop)

#### Section Header
- **Label:** "What I Can Do" - accent color
- **Title:** "Services" - Large heading

#### Service Card
- **Background:** bg-card
- **Border:** 1px solid border
- **Border Radius:** 24px
- **Padding:** 40px
- **Hover Effect:** 
  - 3D tilt on mouse move
  - Translate up 8px
  - Rotate 1deg
  - Enhanced shadow

| State | Shadow |
|-------|--------|
| Default | `0 20px 40px rgba(0,0,0,0.2)` |
| Hover | `0 30px 60px rgba(0,0,0,0.3)` |

#### Service Number
- **Style:** Large number, accent color
- **Font Size:** 48px
- **Font Weight:** 900

#### Service Items List
- **Style:** Bullet list
- **Bullet:** Accent color dot

---

### 4. Projects Section

**Background:** bg-primary
**Layout:** Vertical list of project cards

#### Project Card (Horizontal)
- **Layout:** Image left (40%), Content right (60%)
- **Background:** bg-card
- **Border:** 1px solid border
- **Border Radius:** 24px
- **Height:** 400px
- **Hover:** 
  - Image scale 1.05
  - Full card tilt effect

#### Project Image
- **Object Fit:** Cover
- **Border Radius:** 24px (left side only)
- **Hover:** Scale 1.05 with overflow hidden

#### Project Meta
- **Number:** Large accent text
- **Category:** Label style, muted

#### Project Tags
- **Style:** Pill badges
- **Background:** transparent
- **Border:** 1px solid border
- **Padding:** 6px 12px
- **Font Size:** 12px

#### Project Actions
- **Primary Button:** 
  - Background: accent
  - Text: dark
  - Shadow: accent glow
- **Outline Button:**
  - Background: transparent
  - Border: 1px solid border
  - Hover: Border accent

---

### 5. About Section

**Layout:** Two columns (Content left, Image right)

#### About Content
- **Heading:** Large text, max 2 lines
- **Body:** text-secondary, comfortable reading

#### Stats Grid
- **Layout:** 3 cards in row
- **Cards:**
  - Large number (48px, black)
  - Label below (muted text)
  - 3D tilt on hover

#### About Image
- **Max Width:** 350px
- **Aspect Ratio:** 3:4
- **Border Radius:** 24px
- **Transform:** -3deg rotation
- **Shadow:** Similar to hero image

#### Floating Info Card
- **Position:** Bottom of image
- **Background:** bg-card
- **Content:** Name, role, location
- **Animation:** Float (5s infinite)

---

### 6. Contact Section

**Layout:** Two columns (Image left, Form right)

#### Contact Image
- **Size:** 300px
- **Shape:** Circle
- **Border:** 2px solid accent
- **Overlay:** "Hi" bubble

#### Contact Form
- **Background:** bg-card
- **Border Radius:** 24px
- **Padding:** 40px
- **Shadow:** lg shadow

#### Form Inputs
- **Height:** 56px (large inputs)
- **Background:** bg-secondary
- **Border:** 1px solid border
- **Border Radius:** 12px
- **Focus:** 
  - Border: accent
  - Shadow: accent glow
  - Background: slightly lighter

#### Form Labels
- **Font Size:** 12px
- **Font Weight:** 500
- **Text Transform:** Uppercase
- **Letter Spacing:** 0.1em
- **Color:** text-muted

#### Submit Button
- **Style:** Full width, large
- **Background:** accent
- **Height:** 56px
- **Font Size:** 14px
- **Font Weight:** 700
- **Text Transform:** Uppercase
- **Hover:** 
  - Scale 1.02
  - Enhanced shadow
  - Glow effect

---

### 7. Footer

**Background:** bg-secondary
**Layout:** 4 columns + bottom bar

#### Footer Brand
- **Logo:** Profile image 48px + name
- **Tagline:** Short description
- **Social Links:** Icon buttons

#### Footer Columns
| Column | Content |
|--------|---------|
| Navigation | Home, About, Projects, Contact |
| Services | UI/UX, No-Code, Web Design, Vibe Coding |
| Contact | Email, Phone, Location |

#### Footer Bottom
- **Border:** Top 1px solid border
- **Content:** Copyright + credit
- **Style:** Centered, muted text

---

## Animations

### Timing Functions
| Name | Value | Usage |
|------|-------|-------|
| bounce | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Interactive elements |
| easeInOut | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| fast | 150ms | Micro-interactions |
| base | 250ms | Standard transitions |
| normal | 400ms | Section transitions |
| slow | 600ms | Page transitions |

### Keyframe Animations

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```
- Duration: 6s
- Easing: ease-in-out
- Infinite

#### Pulse
```css
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
}
```
- Duration: 2s
- For: Available indicator

#### Reveal (Scroll Animation)
```css
.reveal {
  transform: translateY(40px);
  opacity: 0;
  transition: all 0.8s ease;
}
.reveal.active {
  transform: translateY(0);
  opacity: 1;
}
```

#### 3D Tilt
- On mouse move within element
- RotateX/Y based on mouse position
- Scale 1.02 on hover
- Perspective: 1000px

---

## Responsive Behavior

### Mobile (< 640px)
- **Navigation:** Hamburger menu
- **Hero:** Stacked layout
- **Services:** Single column
- **Projects:** Stacked cards
- **About:** Stacked
- **Contact:** Stacked
- **Footer:** Single column

### Tablet (640px - 1024px)
- **Navigation:** Compact
- **Hero:** Two-column where possible
- **Services:** 2-column grid
- **Projects:** Maintain horizontal layout
- **About:** Side by side

### Desktop (> 1024px)
- **Full navigation:** All links visible
- **Hero:** Full three-column
- **Services:** 2×2 grid
- **Projects:** Horizontal cards
- **About:** Side by side
- **Contact:** Side by side

---

## Accessibility

### Focus States
- All interactive elements have visible focus
- Focus ring uses accent color
- Focus shadow for depth

### Color Contrast
- Primary text: AAA compliant
- Secondary text: AA compliant
- Accent on background: AA compliant

### Motion
- Respects `prefers-reduced-motion`
- Fallback for no-animation browsers

---

## File Structure

```
src/
├── assets/
│   ├── veneth.jpg          # Hero image
│   └── veneth-about.jpg    # About image
├── context/
│   └── ThemeContext.jsx    # Theme provider
├── App.jsx                 # Main component
├── index.css               # All styles
└── main.jsx                # Entry point

design/
├── design-tokens.json      # Figma importable tokens
└── design-spec.md          # This file
```

---

## Export for Figma

### Variables Import
1. Open Figma
2. Go to **Variables** panel
3. Click **...** menu → **Import**
4. Select `design-tokens.json`
5. Variables will be imported with modes (dark/light)

### Component Recreation
1. Create component variants for dark/light modes
2. Use imported variables for all properties
3. Build components following component specs above

---

## Next Steps

After Phase 1 (Design Tokens):
1. Phase 2: Set up Figma MCP Server
2. Phase 3: Create components in Figma
3. Phase 4: Export to Framer/Wix
