
const form = document.querySelector('form');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');

window.onload = function () {
    if (sessionStorage.getItem('email_login')) {
        emailField.value = sessionStorage.getItem('email_login');
    }
    if (sessionStorage.getItem('password_login')) {
        passwordField.value = sessionStorage.getItem('password_login');
    }
};

emailField.addEventListener('input', function () {
    sessionStorage.setItem('email_login', emailField.value);
});

passwordField.addEventListener('input', function () {
    sessionStorage.setItem('password_login', passwordField.value);
});

form.addEventListener('submit',
    function (event) {
        event.preventDefault();

        const email_val = emailField.value;
        const password_val = passwordField.value;

        const login_info = {
            email: email_val,
            password: password_val,
        };

        fetch('../../backend/api/auth/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_info)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            sessionStorage.setItem('user_email', data.user.email);
            sessionStorage.setItem('user_id', data.user.id);
            sessionStorage.setItem('user_name', data.user.name);

            sessionStorage.removeItem('email_login');
            sessionStorage.removeItem('password_login');

            window.location.href = './07_Shop page.html';
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    }
);