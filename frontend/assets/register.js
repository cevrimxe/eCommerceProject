
// Select the form and input fields
const form = document.querySelector('form');

const nameField = document.querySelector('#name');
const lastnameField = document.querySelector('#last-name');
const phoneField = document.querySelector('#phone');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirm-password');
const termsField = document.querySelector('#terms');

const errorMessageField = document.querySelector('#error-message');

// Check if there is stored data in sessionStorage and populate the form fields
window.onload = function () {
    if (sessionStorage.getItem('name')) {
        nameField.value = sessionStorage.getItem('name');
    }
    if (sessionStorage.getItem('last-name')) {
        lastnameField.value = sessionStorage.getItem('last-name');
    }
    if (sessionStorage.getItem('phone')) {
        phoneField.value = sessionStorage.getItem('phone');
    }
    if (sessionStorage.getItem('email')) {
        emailField.value = sessionStorage.getItem('email');
    }
    if (sessionStorage.getItem('password')) {
        passwordField.value = sessionStorage.getItem('password');
    }
    if (sessionStorage.getItem('confirm-password')) {
        confirmPasswordField.value = sessionStorage.getItem('confirm-password');
    }
    termsField.checked = sessionStorage.getItem('terms') === 'true';
};

// Store values in sessionStorage as the user types
nameField.addEventListener('input', function () {
    sessionStorage.setItem('name', nameField.value);
});

lastnameField.addEventListener('input', function () {
    sessionStorage.setItem('last-name', lastnameField.value);
});

phoneField.addEventListener('input', function () {
    sessionStorage.setItem('phone', phoneField.value);
});

emailField.addEventListener('input', function () {
    sessionStorage.setItem('email', emailField.value);
});

passwordField.addEventListener('input', function () {
    sessionStorage.setItem('password', passwordField.value);
});

confirmPasswordField.addEventListener('input', function () {
    sessionStorage.setItem('confirm-password', confirmPasswordField.value);
});

// Use 'change' or 'input' for checkbox
termsField.addEventListener('change', function () {
    sessionStorage.setItem('terms', termsField.checked); // store as boolean
});

function register(user) {
    fetch('../../backend/api/auth/register.php', {
        method: 'POST', // Use POST for sending data
        headers: {
            'Content-Type': 'application/json'  // Tell PHP we're sending JSON data
        },
        body: JSON.stringify(user)  // Convert the user object to a JSON string
    })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Handle the response, for example, log a success message
            console.log(data);
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values of the inputs
    const name_val = nameField.value;
    const lastname_val = lastnameField.value;
    const phone_val = phoneField.value;
    const email_val = emailField.value;
    const password_val = passwordField.value;
    const confirmPassword_val = confirmPasswordField.value;
    const terms_val = termsField.checked;

    // Check if the passwords match
    if (password_val !== confirmPassword_val) {
        errorMessageField.style.display = 'block';
    }
    else {
        errorMessageField.style.display = 'none';

        const new_user = {
            password: password_val,
            email: email_val,
            phone: phone_val,
            first_name: name_val,
            last_name: lastname_val,
        };
        console.log(new_user);

        fetch('../../backend/api/auth/register.php', {
            method: 'POST', // Use POST for sending data
            headers: {
                'Content-Type': 'application/json'  // Tell PHP we're sending JSON data
            },
            body: JSON.stringify(new_user)  // Convert the user object to a JSON string
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Handle the response, for example, log a success message
            console.log(data);

            sessionStorage.removeItem('name');
            sessionStorage.removeItem('last-name');
            sessionStorage.removeItem('phone');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('password');
            sessionStorage.removeItem('confirm-password');
            sessionStorage.removeItem('terms');
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    }
}
);


// Get the eye icons
const eyeIcons = document.querySelectorAll('.eye');

// Add event listeners to each eye icon to toggle password visibility
eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', function () {
        const passwordField = this.previousElementSibling;
        const isPasswordVisible = passwordField.type === 'text';

        // Toggle the type between 'password' and 'text' to show/hide password
        passwordField.type = isPasswordVisible ? 'password' : 'text';
    });
});
