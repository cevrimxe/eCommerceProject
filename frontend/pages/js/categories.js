document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("category-list");
    const productGrid = document.getElementById("product_grid_id");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const filterButton = document.getElementById("filter-button");
    const resetButton = document.getElementById("reset-button"); // Reset button

    // Endpoint URLs
    const categoriesEndpoint = "http://localhost/eCommerceProject/backend/api/products/get_categories.php";
    const productsEndpoint = "http://localhost/eCommerceProject/backend/api/products/get_productsByCategory.php";

    // Fetch categories from the endpoint
    fetch(categoriesEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing categories (if any)
            categoryList.innerHTML = "";

            // Add "All" option
            const allOption = document.createElement("li");
            allOption.innerHTML = `
                <input type="radio" name="category" id="category-all" value="all" checked>
                <label for="category-all">All</label>`;
            allOption.addEventListener("click", () => {
                get_products();
            });
            categoryList.appendChild(allOption);

            // Add categories to the list
            data.forEach(category => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <input type="radio" name="category" id="category-${category.category_id}" value="${category.category_id}">
                    <label for="category-${category.category_id}">${category.category_name}</label>`;
                li.addEventListener("click", () => {
                    filterProductsByCategory(category.category_id);
                });
                categoryList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            categoryList.innerHTML = "<li>Error loading categories</li>";
        });

    // Function to filter products by category
    function filterProductsByCategory(categoryId) {
        const minPrice = minPriceInput.value || 0;
        const maxPrice = maxPriceInput.value || Number.MAX_SAFE_INTEGER;

        fetch(`${productsEndpoint}?category_id=${categoryId}&min_price=${minPrice}&max_price=${maxPrice}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                renderProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productGrid.innerHTML = "<p>Error loading products</p>";
            });
    }

    // Function to filter products by price range
    filterButton.addEventListener("click", () => {
        const minPrice = minPriceInput.value || 0;
        const maxPrice = maxPriceInput.value || Number.MAX_SAFE_INTEGER;

        fetch(`${productsEndpoint}?min_price=${minPrice}&max_price=${maxPrice}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                renderProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productGrid.innerHTML = "<p>Error loading products</p>";
            });
    });

    // Function to reset filters
    resetButton.addEventListener("click", () => {
        // Clear price inputs
        minPriceInput.value = "";
        maxPriceInput.value = "";

        // Reset to "All" category
        document.getElementById("category-all").checked = true;

        // Reload all products
        get_products();
    });

    // Function to render products
    function renderProducts(data) {
        // Clear existing products
        let html = "";
        let num_of_products = data.length;

        // Add filtered products to the grid
        for (let i = 0; i < num_of_products; ++i) {
            html += `
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
        productGrid.innerHTML = html;

        // Add click event to each product card
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function () {
                const productId = this.dataset.productId;
                // Redirect to product detail page
                window.location.href = `./productdetail.html?id=${productId}`;
            });
        });
    }
});