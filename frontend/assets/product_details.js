
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch(`../../backend/api/products/get_product.php?id=${productId}`)
    .then(response => response.json())
    .then(product => {
      // Step 3: Display the product info
      console.log(product);
      document.getElementById('product-name').textContent = product.product_name;
      document.getElementById('product-price').textContent = `$${product.price}`;
      document.getElementById('product-image').src = `./products/${product.id}.webp`;

      document.getElementById('product-category').textContent = `KATEGORİ: ${product.category_name}`;
      document.getElementById('product-description').textContent = `ÜRÜN TANIMI: ${product.description}`;
      document.getElementById('product-stock').textContent = `STOK SAYISI: ${product.stock}`;
    })
    .catch(error => {
      console.error('Failed to fetch product:', error);
    });