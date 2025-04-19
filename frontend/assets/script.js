function add_product()
{
  document.getElementById("product-list").innerHTML += '<div class="product">product_added</div>';
}

//https://e-commerce-project-ruddy-eight.vercel.app/backend/api/products/get_products.php

function refresh_products_local()
{
var filter_list = document.getElementById("product-list");
fetch('backend/api/products/get_products.php')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
}

function refresh_products_web()
{
var filter_list = document.getElementById("product-list");
fetch('https://e-commerce-project-ruddy-eight.vercel.app/backend/api/products/get_products.php')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
}