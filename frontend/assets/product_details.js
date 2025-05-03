
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`../../backend/api/products/get_product.php?id=${productId}`)
  .then(response => response.json())
  .then(product => {
    // Step 3: Display the product info
    console.log(product);
    document.getElementById('product-name').textContent = product.product_name;
    document.getElementById('product-price').textContent = `$${product.price}`;

    document.getElementById('product-image').src = `../assets/products/${product.product_id}.webp`;

    const elements = document.getElementsByClassName('product-thumb');

    for (let i = 0; i < elements.length; i++) {
      elements[i].src = `../assets/products/${product.product_id}_${i + 1}.webp`;
    }

    document.getElementById('product-category').textContent = `KATEGORİ: ${product.category_name}`;
    document.getElementById('product-description').textContent = `ÜRÜN TANIMI: ${product.description}`;
    document.getElementById('product-stock').textContent = `STOK SAYISI: ${product.stock}`;
  })
  .catch(error => {
    console.error('Failed to fetch product:', error);
  });

  function add_to_cart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    if (!productId) {
      alert("Ürün ID'si bulunamadı!");
      return;
    }
  
    const add_to_cart = {
      product_id: productId,
      quantity: 1
    };
  
    fetch('../../backend/api/cart/post_cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(add_to_cart)
    })
    .then(response => {
      if (response.status === 401) {
        // Giriş yapılmamışsa
        alert("Sepete eklemek için giriş yapmalısınız!");
        window.location.href = "signin.html"; // giriş sayfan hangisiyse
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log(data);
        window.location.href = './cart.html';
      }
    })
    .catch(error => {
      console.error('Hata:', error);
      alert("Sepete eklenemedi.");
    });
  }


  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    if (!productId) return;
  
    fetch(`../../backend/api/products/get_product.php?id=${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Gelen ürün verisi:", data); // ← BURAYA BAK
        if (data && data.product_name) {
          // Breadcrumb güncelle
          const categoryLink = document.getElementById("breadcrumb-category");
          const productLink = document.getElementById("breadcrumb-product");

          console.log("Kategori ismi:", data.category_name);  // ← bu var mı?
          console.log("Ürün ismi:", data.product_name);       // ← bu var mı?
  
          categoryLink.textContent = data.category_name || "Unknown";
          categoryLink.href = `products.html?category=${data.category_id}`;
  
          productLink.textContent = data.product_name;
          productLink.href = `productdetail.html?id=${data.product_id}`;
  
          // Diğer ürün bilgilerini de doldurabilirsin buradan
        } else {
          console.warn("Ürün verisi bulunamadı.");
        }
      })
      .catch(err => {
        console.error("Ürün çekilirken hata oluştu:", err);
      });
  });
  