
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function add_to_cart() {
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
      window.location.href = './dashboard_cart.html';
    }
  })
  .catch(error => {
    console.error('Hata:', error);
    alert("Sepete eklenemedi.");
  });
}

document.addEventListener("DOMContentLoaded", () =>
{
  if (!productId) return;

  fetch(`../../backend/api/products/get_product.php?id=${productId}`)
  .then(response => response.json())
  .then(product => {
    // Step 3: Display the product info
    console.log("FETCHED PRODUCT FOR PRODUCT DETAIL: ", product);
    var product_detail_product = document.getElementById("product-detail-id");

    var html = `
    <div class="product-images">
      <img id="product-image" src="../assets/images/${product.product_id}/${product.product_id} cover.png" alt="PRODUCT NAME SHORT" class="main-image">
      <div class="thumbnail-list" id="thumbnail-list"></div>
    </div>

    <div class="product-info">
      <h2 id="product-name">${product.product_name}</h2>
      <p class="price" id="product-price">
        $${product.price}
        <span class="old-price">
          $${(product.discount > 0 
            ? product.price / (1 - product.discount / 100) 
            : product.price * 1.25).toFixed(2)}
        </span>
      </p>
      <p id="product-category">Category: ${product.category_name}</p>
      <p id="product-description">Description: ${product.description}</p>
      <p id="product-stock">Stock: ${product.stock}</p>

      <div class="actions">
        <button class="btn primary" onclick="add_to_cart()">Add to Cart</button>
      </div>

      <ul class="features">
        <li>✅ Free 1 Year Warranty</li>
        <li>✅ Free Shipping</li>
        <li>✅ 24/7 Customer Support</li>
      </ul>
    </div>
  `;

  product_detail_product.innerHTML = html;

  // 👇 THUMBNAIL'LARI DİNAMİK YÜKLE
  const thumbnails = [` cover.png`,`_2.png`, `_3.png`];
  const thumbContainer = document.getElementById("thumbnail-list");

  thumbnails.forEach(suffix => {
    const imgPath = `../assets/images/${product.product_id}/${product.product_id}${suffix}`;
    const img = new Image();
    img.src = imgPath;
    img.alt = "Thumb";
    img.className = "product-thumb";
    img.onload = () => {
      img.addEventListener("click", () => {
        document.getElementById("product-image").src = img.src;
      });
      thumbContainer.appendChild(img);
    };
  });
  })
  .catch(error => {
    console.error('Failed to fetch product:', error);
  });

});
  