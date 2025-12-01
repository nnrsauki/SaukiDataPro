# Sauki Data Links - Nigerian Data Reselling Platform

## Project Overview
An ultra-premium, Apple-quality commercial website for SAUKI DATA - a Nigerian data reselling platform for MTN, Airtel, and Glo bundles. Built with a focus on glassmorphism, smooth animations, and premium user experience.

## Technology Stack
- **Frontend**: React with TypeScript, Vite
- **Styling**: Tailwind CSS with custom Apple-style design tokens
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: Wouter
- **State Management**: localStorage-based persistence
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── animated-background.tsx
│   │   ├── back-button.tsx
│   │   ├── data-plan-card.tsx
│   │   ├── footer.tsx
│   │   ├── glass-card.tsx
│   │   ├── gradient-button.tsx
│   │   ├── navbar.tsx
│   │   ├── network-card.tsx
│   │   ├── page-transition.tsx
│   │   ├── promo-banner.tsx
│   │   └── skeleton-loader.tsx
│   ├── hooks/
│   │   ├── use-store.ts          # localStorage state hooks
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── queryClient.ts
│   │   ├── store.ts              # localStorage CRUD operations
│   │   └── utils.ts
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── dashboard.tsx     # Admin panel
│   │   │   └── login.tsx         # Admin login
│   │   ├── home.tsx
│   │   ├── buy-data.tsx
│   │   ├── network-plans.tsx
│   │   ├── payment.tsx
│   │   ├── order-form.tsx
│   │   ├── order-preview.tsx
│   │   ├── contact.tsx
│   │   ├── subscribe.tsx
│   │   └── not-found.tsx
│   ├── App.tsx
│   └── index.css
shared/
└── schema.ts                      # Data schemas and types
```

## Features
1. **Homepage**: Premium landing page with animated background and features
2. **Buy Data**: Network selection hub (MTN, Airtel, Glo, Current Offers)
3. **Product Pages**: Data plans with pricing for each network
4. **Payment Flow**: Multi-step purchase process with WhatsApp integration
5. **Contact Us**: Contact methods with social media links
6. **Subscribe**: Promo alerts subscription
7. **Admin Dashboard**: Full CRUD for plans, promos, and admin users

## Admin Credentials
- Username: AbdallahSauki
- Password: AAUNangere@2003

## Payment Details
- Account Number: 8164135836
- Bank: Opay / Sterling Bank
- Account Name: Abdullahi Adam Usman

## Contact Information
- Phone/WhatsApp: 08164135836
- Email: saukidatalinks@gmail.com
- Social Media: @SaukiDataLinks

## Design System
- **Colors**: Green primary (primary), Blue accent (accent), Network-specific colors (MTN yellow, Airtel red, Glo green)
- **Typography**: Inter font family
- **Effects**: Glassmorphism, backdrop blur, gradient borders
- **Animations**: Spring-based transitions, staggered reveals, hover effects
- **Dark Mode**: Fully supported with automatic detection

## Routes
- `/` - Homepage
- `/buy-data` - Network selection
- `/buy-data/:network` - Network plans (mtn, airtel, glo)
- `/payment` - Payment instructions
- `/order-form` - Order details form
- `/order-preview` - Order confirmation
- `/contact` - Contact information
- `/subscribe` - Promo subscription
- `/admin` - Admin login
- `/admin/dashboard` - Admin panel

## Recent Changes
- Initial project setup with all pages and components
- Apple-style design system implementation
- localStorage-based state management
- Framer Motion animations throughout
- Mobile-responsive design
- Dark mode support
