// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to form elements
    const formElements = getFormElements();
    // 2. Load any existing data from sessionStorage
    loadFormData(formElements);
    // 3. Attach listeners to save data as user interacts with the form
    attachSaveListeners(formElements);
    // 4. Attempt to autofill address from database
    autofillBillingAddress(formElements);


    const cart_data = {
        items: [], // Start with an empty array to push items into
        shippingCost: 0,       // Represents "Free"
        discountAmount: 24.00,
        taxAmount: 61.99
    };

    // Ensure user_id is fetched from localStorage correctly for the fetch URL
    const userId = localStorage.getItem('user_id');
    const fetchstr = `../../backend/api/cart/get_cart.php${userId ? '?user_id=' + userId : ''}`;


    console.log("beforefetch cart data");
    fetch(fetchstr, { credentials: 'include' }) // Added credentials for session
    .then(response => response.json())
    .then(data => {
    // Ensure the cart_items array is present and contains items
    if (data.cart_items && Array.isArray(data.cart_items))
        {
            data.cart_items.forEach(sourceItem => {
            const newItem = {
                product_name: sourceItem.product_name,
                quantity: sourceItem.quantity,
                price: sourceItem.price
            };
            cart_data.items.push(newItem);
            });
            console.log("summary to be displayed: ", cart_data);
            populateSummaryInnerHTML(cart_data); // This will re-create the button

            // Re-select and attach listener to the newly created button
            const placeOrderButton = document.querySelector('.summary-box .order-button');
            if (placeOrderButton) {
                placeOrderButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const currentUserId = localStorage.getItem('user_id'); // Get fresh user_id
                    const orderstr = `../../backend/api/order/post_orders.php${currentUserId ? '?user_id=' + currentUserId : ''}`;

                    fetch(orderstr, { credentials: 'include' }) // Added credentials
                    .then(response => response.json())
                    .then(data => {
                        console.log("POST'ed order, data:", data);
                        clearCheckoutSessionData(formElements); // Clear form after successful order
                        window.location.href = './checkout_success.html';
                    })
                    .catch(error => {
                        console.log('Error fetching post_orders.php:', error);
                      });
                });
            } else {
                console.log("Place order button not found after populating summary.");
            }
        } else {
            console.log("No cart items found or data.cart_items is not an array:", data);
            populateSummaryInnerHTML(cart_data); // Still populate summary to show empty cart & button
             // Re-select and attach listener to the newly created button (even for empty cart)
            const placeOrderButton = document.querySelector('.summary-box .order-button');
            if (placeOrderButton) {
                placeOrderButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    alert("Your cart is empty. Please add items before placing an order.");
                });
            }
        }
    })
    .catch(error => {
      console.log('Error fetching get_cart.php:', error);
      populateSummaryInnerHTML(cart_data); // Populate with empty cart if fetch fails
       // Re-select and attach listener
      const placeOrderButton = document.querySelector('.summary-box .order-button');
      if (placeOrderButton) {
          placeOrderButton.addEventListener('click', (event) => {
              event.preventDefault();
              alert("Could not load cart. Please try again.");
          });
      }
    });
}); // End DOMContentLoaded


// Helper function to create unique sessionStorage keys
const getKey = (fieldName) => `checkout_${fieldName}`;

// Function to get references to all relevant form elements
const getFormElements = () => {
    const form = document.querySelector('.billing-form');
    if (!form) {
        return null;
    }
    return {
        form: form,
        firstName: form.querySelector('input[name="billing_first_name"]'), // Use name attributes added previously
        lastName: form.querySelector('input[name="billing_last_name"]'),
        companyName: form.querySelector('input[name="billing_company"]'),
        address: form.querySelector('input[name="billing_address"]'),
        country: form.querySelector('select[name="billing_country"]'),
        regionState: form.querySelector('select[name="billing_state"]'), // Assuming you add name="billing_state"
        city: form.querySelector('select[name="billing_city"]'),
        zipCode: form.querySelector('input[name="billing_postal_code"]'), // Changed to match common field name
        email: form.querySelector('input[name="billing_email"]'),
        phoneNumber: form.querySelector('input[name="billing_phone"]'),
        shipDifferentCheckbox: form.querySelector('input[type="checkbox"]'), // This one is fine by type
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
    if (!elements) return;

    const textInputFields = ['firstName', 'lastName', 'companyName', 'address', 'zipCode', 'email', 'phoneNumber', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvc'];
    const selectFields = ['country', 'regionState', 'city'];
    const textareaFields = ['additionalNotes'];

    [...textInputFields, ...textareaFields].forEach(name => {
        const element = elements[name];
        const storedValue = sessionStorage.getItem(getKey(name));
        if (element && storedValue !== null) {
            element.value = storedValue;
        }
    });

    selectFields.forEach(name => {
        const element = elements[name];
        const storedValue = sessionStorage.getItem(getKey(name));
        if (element && storedValue !== null) {
            element.value = storedValue;
        }
    });

    const storedShipDifferent = sessionStorage.getItem(getKey('shipDifferentCheckbox'));
    if (elements.shipDifferentCheckbox && storedShipDifferent !== null) {
        elements.shipDifferentCheckbox.checked = storedShipDifferent === 'true';
    }

    const storedPaymentMethod = sessionStorage.getItem(getKey('paymentMethod'));
    if (elements.paymentMethodRadios && storedPaymentMethod !== null) {
        elements.paymentMethodRadios.forEach(radio => {
            if (radio.value === storedPaymentMethod) {
                radio.checked = true;
            }
        });
    }
     console.log("Form data loaded from sessionStorage.");
};

// Function to attach event listeners that save data to sessionStorage
const attachSaveListeners = (elements) => {
    if (!elements) return;

    const addListener = (elementName, eventType = 'input') => {
        const element = elements[elementName];
        const key = getKey(elementName);
        if (element) {
            element.addEventListener(eventType, (event) => {
                let valueToStore = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
                sessionStorage.setItem(key, valueToStore);
            });
        }
    };

    ['firstName', 'lastName', 'companyName', 'address', 'zipCode', 'email', 'phoneNumber', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvc', 'additionalNotes']
        .forEach(name => addListener(name, 'input'));
    ['country', 'regionState', 'city']
        .forEach(name => addListener(name, 'change'));
    addListener('shipDifferentCheckbox', 'change');

    if (elements.paymentMethodRadios) {
        const key = getKey('paymentMethod');
        elements.paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.checked) {
                    sessionStorage.setItem(key, event.target.value);
                }
            });
        });
    }
     console.log("Save listeners attached to form elements.");
};

