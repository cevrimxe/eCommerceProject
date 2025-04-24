function add_product() {
  document.getElementById("product-list").innerHTML += '<div class="product">product_added</div>';
}
/*   
category_id: "1"
category_name: "Electronics"
description: "A high-performance laptop"
price: "1000"
product_id: 1
product_name: "Laptop"
stock: 20
*/
function add_products() {
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

      <div class="product-card">
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
      product_grid.innerHTML += html;
      /* product_grid.style.display = ""; */
    })
    .catch(error => {
      console.error('Error fetching get_products.php:', error);
    });
}


/* function refresh_products_local() {
  fetch('../../backend/api/products/get_products.php')
    .then(response => response.json())
    .then(data =>
    {
      console.log("GOT DATA FROM DB");
      data.forEach
      (datum =>
      {
        let product_grid = document.getElementById("product_grid_id");

        let product_card = document.createElement("div");
        product_card.classList.add("product-card");
  
        let product_img_link = document.createElement("img");
        product_img_link.src = "../assets/paint.png"
        product_img_link.alt = "";
  
        let product_info = document.createElement("div");
        product_info.classList.add("product-info");
  
        let product_name = document.createElement("h4");
        product_name.textContent = datum.product_name;
  
        let stars = document.createElement("div");
        stars.classList.add("stars");
        stars.textContent = "⭐⭐";
  
        let price = document.createElement("p");
        price.classList.add("price");
        price.textContent = "$" + datum.price;
  
        let badges = document.createElement("div");
        badges.classList.add("badges");
  
        let badge_hot = document.createElement("span");
        badge_hot.classList.add("hot");
        badge_hot.textContent = "hot";
  
        product_info.appendChild(product_name);
        product_info.appendChild(stars);
        product_info.appendChild(price);
  
        badges.appendChild(badge_hot);
  
        product_card.appendChild(product_img_link);
        product_card.appendChild(product_info);
        product_card.appendChild(badges);
  
        product_grid.appendChild(product_card);
      }
      );
      console.log(element);
    })
    .catch(error => {
      console.error('Error fetching get_products.php:', error);
    });
} */