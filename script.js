// Load products from localStorage or fallback to default
let products = [];

function loadProducts() {
  const saved = localStorage.getItem('products');
  if (saved) {
    products = JSON.parse(saved);
  } else {
    products = [
      {
        name: "Sakura Warrior Skin",
        description: "Legendary outfit with cherry blossom aura",
        price: "₦3,500",
        image: "ff-skin.jpg"
      },
      {
        name: "Sakura Dance Emote",
        description: "Epic emote with floating petals",
        price: "₦1,800",
        image: "https://files.catbox.moe/4qxh43.jpg"
      }
    ];
  }
  renderProducts();
}

// Render products to catalog
function renderProducts() {
  const catalog = document.getElementById('productCatalog');
  catalog.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <button onclick="openPopup('cart')"><i class="fas fa-cart-plus"></i> Add to Cart</button>
    `;
    catalog.appendChild(card);
  });
}

// Popup system
function openPopup(type) {
  let content = '';
  const whatsapp = 'https://wa.me/2349137569462';
  const telegram = 'https://t.me/StorexSakura';

  switch (type) {
    case 'cart':
      content = `
        <h2 style="color:#ff85c1;">Add to Cart</h2>
        <p>Want to buy this item? Chat with us on:</p>
      `;
      break;
    case 'about':
      content = `
        <h2 style="color:#ff85c1;">About Sakura Store</h2>
        <p>Welcome to the ultimate Free Fire Store. We don’t just sell skins—we deliver style, story, and sakura magic.</p>
        <p>Curated by NECROS, powered by passion, and designed.</p>
        <p>Need help? Hit us up below:</p>
      `;
      break;
    case 'contact':
      content = `
        <h2 style="color:#ff85c1;">Contact Us</h2>
        <p>Contact Us Via.</p>
        <p>Reach out via:</p>
      `;
      break;
  }

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      ${content}
      <a href="${whatsapp}" target="_blank" class="whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <a href="${telegram}" target="_blank" class="telegram"><i class="fab fa-telegram"></i> Telegram</a>
      <br><button onclick="closePopup()">Close</button>
    </div>
  `;
  document.getElementById('popup-container').appendChild(popup);
}

function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) popup.remove();
}

// Animated particle background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff69b4';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

// Initialize catalog
loadProducts();

