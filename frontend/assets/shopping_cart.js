document.addEventListener('DOMContentLoaded', function () {
    get_cart();
});

const indexToCartIdMap = {}; // Keep using this as per original code

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

            // Clear the map before repopulating
            Object.keys(indexToCartIdMap).forEach(key => delete indexToCartIdMap[key]);
            data.cart_items.forEach((item, index) => {
              indexToCartIdMap[index] = item.cartt_id;
            });

            // Get the table body element where rows will be added
            const tableBody = document.querySelector('table tbody');

            // Clear existing rows before adding new ones
            tableBody.innerHTML = '';

            // Loop through the cart items and add them to the table
            for (let i = 0; i < number_of_cartitems; ++i) {
                const newRow = document.createElement('tr');

                newRow.innerHTML = `
                    <td>
                        <img src="../assets/images/${cartItems[i].product_id}/${cartItems[i].product_id} cover.png" alt="Product Image">
                        <span>${cartItems[i].product_name}</span>
                    </td>
                    <td>$${cartItems[i].price}</td>
                    <td>
                        <div class="qty">
                            <button onclick="change_quantity_visual(this, -1)">-</button>
                            <input type="text" value="${cartItems[i].quantity}">
                            <button onclick="change_quantity_visual(this, 1)">+</button>
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
            // Handle case where cart might be empty or data incorrect
            const tableBody = document.querySelector('table tbody');
            if(tableBody) {
                tableBody.innerHTML = ''; // Clear it
                // Optionally display empty message here
            }
            updateCartTotals(); // Ensure totals are zeroed out if cart is empty
            console.log("No cart items found or data format is incorrect.");
        }
    })
    .catch(error => {
      console.error('Error fetching get_cart.php:', error);
    });
}

function change_quantity_visual(button, offset)
{
    const quantityInput = button.closest('.qty').querySelector('input');
    let currentQuantity = parseInt(quantityInput.value);
    // Prevent NaN issues if input is somehow invalid
    if (isNaN(currentQuantity)) {
        currentQuantity = 0;
    }
    const newQuantity = currentQuantity + offset; // Calculate new quantity first

    const row = button.closest('tr');
    // const rowIndex = Array.from(row.parentElement.children).indexOf(row); // Index calculation kept as is

    // Don't let quantity visually go below 0 before backend call
    const displayQuantity = Math.max(0, newQuantity);
    quantityInput.value = displayQuantity;

    // Update the sub-total based on the new visual quantity
    const priceCell = button.closest('tr').querySelector('td:nth-child(2)');
    // Handle potential errors finding cells or parsing price
    let price = 0;
    if (priceCell) {
        price = parseFloat(priceCell.textContent.replace(/[^0-9.]/g, '')) || 0;
    }
    const subtotalCell = button.closest('tr').querySelector('td:nth-child(4)');
    if (subtotalCell) {
        subtotalCell.textContent = `$${(price * displayQuantity).toFixed(2)}`;
    }

    // update the cart totals after changing quantity visually
    updateCartTotals();

    // Call backend with the actual calculated newQuantity (which could be 0 or less)
    change_quantity_db(button, newQuantity);
}

function change_quantity_db(button, new_quantity)
{
    const row = button.closest('tr'); // Get the row associated with the button clicked
    const tableBody = row.parentElement; // Get the tbody element
    // constructing an entire array just to find index of button's row D: (Kept as original)
    const rowIndex = Array.from(tableBody.children).indexOf(row);

    // the mapping is stored when we first do GET cart so we don't have to do another GET when we want to PUT (Kept as original)
    const cartt_id = indexToCartIdMap[rowIndex];

    // If cartt_id is somehow undefined (e.g., mapping issue), maybe stop
    if (cartt_id === undefined) {
        console.error(`Could not find cartt_id for row index ${rowIndex}. Map:`, indexToCartIdMap);
        alert("Error identifying cart item. Please refresh.");
        return;
    }

    const p = {
        id: cartt_id,
        user_id: parseInt(localStorage.getItem('user_id')),
        quantity: new_quantity, // Use the actual calculated quantity for backend logic
    };
    console.log("Backend update info: ", p);

    // --- DELETE LOGIC ---
    // Use the actual calculated new_quantity (can be <= 0) for the condition
    if (new_quantity <= 0)
    {
        console.log("Initiating delete for cart item id:", p.id);

        fetch(`../../backend/api/cart/delete_cartbyid.php?id=${p.id}&user_id=${p.user_id}`)
        .then(response => {
            // Basic check if response seems ok (status 200-299)
            // You might want more specific checks (e.g., for 204 No Content)
            if (!response.ok) {
                 // If response is not ok, throw an error to be caught by .catch
                 // Try to parse JSON error message if backend provides one
                 return response.json().catch(() => null).then(errData => {
                     throw new Error(errData?.message || `Server error: ${response.status}`);
                 });
            }
             return response.json(); // Or handle 204 No Content specifically if needed
        })
        .then(data => {
            console.log("DELETE successful:", data);
            // *** THE MINIMAL FIX IS HERE ***
            row.remove(); // Remove the row from the table visually
            updateCartTotals(); // Update totals after removing the row
            // *** END FIX ***

            // Remove the entry from the mapping as well to prevent issues if user somehow adds it back without refresh
            delete indexToCartIdMap[rowIndex];
            // Note: Subsequent indexes in the map will now be incorrect relative to the DOM until the next get_cart() call.
            // This is a limitation of the index-based mapping approach after deletions.
        })
        .catch(error => {
          console.error('Error during DELETE request:', error);
          alert(`Failed to remove item: ${error.message}. Please refresh.`);
          // Optional: Consider reloading the cart state on error
          // get_cart();
        });
        return; // Stop further processing since it's a delete operation
    }

    // --- UPDATE (PUT) LOGIC --- (Kept as original)
    fetch(`../../backend/api/cart/put_cartbyid.php?id=${p.id}&user_id=${p.user_id}&quantity=${p.quantity}`)
    .then(response => response.json())
    .then(data => {
        console.log("PUT successful:", data);
        // Visual update already happened optimistically
    })
    .catch(error => {
      console.error('Error during PUT request:', error);
       alert(`Failed to update quantity: ${error.message}. Please refresh.`);
        // Optional: Consider reloading the cart state on error
        // get_cart();
    });
}

function route_via_button(new_location) // Kept as original
{
    window.location.href = new_location;
}

function updateCartTotals() { // Kept as original (with minor robustness for parsing)
    let subTotal = 0;

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        // Make sure it's a product row, not an empty message row etc.
        const subtotalCell = row.querySelector('td:nth-child(4)');
        if(subtotalCell) {
            const subtotalText = subtotalCell.textContent || '$0';
            // Use regex for potentially more robust parsing if needed
            subTotal += parseFloat(subtotalText.replace(/[^0-9.]/g, '')) || 0;
        }
    });

    // Update the sub-total and total fields (Selectors kept as original)
    const subtotalElement = document.querySelector('.cart-summary .card ul li span:nth-child(2)');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subTotal.toFixed(2)}`;
    }

    // Calculate and display the final total (Logic kept as original)
    const shippingCost = 0; // Assume free shipping
    const discount = 24; // Assuming a fixed discount
    const tax = 61.99; // Assuming a fixed tax

    const total = subTotal + shippingCost - discount + tax;

    const totalElement = document.querySelector('.cart-summary .card ul li.total span:nth-child(2)');
     if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)} USD`;
    }
}