// Function to clear all checkout-related data from sessionStorage
const clearCheckoutSessionData = (elements) => {
    // No need for elements if clearing all keys used by this script
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
    return (isNaN(number) || number <= 0) ? 'Free' : formatCurrency(number);
};

const populateSummaryInnerHTML = (cartData) => {
    const summaryBox = document.querySelector('.summary-box');
    if (!summaryBox) return;

    let subtotal = 0;
    if (cartData.items && cartData.items.length > 0) {
        cartData.items.forEach(item => {
            subtotal += (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0);
        });
    }

    let itemsHtml = '';
    if (!cartData.items || cartData.items.length === 0) {
        itemsHtml = `<p class="summary-message" style="text-align: center; padding: 10px 0;">Your cart is empty.</p>`;
        subtotal = 0;
    } else {
        itemsHtml = cartData.items.map(item => {
            const productName = item.product_name ? String(item.product_name).replace(/</g, "<").replace(/>/g, ">") : 'Unknown Product';
            return `
                <div class="summary-item">
                    <p>${productName}<br><span>${parseInt(item.quantity) || 0} × ${formatCurrency(item.price)}</span></p>
                </div>`;
        }).join('');
    }

    const shipping = parseFloat(cartData.shippingCost) || 0;
    const discount = parseFloat(cartData.discountAmount) || 0;
    const tax = parseFloat(cartData.taxAmount) || 0;
    const total = subtotal + shipping - discount + tax;

    const detailsHtml = `
        <div class="summary-details">
            <p>Subtotal <span>${formatCurrency(subtotal)}</span></p>
            <p>Shipping <span>${formatShipping(shipping)}</span></p>
            <p>Discount <span>-${formatCurrency(discount)}</span></p> {/* Added minus for discount display */}
            <p>Tax <span>${formatCurrency(tax)}</span></p>
            <p class="summary-total">Total <span>${formatCurrency(total)} USD</span></p>
        </div>`;

    summaryBox.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        ${itemsHtml}
        ${cartData.items && cartData.items.length > 0 ? '<hr />' : ''}
        ${detailsHtml}
        <button class="order-button">PLACE ORDER →</button>
    `;
    console.log("Order summary populated.");
};

// --- NEW FUNCTIONALITY: AUTOFILL BILLING ADDRESS ---
const autofillBillingAddress = (formElements) => {
    if (!formElements) return;

    const GET_ADDRESS_URL = '../../backend/api/address/get_address.php'; // Adjust path if necessary

    fetch(GET_ADDRESS_URL, {
        method: 'GET',
        credentials: 'include' // Important for PHP session
    })
    .then(response => response.json())
    .then(addresses => {
        if (addresses && addresses.length > 0) {
            const primaryBillingAddress = addresses[0]; // Use the first address

            // Fill only the fields your PHP provides: address, city, postal_code, country
            if (primaryBillingAddress.address && formElements.address) {
                formElements.address.value = primaryBillingAddress.address;
                sessionStorage.setItem(getKey('address'), primaryBillingAddress.address); // Also save to session
            }
            if (primaryBillingAddress.city && formElements.city) {
                formElements.city.value = primaryBillingAddress.city;
                sessionStorage.setItem(getKey('city'), primaryBillingAddress.city);
            }
            if (primaryBillingAddress.postal_code && formElements.zipCode) { // Matched to zipCode element
                formElements.zipCode.value = primaryBillingAddress.postal_code;
                sessionStorage.setItem(getKey('zipCode'), primaryBillingAddress.postal_code);
            }
            if (primaryBillingAddress.country && formElements.country) {
                formElements.country.value = primaryBillingAddress.country;
                sessionStorage.setItem(getKey('country'), primaryBillingAddress.country);
            }
            console.log("Billing address autofilled from database and saved to session.");
        } else {
            console.log("No addresses found for autofill or empty array returned.");
        }
    })
    .catch(error => {
        console.log('Error fetching addresses for autofill:', error);
    });
};

function route_via_button(new_location) {
    window.location.href = new_location;
}