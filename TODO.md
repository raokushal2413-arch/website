# Clocks E-Commerce Website Development Plan

## Approved Plan Summary
**Goal**: Transform clocks demo into professional e-commerce site with product catalog, Google login, Stripe payments, smooth transitions, admin product upload.

**Tech Stack**:
- Frontend: React + Vite + TailwindCSS + Framer Motion (animations)
- Backend: Node.js + Express + MongoDB
- Auth: Firebase (Google OAuth)
- Payments: Stripe
- Deployment ready structure

**Status**: Pending implementation

## Detailed Steps
### Phase 1: Project Setup (Backend & Frontend)
1. [x] Backup existing files to simple-clocks-demo/ ✅
2. [x] Created root package.json with dev scripts ✅
3. [ ] Setup Firebase project (Google Auth), get config
4. [ ] Setup Stripe account, get keys

### Phase 2: Backend Development
5. [x] Created backend/server.js with basic Express, CORS, stub routes for products/orders/Stripe ✅
6. [x] Created Product model, integrated in server.js ✅
7. [ ] Auth routes (Firebase verify ID token)
8. [ ] Stripe payment routes
9. [ ] Admin protected routes for product CRUD

### Phase 3: Frontend Development
10. [ ] Create Vite React app
11. [ ] Install TailwindCSS, Framer Motion, React Router, Stripe.js
12. [ ] Pages: Home (hero, featured products), Shop, Product Detail, Cart, Checkout, Admin Dashboard, Login
13. [ ] Smooth animations/transitions
14. [ ] Google Auth button (Firebase)
15. [ ] Stripe checkout integration

### Phase 4: Deployment Prep
16. [ ] Environment variables (.env)
17. [ ] CORS setup
18. [ ] MongoDB Atlas connection
19. [ ] Test full flow
20. [ ] Build & deploy instructions (Vercel/Netlify frontend, Render/Heroku backend)

**Notes**:
- Need Firebase/Stripe API keys from user
- Products: Clocks (wall, alarm, smartwatches) with images/prices
- Professional: Dark theme, smooth page transitions, responsive

**Current Status**: User approved. Implementing Phase 1 step 2: npm init backend.
