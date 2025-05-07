// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to form elements
    const formElements = getFormElements();
    // 2. Load any existing data from sessionStorage
    loadFormData(formElements);
    // 3. Attach listeners to save data as user interacts with the form
    attachSaveListeners(formElements);


    const cart_data = {
        items: [], // Start with an empty array to push items into
        shippingCost: 0,       // Represents "Free"
        discountAmount: 24.00,
        taxAmount: 61.99
    };

    const fetchstr = `../../backend/api/cart/get_cart.php?user_id=${localStorage.getItem('user_id')}`

    console.log("beforefetch");
    fetch(fetchstr)
    .then(response => response.json())
    .then(data => {
    // Ensure the cart_items array is present and contains items
    if (data.cart_items && Array.isArray(data.cart_items))
        {
            // Iterate over each item in the source data.cart_items array
            data.cart_items.forEach(sourceItem => {
            // Create a *new* item object with the desired structure
            const newItem = {
                product_name: sourceItem.product_name, // Copy product_name
                quantity: sourceItem.quantity,         // Copy quantity
                price: sourceItem.price                // Copy price
            };
        
            // Add (push) the newly created item object into the cart_data.items array
            cart_data.items.push(newItem);
            })
            console.log("summary to be displayed: ", cart_data);
            populateSummaryInnerHTML(cart_data);

            const placeOrderButton = document.querySelector('.order-button');

            if (placeOrderButton) {
                placeOrderButton.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default button behavior if it's not type="submit" or inside a form needing submission yet


                    const orderstr = `../../backend/api/order/post_orders.php?user_id=${localStorage.getItem('user_id')}`

                    fetch(orderstr)
                    .then(response => response.json())
                    .then(data => {
                        console.log("POST'ed order, data:", data);
                        window.location.href = './checkout_success.html';
                    })
                    .catch(error => {
                        console.error('Error fetching post_orders.php:', error);
                      });
        
                    // Assuming submission is successful:
                    // clearCheckoutSessionData();
                    // alert('Order placed successfully! Form data cleared from session.');
                });
            }
        }
    })
    .catch(error => {
      console.error('Error fetching get_cart.php:', error);
    });
}); // End DOMContentLoaded


// Helper function to create unique sessionStorage keys
const getKey = (fieldName) => `checkout_${fieldName}`;

// Function to get references to all relevant form elements
const getFormElements = () => {
    const form = document.querySelector('.billing-form');
    if (!form) {
        console.error("Billing form not found!");
        return null; // Return null if form doesn't exist
    }

    // It's still highly recommended to use unique IDs for robustness
    return {
        form: form, // Keep reference to the form itself if needed later
        firstName: form.querySelector('input[placeholder="First Name"]'),
        lastName: form.querySelector('input[placeholder="Last Name"]'),
        companyName: form.querySelector('input[placeholder="Company Name (Optional)"]'),
        address: form.querySelector('input[placeholder="Address"].full-width'),
        country: form.querySelector('select:nth-of-type(1)'),
        regionState: form.querySelector('select:nth-of-type(2)'),
        city: form.querySelector('select:nth-of-type(3)'),
        zipCode: form.querySelector('input[placeholder="Zip Code"]'),
        email: form.querySelector('input[placeholder="Email"]'),
        phoneNumber: form.querySelector('input[placeholder="Phone Number"]'),
        shipDifferentCheckbox: form.querySelector('input[type="checkbox"]'),
        paymentMethodRadios: form.querySelectorAll('input[name="pay"]'),
        cardName: form.querySelector('input[placeholder="Name on Card"]'),
        cardNumber: form.querySelector('input[placeholder="Card Number"]'),
        cardExpiry: form.querySelector('input[placeholder="MM/YY"]'),
        cardCvc: form.querySelector('input[placeholder="CVC"]'),
        additionalNotes: form.querySelector('textarea[placeholder^="Notes about your order"]')
    };
};

