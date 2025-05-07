function getAddressData(containerId)
{
    const container = document.getElementById(containerId);
    if (!container) return null;

    const data = {
        address: container.querySelector('input[name="address"]').value.trim(),
        city: container.querySelector('input[name="city"]').value.trim(),
        postal_code: container.querySelector('input[name="postal_code"]').value.trim(),
        country: container.querySelector('input[name="country"]').value.trim()
    };
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
/*     const save_billing_button = document.querySelector('#saveBillingAddressBtn');

    if (save_billing_button)
    {
        save_billing_button.addEventListener('click', (event) =>
        {
            event.preventDefault();
            console.log("PRESSED BILLING BUTTON");
            
            const billingForm = document.getElementById('billingAddressContainer');
            const addressData = {
                address: billingForm.querySelector('input[name="address"]').value,
                city: billingForm.querySelector('input[name="city"]').value,
                postal_code: billingForm.querySelector('input[name="postal_code"]').value,
                country: billingForm.querySelector('input[name="country"]').value
            };

            fetch(`../../backend/api/address/post_address.php`, { // Ensure URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData),
                credentials: 'include' // For PHP session cookies
            })
            .then(response => response.json())
            .then(data => {
                console.log("POST bill successful:", data);

                localStorage.setItem('userHasBillingAddress', "true");
            })
            .catch(error => {
            console.error('Error during POST request:', error);
            });
        }
        )
    } */

    const save_shipping_button = document.querySelector('#saveShippingAddressBtn');
    if (save_shipping_button)
        {
            save_shipping_button.addEventListener('click', (event) =>
            {
                event.preventDefault();
                console.log("PRESSED SHIPPING BUTTON");

                if (localStorage.getItem('userHasShippingAddress') !== "true")
                {
                    console.log("user doesn't have shipping addres, adding...");
                    const shippingForm = document.getElementById('shippingAddressContainer');
                    const addressData = {
                        address: shippingForm.querySelector('input[name="address"]').value,
                        city: shippingForm.querySelector('input[name="city"]').value,
                        postal_code: shippingForm.querySelector('input[name="postal_code"]').value,
                        country: shippingForm.querySelector('input[name="country"]').value
                    };
        
                    fetch(`../../backend/api/address/post_address.php`, { // Ensure URL is correct
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(addressData),
                        credentials: 'include' // For PHP session cookies
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("POST bill successful:", data);
                        
                        console.log(`shipping address is ${data.add_id}`)
                        localStorage.setItem('userHasShippingAddress', "true");
                        localStorage.setItem('ShippingAddress_id', data.add_id);
                    })
                    .catch(error => {
                    console.error('Error during POST request:', error);
                    });
                }
                else // adddress already set once, put
                {
                    console.log(`user has shipping addres ${localStorage.getItem('ShippingAddress_id')}, updating...`);

                    const shippingForm = document.getElementById('shippingAddressContainer');
                    const addressData = {
                        add_id: localStorage.getItem('ShippingAddress_id'),
                        address: shippingForm.querySelector('input[name="address"]').value,
                        city: shippingForm.querySelector('input[name="city"]').value,
                        postal_code: shippingForm.querySelector('input[name="postal_code"]').value,
                        country: shippingForm.querySelector('input[name="country"]').value
                    };
        
                    fetch(`../../backend/api/address/put_address.php?add_id=${localStorage.getItem('ShippingAddress_id')}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(addressData),
                        credentials: 'include' // For PHP session cookies
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("PUT ship :", data);
                        
                    })
                    .catch(error => {
                    console.error('Error during PUT request:', error);
                    });
                }
            }
            )
        }
});
