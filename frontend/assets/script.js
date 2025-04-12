document.addEventListener('DOMContentLoaded', () => {
    console.log('sayfa yüklendi...');
});

function add_product()
{
    document.getElementById("product-list").innerHTML += '<div class="product">product_added</div>';
}