const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // serve your HTML/CSS/JS

// Get products
app.get('/products', (req, res) => {
  const data = fs.readFileSync('products.json');
  res.json(JSON.parse(data));
});

// Add product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  const data = JSON.parse(fs.readFileSync('products.json'));
  data.push(newProduct);
  fs.writeFileSync('products.json', JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Delete all products
app.delete('/products', (req, res) => {
  fs.writeFileSync('products.json', JSON.stringify([], null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
