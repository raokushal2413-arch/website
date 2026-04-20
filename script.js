// Firebase config - REPLACE WITH YOUR CONFIG
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123",
  appId: "your-app-id"
};

// Initialize Firebase
let app, auth, db, stripe;
try {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  stripe = Stripe('pk_test_your_publishable_key'); // Replace with your Stripe key
} catch (e) {
  console.log('Firebase/Stripe not configured, using mock data');
}

// GSAP animations
gsap.from('[data-gsap="hero-title"]', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('[data-gsap="hero-subtitle"]', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
gsap.from('[data-gsap="hero-cta"]', { opacity: 0, scale: 0.8, duration: 1, delay: 1 });

// Sample products (use Firestore or these)
const sampleProducts = [
  { id: 1, name: 'Modern Wall Clock', price: 89.99, image: 'https://images.unsplash.com/photo-1520785700417-9c0e5ce40809?w=400', category: 'wall' },
  { id: 2, name: 'Digital Alarm Clock', price: 49.99, image: 'https://images.unsplash.com/photo-1589890665504-5bbfe5318896?w=400', category: 'alarm' },
  { id: 3, name: 'Smart Watch Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'smartwatch' },
  { id: 4, name: 'Vintage Clock', price: 129.99, image: 'https://images.unsplash.com/photo-1519227355648-908f5b28542e?w=400', category: 'wall' }
];

let cart = [];
let products = sampleProducts;

async function loadProducts() {
  try {
    const snapshot = await db.collection('products').get();
    products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts();
  } catch (e) {
    console.log('Firestore error, keeping samples:', e.message);
  }
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(product => `
    <div class="group bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 hover:bg-gray-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-4 shadow-2xl border border-gray-700 hover:border-blue-500 cursor-pointer opacity-0" data-gsap="product-${product.id}">
      <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
      <h4 class="text-2xl font-bold mb-2">${product.name}</h4>
      <p class="text-gray-400 mb-4">${product.category.toUpperCase()}</p>
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-green-400">$${product.price.toFixed(2)}</span>
        <button onclick="addToCart(${product.id})" class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-110">Add to Cart</button>
      </div>
    </div>
  `).join('');

  // Animate products
  products.forEach((_, i) => {
    gsap.from(`[data-gsap="product-${products[i].id}"]`, { opacity: 0, y: 50, duration: 0.8, delay: i * 0.1 });
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  gsap.to('#cartBtn', { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
}

function updateCartUI() {
  document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cartTotal').textContent = total.toFixed(2);
  document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

async function googleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    document.getElementById('userEmail').textContent = result.user.email;
    document.getElementById('googleLogin').classList.add('hidden');
    document.getElementById('logout').classList.remove('hidden');
    document.getElementById('userEmail').classList.remove('hidden');
  } catch (e) {
    console.error('Auth error', e);
  }
}

function logout() {
  auth.signOut();
  document.getElementById('googleLogin').classList.remove('hidden');
  document.getElementById('logout').classList.add('hidden');
  document.getElementById('userEmail').classList.add('hidden');
}

async function addProduct() {
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const image = document.getElementById('productImage').value;
  const category = document.getElementById('productCategory').value;
  
  try {
    await db.collection('products').add({ name, price, image, category });
    loadProducts();
  } catch (e) {
    console.error('Add product error', e);
  }
}

async function checkout() {
  // Stripe checkout stub
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const response = await fetch('https://your-backend-or-firebase-function/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart, total })
  });
  const { sessionId } = await response.json();
  stripe.redirectToCheckout({ sessionId });
}

// Event listeners
document.getElementById('googleLogin').onclick = googleLogin;
document.getElementById('logout').onclick = logout;
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.remove('hidden');
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.add('hidden');
document.getElementById('checkoutBtn').onclick = checkout;
document.getElementById('addProductBtn').onclick = addProduct;

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('googleLogin').classList.add('hidden');
    document.getElementById('logout').classList.remove('hidden');
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userEmail').classList.remove('hidden');
  }
});

// Always use sample products first for instant demo
renderProducts();
updateCartUI();

// Optional Firebase load (won't break demo)
if (typeof db !== 'undefined') {
  setTimeout(loadProducts, 1000); // Try Firestore after
}
