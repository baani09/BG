async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
}

function displayProducts(products) {
  const productList = document.getElementById('products');
  productList.innerHTML = '';
  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <div class="product-info">
              <h2>${product.title}</h2>
              <p>${product.category}</p>
              <p>$${product.price}</p>
          </div>
      `;
      productList.appendChild(productCard);
  });
}

async function initialize() {
  const products = await fetchProducts();
  displayProducts(products);

  document.getElementById('sort').addEventListener('change', async function() {
      const sortOrder = this.value;
      const sortedProducts = await sortProducts(products, sortOrder);
      displayProducts(sortedProducts);
  });

  document.getElementById('category').addEventListener('change', async function() {
      const category = this.value;
      const filteredProducts = await filterProducts(category);
      displayProducts(filteredProducts);
  });
}

async function sortProducts(products, order) {
  return products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
}

async function filterProducts(category) {
  if (category === '') return await fetchProducts();
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  const data = await response.json();
  return data;
}

initialize();
