# ClockStore - Professional E-Commerce Website

## Features
- **Smooth GSAP animations & transitions**
- **Google Firebase Auth** (sign in)
- **Firestore products** (add via console or admin modal)
- **Stripe checkout** (client-side)
- **Responsive TailwindCSS** dark theme
- **Cart system**
- **Admin add products** (Firebase console recommended)

## Quick Start
1. Open `index.html` in browser
2. Setup Firebase:
   - Create project at console.firebase.google.com
   - Enable Google Auth, Firestore
   - Add config to script.js firebaseConfig
3. Setup Stripe: Replace Stripe key in script.js
4. Add products in Firebase Firestore `products` collection or use admin modal
5. Test cart/checkout

## Run Backend (optional, requires Node.js)
```bash
npm install
cd backend && npm install
npm run dev
```

## Deployment
- Frontend: Netlify/Vercel (drag index.html)
- Backend: Render/Vercel functions

Professional, smooth, fully functional clocks store! 🚀
