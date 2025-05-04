document.addEventListener('DOMContentLoaded', function() {
  get_products();
});
/*   
category_id: "1"
category_name: "Electronics"
description: "A high-performance laptop"
price: "1000"
product_id: 1
product_name: "Laptop"
stock: 20
*/
function get_products() {
  fetch('../../backend/api/products/get_products.php')
    .then(response => response.json())
    .then(data =>
    {
      /* console.log(data); */
      
      let num_of_products = data.length;
      let html = "";
      let product_grid = document.getElementById("product_grid_id");
      /* product_grid.style.display = "none"; */
      for (let i=0; i < num_of_products; ++i)
      {
        html +=
        `

      <div class="product-card" style="cursor: pointer" data-product-id="${data[i].product_id}">
        <img src="../assets/products/${data[i].product_id}.webp" alt="">
        <div class="product-info">
          <h4>${data[i].product_name}</h4>
          <div class="stars">⭐⭐</div>
          <p class="price">$${data[i].price}</p>
        </div>
        <div class="badges"><span class="hot">HOT</span></div>
      </div>
        `;
      }
      product_grid.innerHTML = html;

      document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
          const productId = this.dataset.productId;
          // Redirect to product detail page
          window.location.href = `./productdetail.html?id=${productId}`;
        });
      });

    })
    .catch(error => {
      console.error('Error fetching get_products.php:', error);
    });
}