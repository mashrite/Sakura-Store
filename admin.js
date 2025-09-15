let products = [];

// Login system
function login() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();

  if (user === 'admin' && pass === 'sakura123') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadProducts();
  } else {
    alert('Invalid login. Try again.');
  }
}

// Load products from localStorage
function loadProducts() {
  const saved = localStorage.getItem('products');
  products = saved ? JSON.parse(saved) : [];
  renderAdminProducts();
}

// Save products to localStorage
function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Render products in admin panel
function renderAdminProducts() {
  const list = document.getElementById('adminProductList');
  list.innerHTML = '';
  products.forEach((product, index) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.price}</strong></p>
      <img src="${product.image}" alt="${product.name}" />
      <button onclick="deleteProduct(${index})"><i class="fas fa-trash"></i> Delete</button>
    `;
    list.appendChild(item);
  });
}

// Add product
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = document.getElementById('price').value.trim();
  const image = document.getElementById('image').value.trim();

  if (name && description && price && image) {
    products.push({ name, description, price, image });
    saveProducts();
    renderAdminProducts();
    this.reset();
  }
});

// Delete one product
function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  renderAdminProducts();
}

// Delete all products
function deleteAllProducts() {
  if (confirm("Are you sure you want to delete all products?")) {
    products = [];
    saveProducts();
    renderAdminProducts();
  }
}
