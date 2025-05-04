// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to form elements
    const formElements = getFormElements();
    // 2. Load any existing data from sessionStorage
    loadFormData(formElements);
    // 3. Attach listeners to save data as user interacts with the form
    attachSaveListeners(formElements);

    // Example: Attach clearing to the place order button click (you'll likely have form submission logic here)
    const placeOrderButton = document.querySelector('.order-button');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button behavior if it's not type="submit" or inside a form needing submission yet

            // --- !!! ---
            // --- ADD YOUR ACTUAL ORDER SUBMISSION LOGIC HERE (e.g., fetch POST request) ---
            // --- !!! ---
            console.log('Simulating order placement...');

            // Assuming submission is successful:
            // clearCheckoutSessionData();
            // alert('Order placed successfully! Form data cleared from session.');
            // Optionally redirect: window.location.href = 'order-confirmation.html';

            // For now, just log and *don't* clear, so you can see persistence working
            alert('Place Order button clicked! (Session data is still stored for demo purposes)');

        });
    }

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