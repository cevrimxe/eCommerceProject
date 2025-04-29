document.addEventListener('DOMContentLoaded', function () {
    get_cart();
});

function get_cart()
{
    const fetchstr = `../../backend/api/cart/get_cart.php?user_id=${localStorage.getItem('user_id')}`
    console.log("fetchstr: ", fetchstr);

    fetch(fetchstr)
    .then(response => response.json())
    .then(data => {
        console.log("Cart data: ", data);

        // Ensure the cart_items array is present and contains items
        if (data.cart_items && Array.isArray(data.cart_items)) {
            const cartItems = data.cart_items;
            let number_of_cartitems = cartItems.length;

            // Get the table body element where rows will be added
            const tableBody = document.querySelector('table tbody');

            // Clear existing rows before adding new ones
            tableBody.innerHTML = '';

            // Loop through the cart items and add them to the table
            for (let i = 0; i < number_of_cartitems; ++i) {
                const newRow = document.createElement('tr');

                // need product_id from get_cart

                newRow.innerHTML = `
                    <td>
                        <img src="../assets/products/${cartItems[i].product_id}.webp" alt="Product Image">
                        <span>${cartItems[i].product_name}</span>
                    </td>
                    <td>$${cartItems[i].price}</td>
                    <td>
                        <div class="qty">
                            <button onclick="change_quantity(this, -1)">-</button>
                            <input type="text" value="${cartItems[i].quantity}">
                            <button onclick="change_quantity(this, 1)">+</button>
                        </div>
                    </td>
                    <td>$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}</td>
                `;

                // Append the new row to the table body
                tableBody.appendChild(newRow);
            }

            // Optionally, update cart totals after adding new items
            updateCartTotals();
        } else {
            console.log("No cart items found or data format is incorrect.");
        }
    })
    .catch(error => {
      console.error('Error fetching get_cart.php:', error);
    });
}

function change_quantity(button, offset)
{
    const quantityInput = button.closest('.qty').querySelector('input');
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity += offset;

    if (currentQuantity < 1)
    {
        const row = button.closest('tr'); // Get the row containing the clicked button
        row.remove();
        
        // Optionally update the cart totals after removing a product
        updateCartTotals();
        return;
    }
    
    quantityInput.value = currentQuantity;
    
    // Update the sub-total based on the new quantity
    const priceCell = button.closest('tr').querySelector('td:nth-child(2)');
    const price = parseFloat(priceCell.textContent.replace('$', '').replace(',', ''));
    const subtotalCell = button.closest('tr').querySelector('td:nth-child(4)');
    subtotalCell.textContent = `$${(price * currentQuantity).toFixed(2)}`;
    
    // Optionally update the cart totals after changing quantity
    updateCartTotals();
}

function updateCartTotals() {
    let subTotal = 0;
    
    // Loop through all rows and sum up the sub-total values
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const subtotalText = row.querySelector('td:nth-child(4)').textContent;
        subTotal += parseFloat(subtotalText.replace('$', '').replace(',', ''));
    });
    
    // Update the sub-total and total fields
    const subtotalElement = document.querySelector('.cart-summary .card ul li span:nth-child(2)');
    subtotalElement.textContent = `$${subTotal.toFixed(2)}`;
    
    // Calculate and display the final total with tax, shipping, and discount
    const shippingCost = 0; // Assume free shipping
    const discount = 24; // Assuming a fixed discount
    const tax = 61.99; // Assuming a fixed tax
    
    const total = subTotal + shippingCost - discount + tax;
    
    const totalElement = document.querySelector('.cart-summary .card ul li.total span:nth-child(2)');
    totalElement.textContent = `$${total.toFixed(2)} USD`;
}
    