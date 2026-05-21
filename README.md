# SaaS Translator App — Chat With Anyone

A full-stack AI-powered SaaS platform that enables real-time multilingual chat. Users can communicate in their own language while the platform handles translation automatically — breaking down language barriers in conversation.

**Live Demo:** [translator.idemudia.dev](https://translator.idemudia.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Auth | NextAuth.js, Google OAuth |
| Database | Firebase Firestore (real-time) |
| Payments | Stripe (subscription billing) |
| Deployment | Vercel |

---

## Features

- Real-time multilingual chat — messages translated instantly on delivery
- Google OAuth authentication via NextAuth.js
- Subscription billing with Stripe — free and pro tiers
- Stripe billing portal for subscription management
- Firebase Firestore for real-time message sync
- Dark/light mode toggle
- Language selector per user session
- Share chat links with other users
- Responsive design — works on mobile and desktop

---

## Local Development

### Prerequisites

- Node.js (LTS)
- A Google Cloud project (for OAuth)
- A Firebase project (for Firestore)
- A Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/engr-idemudia/saas-translator-app.git
cd saas-translator-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory using `.env.example` as a template:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_key_here\n-----END PRIVATE KEY-----\n"

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID=your_stripe_price_id
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
saas-translator-app/
├── app/
│   ├── (user)/         # Authenticated user routes
│   ├── api/            # API routes (auth, stripe webhooks)
│   ├── pricing/        # Pricing page
│   ├── register/       # Registration page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # Reusable UI components
├── actions/            # Server actions (Stripe billing portal)
├── hooks/              # Custom React hooks
├── store/              # Global state management
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
├── firebase.ts         # Firebase client SDK
├── firebase-admin.ts   # Firebase Admin SDK
└── auth.ts             # NextAuth configuration
```

---

## Deployment

The app is deployed on **Vercel** with automatic deployments on every push to `main`.

Environment variables are configured in the Vercel dashboard under **Settings → Environment Variables**.

---

## Author

**Idemudia Osaghae**  
[idemudia.dev](https://idemudia.dev) · [GitHub](https://github.com/engr-idemudia)
