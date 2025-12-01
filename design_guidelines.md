# SAUKI DATA - Design Guidelines

## Design Philosophy
**Apple-Quality Premium Design** - Every element must embody Apple's design principles: glassmorphism, depth layering, soft shadows, elegant radiuses, and absolute clarity.

## Visual Language

### Glassmorphism & Depth
- **Surfaces**: Blurred glass panels with semi-transparency
- **Layering**: Multi-level depth with soft shadows and elevation
- **Borders**: Subtle gradient borders on glassmorphic elements
- **Radiuses**: Generous rounded corners (12px-24px range)

### Typography Hierarchy
- **Minimalist approach**: Clean, readable hierarchy
- **Hero titles**: Large, bold, commanding presence
- **Subtitles**: Light weight, supporting text
- **Body**: Optimal readability, clear spacing

### Layout System
- **Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- **Containers**: max-w-7xl for main content, max-w-6xl for focused sections
- **Grid**: Responsive grid system (1 column mobile → 2-4 columns desktop)

## Core Components

### Navigation Bar
- **Sticky positioned** with glass blur background
- **Gradient border** at bottom edge
- **Logo placement**: Top-left (placeholder: /public/logo.png)
- **Menu items**: Buy Data, Contact Us, Subscribe to Promo Alerts, Admin Access (lock icon)
- **Mobile**: Hamburger menu with smooth slide-in drawer

### Cards & Product Display
- **Premium cards** with hover-lift (y-axis translate -4px to -8px)
- **Glow edges** on hover (soft colored shadow)
- **Staggered reveal** animations on page load
- **Content structure**: Icon/image → Title → Description → Price → CTA button

### Buttons
- **Primary**: Gradient backgrounds with subtle glow
- **Hover states**: Scale (1.02-1.05), enhanced glow
- **Touch-friendly**: Minimum 44px height, generous padding
- **Loaders**: Animated spinner on submit actions

### Forms
- **Input fields**: Glassmorphic backgrounds, subtle borders
- **Validation**: Real-time Nigerian phone number validation (080, 081, 090, 091 prefixes)
- **Auto-fill**: Pre-populate product name and price from previous selection
- **Focus states**: Enhanced border glow, scale up slightly

### Admin Dashboard
- **Theme**: Professional dark mode with Apple-grade spacing
- **Sidebar navigation**: Fixed left panel with section icons
- **Data tables**: Clean rows with hover states
- **CRUD controls**: Inline edit, delete, enable/disable toggles
- **Security**: Login screen with credential validation before access

## Animation System (Framer Motion)

### Page Transitions
- **Entrance**: Fade + slide from bottom (y: 20 → 0)
- **Exit**: Fade + slight scale down
- **Duration**: 0.3-0.5s with spring physics

### Micro-interactions
- **Card reveals**: Staggered animation with 0.1s delay between items
- **Button press**: Haptic-like feedback (scale 0.95)
- **Copy action**: Icon bounce + success toast
- **Form submit**: Loading spinner + success/error toast

### Background Elements
- **Hero**: Subtle particle field OR flowing gradient waves
- **Ambient motion**: Slow, continuous movement (3-5s duration)

## Color Strategy
- **Nigerian tech accents**: Vibrant greens and blues for network carriers
- **MTN**: Yellow accent (#FFCC00)
- **Airtel**: Red accent (#ED1C24)
- **Glo**: Green accent (#00A859)
- **Glassmorphic surfaces**: Low opacity whites/blacks with backdrop blur
- **Dark mode adaptive**: Support for system preferences

## Specific Page Layouts

### Homepage Hero
- **Background**: Animated gradient waves or particle field
- **Logo**: Top-left corner
- **Title**: "Welcome to Sauki Data Links" (large, centered)
- **Subtitle**: "Cheapest & Fastest Data in Nigeria" (lighter weight)
- **CTA placement**: Below subtitle with prominent button

### Buy Data Hub
- **Four large cards**: MTN, Airtel, Glo, Current Offers
- **2x2 grid desktop** → Single column mobile
- **Card content**: Network logo/icon, title, description, arrow icon

### Product Pages
- **Grid layout**: 2-3 columns desktop → 1 column mobile
- **Price cards**: Data amount, duration, price, "Buy Now" gradient button
- **Hover elevation**: Cards lift with shadow enhancement

### Payment & Order Flow
- **Single column forms**: max-w-2xl centered
- **Payment card**: Glassmorphic panel with bank details
- **Copy button**: Icon + "Copy Account Number" with bounce animation on click
- **Order preview**: Apple-card style summary with all details visible

### Contact & Subscribe Pages
- **Icon-first design**: Large Lucide icons for each contact method
- **Tap-to-action**: WhatsApp, email, social media direct links
- **Clean layout**: Generous whitespace, centered content

## Responsive Behavior
- **Mobile-first**: Start at 360px viewport
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch targets**: Minimum 44px for all interactive elements
- **Navigation**: Hamburger menu below 768px

## Interactive States
- **Hover**: Scale, glow, color shift
- **Active**: Scale down (0.95-0.98)
- **Disabled**: Reduced opacity (0.5), no pointer events
- **Loading**: Skeleton loaders or spinners

## Footer
- **Content**: "Powered by Sauki Data Links Inc. • Developed by Abdallah Nangere © 2025"
- **Style**: Subtle, glassmorphic bar at bottom
- **Links**: Minimal, essential only

## Images
- **Logo**: /public/logo.png (user-replaceable placeholder)
- **Network icons**: Use Lucide icons or brand SVGs
- **No hero images**: Focus on animated backgrounds and glassmorphic design
- **Product imagery**: Optional small icons for data plans