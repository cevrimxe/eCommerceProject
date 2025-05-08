// 1. Featured ve Best Deal ID'lerini al
fetch('http://localhost/eCommerceProject/backend/api/products/get_featured_ids.php') 
    .then(response => response.json())
    .then(data => {
        const bestDealsIds = data.bestdeal_ids;

        // 2. ID'lere göre ürün detaylarını al
        getProductsDetails(bestDealsIds, 'best-deals');
    })
    .catch(error => console.error('Error fetching IDs:', error));

// 3. Ürün detaylarını al
function getProductsDetails(productIds, category) {
    productIds.forEach(id => {
        fetch(`http://localhost/eCommerceProject/backend/api/products/get_product.php?id=${id}`) 
            .then(response => response.json())
            .then(product => {
                displayProduct(product, category);
            })
            .catch(error => console.error(`Error fetching product ID ${id}:`, error));
    });
}

// 4. Ürünleri HTML'ye ekle
function displayProduct(product, category) {
    const container = document.getElementById(`${category}-container`);
    const productCard = document.createElement('div');
    productCard.classList.add('deal-card', 'hot-sale'); // Deal kartını oluşturuyoruz

    productCard.innerHTML = `
        <div class="badge discount"></div>
        <div class="badge hot">${product.discount}% OFF</div>
        <img src="../assets/images/${product.product_id}/${product.product_id} cover.png" alt="">
        <div class="rating">
            ⭐⭐⭐⭐⭐ <span>(${product.reviews_count})</span>
        </div>
        <h4>${product.product_name}</h4>
        <p class="old-price">
            $${(product.discount > 0 
                ? product.price / (1 - product.discount / 100) 
                : product.price * 1.25).toFixed(2)}
        </p>
        <p class="new-price">$${product.price}</p>
        <p class="desc">
            ${product.description}
        </p>
        <div class="actions">
        <button class="shop-btn" onclick="window.location.href='productdetail.html?id=${product.product_id}'">SHOP NOW →</button>
        </div>
    `;

    container.appendChild(productCard); // Ürün kartını container'a ekle
}
