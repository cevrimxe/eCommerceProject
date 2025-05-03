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
const resultMessageField = document.querySelector('#result-message');

// Check if there is stored data in sessionStorage and populate the form fields
window.onload = function () {
    if (sessionStorage.getItem('name_register')) {
        nameField.value = sessionStorage.getItem('name_register');
    }
    if (sessionStorage.getItem('last-name_register')) {
        lastnameField.value = sessionStorage.getItem('last-name_register');
    }
    if (sessionStorage.getItem('phone_register')) {
        phoneField.value = sessionStorage.getItem('phone_register');
    }
    if (sessionStorage.getItem('email_register')) {
        emailField.value = sessionStorage.getItem('email_register');
    }
    if (sessionStorage.getItem('password_register')) {
        passwordField.value = sessionStorage.getItem('password_register');
    }
    if (sessionStorage.getItem('confirm-password_register')) {
        confirmPasswordField.value = sessionStorage.getItem('confirm-password_register');
    }
    termsField.checked = sessionStorage.getItem('terms_register') === 'true';
};

// Store values in sessionStorage as the user types
nameField.addEventListener('input', function () {
    sessionStorage.setItem('name_register', nameField.value);
});
lastnameField.addEventListener('input', function () {
    sessionStorage.setItem('last-name_register', lastnameField.value);
});
phoneField.addEventListener('input', function () {
    sessionStorage.setItem('phone_register', phoneField.value);
});
emailField.addEventListener('input', function () {
    sessionStorage.setItem('email_register', emailField.value);
});
passwordField.addEventListener('input', function () {
    sessionStorage.setItem('password_register', passwordField.value);
});
confirmPasswordField.addEventListener('input', function () {
    sessionStorage.setItem('confirm-password_register', confirmPasswordField.value);
});
termsField.addEventListener('change', function () {
    sessionStorage.setItem('terms_register', termsField.checked); // store as boolean
});

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
        errorMessageField.textContent = 'Şifreler uyuşmuyor!';
    } else {
        errorMessageField.style.display = 'none';

        const new_user = {
            password: password_val,
            email: email_val,
            phone: phone_val,
            first_name: name_val,
            last_name: lastname_val,
        };

        // AJAX request to send data
        fetch('http://localhost/eCommerceProject/backend/api/auth/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_user),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultMessageField.textContent = data.message || 'Kayıt başarılı!';
                resultMessageField.style.display = 'block';
                errorMessageField.style.display = 'none';

                // Clear session storage after successful registration
                sessionStorage.clear();

                // Redirect after successful registration
                setTimeout(() => {
                    window.location.href = './signin.html';
                }, 2000); // Redirect after 2 seconds
            } else {
                resultMessageField.style.display = 'none';
                errorMessageField.textContent = data.message || 'Kayıt sırasında bir hata oluştu!';
                errorMessageField.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessageField.textContent = 'Sunucu hatası. Lütfen tekrar deneyin.';
            errorMessageField.style.display = 'block';
        });
    }
});


// Toggle password visibility
const eyeIcons = document.querySelectorAll('.eye');
eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', function () {
        const passwordField = this.previousElementSibling;
        const isPasswordVisible = passwordField.type === 'text';
        passwordField.type = isPasswordVisible ? 'password' : 'text';
    });
});
