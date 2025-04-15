document.addEventListener('DOMContentLoaded', () => {
  console.log('sayfa yüklendi...');
});

function add_product()
{
  document.getElementById("product-list").innerHTML += '<div class="product">product_added</div>';
}

function refresh_products()
{
var filter_list = document.getElementById("product-list");
fetch('../../backend/api/products/get_product.php')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
}

function refresh_categories()
{
var filter_list = document.getElementById("checkbox-group");
fetch('../../backend/api/products/get_product.php')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
}