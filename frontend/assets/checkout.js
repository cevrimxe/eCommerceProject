// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- Get References to Form Elements ---
    // It's strongly recommended to add unique IDs to these elements in your HTML
    // for more reliable selection. Using attribute selectors here as fallback.
    const form = document.querySelector('.billing-form'); // The main form

    const firstNameField = form.querySelector('input[placeholder="First Name"]');
    const lastNameField = form.querySelector('input[placeholder="Last Name"]');
    const companyNameField = form.querySelector('input[placeholder="Company Name (Optional)"]');
    const addressField = form.querySelector('input[placeholder="Address"].full-width'); // Be specific
    const countrySelect = form.querySelector('select:nth-of-type(1)'); // Assuming order
    const regionStateSelect = form.querySelector('select:nth-of-type(2)'); // Assuming order
    const citySelect = form.querySelector('select:nth-of-type(3)'); // Assuming order
    const zipCodeField = form.querySelector('input[placeholder="Zip Code"]');
    const emailField = form.querySelector('input[placeholder="Email"]');
    const phoneNumberField = form.querySelector('input[placeholder="Phone Number"]');
    const shipDifferentCheckbox = form.querySelector('input[type="checkbox"]'); // Only one checkbox assumed
    const paymentMethodRadios = form.querySelectorAll('input[name="pay"]'); // Get all radio buttons
    const cardNameField = form.querySelector('input[placeholder="Name on Card"]');
    const cardNumberField = form.querySelector('input[placeholder="Card Number"]');
    const cardExpiryField = form.querySelector('input[placeholder="MM/YY"]');
    const cardCvcField = form.querySelector('input[placeholder="CVC"]');
    const additionalNotesField = form.querySelector('textarea[placeholder^="Notes about your order"]'); // Use starts-with selector

    // Helper function to create unique sessionStorage keys
    const getKey = (fieldName) => `checkout_${fieldName}`;

    // --- Load Values from sessionStorage on Page Load ---
    const loadFormData = () => {
        // Text/Email/Textarea fields
        const textFields = {
            firstName: firstNameField,
            lastName: lastNameField,
            companyName: companyNameField,
            address: addressField,
            zipCode: zipCodeField,
            email: emailField,
            phoneNumber: phoneNumberField,
            cardName: cardNameField,
            cardNumber: cardNumberField,
            cardExpiry: cardExpiryField,
            cardCvc: cardCvcField,
            additionalNotes: additionalNotesField
        };

        for (const name in textFields) {
            const element = textFields[name];
            const storedValue = sessionStorage.getItem(getKey(name));
            if (element && storedValue !== null) {
                element.value = storedValue;
            }
        }

        // Select fields
        const selectFields = {
            country: countrySelect,
            regionState: regionStateSelect,
            city: citySelect
        };
        for (const name in selectFields) {
             const element = selectFields[name];
             const storedValue = sessionStorage.getItem(getKey(name));
             if (element && storedValue !== null) {
                 element.value = storedValue;
             }
        }

        // Checkbox field
        const storedShipDifferent = sessionStorage.getItem(getKey('shipDifferentAddress'));
        if (shipDifferentCheckbox && storedShipDifferent !== null) {
            shipDifferentCheckbox.checked = storedShipDifferent === 'true'; // Convert string back to boolean
        }

        // Radio button group (Payment Method)
        const storedPaymentMethod = sessionStorage.getItem(getKey('paymentMethod'));
        if (storedPaymentMethod !== null) {
            paymentMethodRadios.forEach(radio => {
                if (radio.value === storedPaymentMethod) {
                    radio.checked = true;
                }
            });
        }
    };

    // --- Save Values to sessionStorage on Input/Change ---
    const addSaveListener = (element, key, eventType = 'input') => {
        if (element) {
            element.addEventListener(eventType, (event) => {
                let valueToStore;
                if (event.target.type === 'checkbox') {
                    valueToStore = event.target.checked; // Store boolean
                } else {
                    valueToStore = event.target.value;
                }
                sessionStorage.setItem(key, valueToStore);
            });
        } else {
            console.warn(`Checkout form element for key "${key}" not found. Check your selectors or HTML.`);
        }
    };

    // Add listeners for text/email/textarea fields (save on 'input')
    addSaveListener(firstNameField, getKey('firstName'));
    addSaveListener(lastNameField, getKey('lastName'));
    addSaveListener(companyNameField, getKey('companyName'));
    addSaveListener(addressField, getKey('address'));
    addSaveListener(zipCodeField, getKey('zipCode'));
    addSaveListener(emailField, getKey('email'));
    addSaveListener(phoneNumberField, getKey('phoneNumber'));
    addSaveListener(cardNameField, getKey('cardName'));
    addSaveListener(cardNumberField, getKey('cardNumber'));
    addSaveListener(cardExpiryField, getKey('cardExpiry'));
    addSaveListener(cardCvcField, getKey('cardCvc'));
    addSaveListener(additionalNotesField, getKey('additionalNotes'));

    // Add listeners for select fields (save on 'change')
    addSaveListener(countrySelect, getKey('country'), 'change');
    addSaveListener(regionStateSelect, getKey('regionState'), 'change');
    addSaveListener(citySelect, getKey('city'), 'change');


    // Add listener for checkbox (save on 'change')
    addSaveListener(shipDifferentCheckbox, getKey('shipDifferentAddress'), 'change');

    // Add listeners for radio buttons (save on 'change')
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            // Only save if this radio button is the one being checked
            if (event.target.checked) {
                sessionStorage.setItem(getKey('paymentMethod'), event.target.value);
            }
        });
    });

    // --- Initial Load ---
    loadFormData();

    // --- Optional: Clear sessionStorage on successful order placement ---
    // You would typically call this function *after* the order is successfully
    // submitted to your backend and you get a success response.
    const clearCheckoutSessionData = () => {
        const keysToRemove = [
            getKey('firstName'), getKey('lastName'), getKey('companyName'),
            getKey('address'), getKey('country'), getKey('regionState'),
            getKey('city'), getKey('zipCode'), getKey('email'),
            getKey('phoneNumber'), getKey('shipDifferentAddress'), getKey('paymentMethod'),
            getKey('cardName'), getKey('cardNumber'), getKey('cardExpiry'),
            getKey('cardCvc'), getKey('additionalNotes')
        ];
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
        console.log('Checkout session data cleared.');
    };

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