// Function to load saved data from sessionStorage into the form fields
const loadFormData = (elements) => {
    if (!elements) return; // Don't run if elements weren't found

    // Define field types for easier iteration
    const textInputFields = ['firstName', 'lastName', 'companyName', 'address', 'zipCode', 'email', 'phoneNumber', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvc'];
    const selectFields = ['country', 'regionState', 'city'];
    const textareaFields = ['additionalNotes'];

    // Load text/email/textarea fields
    [...textInputFields, ...textareaFields].forEach(name => {
        const element = elements[name];
        const storedValue = sessionStorage.getItem(getKey(name));
        if (element && storedValue !== null) {
            element.value = storedValue;
        }
    });

    // Load select fields
    selectFields.forEach(name => {
        const element = elements[name];
        const storedValue = sessionStorage.getItem(getKey(name));
        if (element && storedValue !== null) {
            element.value = storedValue;
        }
    });

    // Load checkbox field
    const storedShipDifferent = sessionStorage.getItem(getKey('shipDifferentCheckbox'));
    if (elements.shipDifferentCheckbox && storedShipDifferent !== null) {
        elements.shipDifferentCheckbox.checked = storedShipDifferent === 'true'; // Convert string back to boolean
    }

    // Load radio button group (Payment Method)
    const storedPaymentMethod = sessionStorage.getItem(getKey('paymentMethod'));
    if (elements.paymentMethodRadios && storedPaymentMethod !== null) {
        elements.paymentMethodRadios.forEach(radio => {
            // Use radio.value which should correspond to the stored value if set correctly in HTML
            if (radio.value === storedPaymentMethod) {
                radio.checked = true;
            }
        });
    }
     console.log("Form data loaded from sessionStorage.");
};

// Function to attach event listeners that save data to sessionStorage
const attachSaveListeners = (elements) => {
    if (!elements) return; // Don't run if elements weren't found

    // Internal helper for adding listeners
    const addListener = (elementName, eventType = 'input') => {
        const element = elements[elementName];
        const key = getKey(elementName);
        if (element) {
            element.addEventListener(eventType, (event) => {
                let valueToStore;
                if (event.target.type === 'checkbox') {
                    valueToStore = event.target.checked; // Store boolean as string 'true'/'false'
                } else {
                    valueToStore = event.target.value;
                }
                sessionStorage.setItem(key, valueToStore);
                // Optional: console.log(`Saved ${key}: ${valueToStore}`);
            });
        } else {
            console.warn(`Element "${elementName}" not found for attaching save listener.`);
        }
    };

    // Attach listeners for text/email/textarea fields (save on 'input')
    ['firstName', 'lastName', 'companyName', 'address', 'zipCode', 'email', 'phoneNumber', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvc', 'additionalNotes']
        .forEach(name => addListener(name, 'input'));

    // Attach listeners for select fields (save on 'change')
    ['country', 'regionState', 'city']
        .forEach(name => addListener(name, 'change'));

    // Attach listener for checkbox (save on 'change')
    addListener('shipDifferentCheckbox', 'change');

    // Attach listeners for radio buttons (save on 'change')
    if (elements.paymentMethodRadios) {
        const key = getKey('paymentMethod');
        elements.paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                // Only save if this radio button is the one being checked
                if (event.target.checked) {
                     // Store the 'value' attribute of the checked radio
                    sessionStorage.setItem(key, event.target.value);
                     // Optional: console.log(`Saved ${key}: ${event.target.value}`);
                }
            });
        });
    } else {
        console.warn(`Element "paymentMethodRadios" not found for attaching save listener.`);
    }
     console.log("Save listeners attached to form elements.");
};

// Function to clear all checkout-related data from sessionStorage
const clearCheckoutSessionData = (elements) => {
    if (!elements) return; // Need elements to know which keys to potentially clear

    const keysToRemove = [
        'firstName', 'lastName', 'companyName', 'address', 'country', 'regionState',
        'city', 'zipCode', 'email', 'phoneNumber', 'shipDifferentCheckbox',
        'paymentMethod', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvc', 'additionalNotes'
    ];

    keysToRemove.forEach(name => {
        sessionStorage.removeItem(getKey(name));
    });

    console.log('Checkout session data cleared.');
};

const formatCurrency = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '$0.00' : `$${number.toFixed(2)}`;
};

const formatShipping = (value) => {
    const number = parseFloat(value);
    // Treat 0, negative, or NaN as Free for display
    return (isNaN(number) || number <= 0) ? 'Free' : formatCurrency(number);
};

const populateSummaryInnerHTML = (cartData) => {
    const summaryBox = document.querySelector('.summary-box');
    if (!summaryBox) {
        console.error("Summary box element (.summary-box) not found!");
        return; // Cannot proceed if the target element doesn't exist
    }

    // --- 1. Calculate Subtotal ---
    let subtotal = 0;
    if (cartData.items && cartData.items.length > 0) {
        cartData.items.forEach(item => {
            const price = parseFloat(item.price) || 0; // Default to 0 if price is invalid
            const quantity = parseInt(item.quantity) || 0; // Default to 0 if quantity is invalid
            subtotal += price * quantity;
        });
    }

    // --- 2. Generate HTML for Cart Items ---
    let itemsHtml = '';
    if (!cartData.items || cartData.items.length === 0) {
        itemsHtml = `<p class="summary-message" style="text-align: center; padding: 10px 0;">Your cart is empty.</p>`;
        // Ensure subtotal is 0 if cart is empty
        subtotal = 0;
    } else {
        itemsHtml = cartData.items.map(item => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            // Basic sanitization placeholder - in real apps, consider a library if names can have HTML
            const productName = item.product_name ? String(item.product_name).replace(/</g, "<").replace(/>/g, ">") : 'Unknown Product';

            return `
                <div class="summary-item">
                    <p>${productName}<br><span>${quantity} × ${formatCurrency(price)}</span></p>
                </div>
            `;
        }).join(''); // Join the array of HTML strings into one string
    }

    // --- 3. Prepare Summary Values (use defaults if not provided) ---
    const shipping = parseFloat(cartData.shippingCost) || 0;
    const discount = parseFloat(cartData.discountAmount) || 0;
    const tax = parseFloat(cartData.taxAmount) || 0;

    // --- 4. Calculate Final Total ---
    // Ensure discount is subtracted correctly
    const total = subtotal + shipping - discount + tax;

    // --- 5. Generate HTML for Summary Details ---
    const detailsHtml = `
        <div class="summary-details">
            <p>Subtotal <span>${formatCurrency(subtotal)}</span></p>
            <p>Shipping <span>${formatShipping(shipping)}</span></p>
            <p>Discount <span>${formatCurrency(discount)}</span></p>
            <p>Tax <span>${formatCurrency(tax)}</span></p>
            <p class="summary-total">Total <span>${formatCurrency(total)} USD</span></p>
        </div>
    `;

    // --- 6. Assemble Final HTML and Update DOM ---
    summaryBox.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        ${itemsHtml}
        ${cartData.items && cartData.items.length > 0 ? '<hr />' : ''}
        ${detailsHtml}
        <button class="order-button">PLACE ORDER →</button>
    `;

    console.log("Order summary populated using innerHTML.");

    // Optional: Re-attach any event listeners needed for the new button if necessary
    // e.g., addPlaceOrderListener();
};

function route_via_button(new_location)
{
    window.location.href = new_location;
}