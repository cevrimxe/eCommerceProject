function getAddressData(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Address container with ID "${containerId}" not found.`);
        return null;
    }

    const data = {
        address: container.querySelector('input[name="address"]').value.trim(),
        city: container.querySelector('input[name="city"]').value.trim(),
        postal_code: container.querySelector('input[name="postal_code"]').value.trim(),
        country: container.querySelector('input[name="country"]').value.trim()
    };

    // Basic validation within the function (optional but good)
    if (!data.address || !data.city || !data.postal_code || !data.country) {
        console.warn(`Some fields are empty for container ${containerId}`);
        // You might want to alert the user or handle this more gracefully
        // For now, we'll let the calling function decide if it's an error
    }
    return data;
}

document.addEventListener('DOMContentLoaded', () => {

    const save_billing_button = document.querySelector('#saveBillingAddressBtn');
    if (save_billing_button) {
        save_billing_button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("PRESSED billing BUTTON");

            const billingContainerId = 'billingAddressContainer';
            const hasBillingKey = 'userHasBillingAddress';
            const billingIdKey = 'BillingAddress_id';

            let addressData = getAddressData(billingContainerId);
            if (!addressData) return; // Stop if container not found by getAddressData

            // More specific validation for POST
            if (localStorage.getItem(hasBillingKey) !== "true") {
                if (!addressData.address || !addressData.city || !addressData.postal_code || !addressData.country) {
                    console.error("All billing address fields are required to create a new address.");
                    // alert("Please fill all billing address fields to save.");
                    return;
                }

                console.log("User doesn't have billing address, adding...");
                fetch(`../../backend/api/address/post_address.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(addressData),
                    credentials: 'include'
                })
                .then(response => response.json()) // Add .ok check here ideally
                .then(data => {
                    console.log("POST billing successful:", data);
                    if (data.add_id) {
                        console.log(`Billing address ID is ${data.add_id}`);
                        localStorage.setItem(hasBillingKey, "true");
                        localStorage.setItem(billingIdKey, data.add_id);
                    } else {
                        console.error("POST billing response did not include add_id:", data);
                    }
                })
                .catch(error => {
                    console.error('Error during POST billing request:', error);
                });
            } else { // Address already set once, PUT
                const existingBillingId = localStorage.getItem(billingIdKey);
                if (!existingBillingId) {
                    console.error("Billing address exists flag is true, but no BillingAddress_id found in localStorage.");
                    // Optionally, reset the flag: localStorage.setItem(hasBillingKey, "false");
                    return;
                }
                console.log(`User has billing address (ID: ${existingBillingId}), updating...`);

                // For PUT, include add_id in the body
                const updateData = { ...addressData, add_id: existingBillingId };

                fetch(`../../backend/api/address/put_address.php`, { // Removed add_id from URL
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData),
                    credentials: 'include'
                })
                .then(response => response.json()) // Add .ok check here ideally
                .then(data => {
                    console.log("PUT billing successful:", data);
                })
                .catch(error => {
                    console.error('Error during PUT billing request:', error);
                });
            }
        });
    }

    // ----------------------- SHIPPING -----------------------
    const save_shipping_button = document.querySelector('#saveShippingAddressBtn');
    if (save_shipping_button) {
        save_shipping_button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("PRESSED SHIPPING BUTTON");

            const shippingContainerId = 'shippingAddressContainer';
            const hasShippingKey = 'userHasShippingAddress';
            const shippingIdKey = 'ShippingAddress_id';

            let addressData = getAddressData(shippingContainerId);
            if (!addressData) return;

            if (localStorage.getItem(hasShippingKey) !== "true") {
                 if (!addressData.address || !addressData.city || !addressData.postal_code || !addressData.country) {
                    console.error("All shipping address fields are required to create a new address.");
                    // alert("Please fill all shipping address fields to save.");
                    return;
                }
                console.log("User doesn't have shipping address, adding...");
                fetch(`../../backend/api/address/post_address.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(addressData),
                    credentials: 'include'
                })
                .then(response => response.json()) // Add .ok check
                .then(data => {
                    console.log("POST shipping successful:", data);
                    if (data.add_id) {
                        console.log(`Shipping address ID is ${data.add_id}`);
                        localStorage.setItem(hasShippingKey, "true");
                        localStorage.setItem(shippingIdKey, data.add_id);
                    } else {
                        console.error("POST shipping response did not include add_id:", data);
                    }
                })
                .catch(error => {
                    console.error('Error during POST shipping request:', error);
                });
            } else { // Address already set once, PUT
                const existingShippingId = localStorage.getItem(shippingIdKey);
                if (!existingShippingId) {
                    console.error("Shipping address exists flag is true, but no ShippingAddress_id found in localStorage.");
                    // Optionally, reset the flag: localStorage.setItem(hasShippingKey, "false");
                    return;
                }
                console.log(`User has shipping address (ID: ${existingShippingId}), updating...`);

                const updateData = { ...addressData, add_id: existingShippingId };

                fetch(`../../backend/api/address/put_address.php`, { // Removed add_id from URL
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData),
                    credentials: 'include'
                })
                .then(response => response.json()) // Add .ok check
                .then(data => {
                    console.log("PUT shipping successful:", data);
                })
                .catch(error => {
                    console.error('Error during PUT shipping request:', error);
                });
            }
        });
    }
});