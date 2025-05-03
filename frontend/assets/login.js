
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

        fetch('http://localhost/eCommerceProject/backend/api/auth/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_info)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        
            if (data.user) {
                // Başarılı giriş
                localStorage.setItem('user_email', data.user.email);
                localStorage.setItem('user_id', data.user.id);
                localStorage.setItem('user_name', data.user.name);
        
                sessionStorage.removeItem('email_login');
                sessionStorage.removeItem('password_login');
        
                window.location.href = './index.html';
            } else {
                // Hata mesajını göster (eğer varsa)
                showErrorMessage(data.message || "Giriş başarısız!");
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            showErrorMessage("Sunucu hatası, lütfen tekrar deneyin.");
        });
    }
);

function showErrorMessage(message) {
    const errorMessageField = document.querySelector('#error-message');
    errorMessageField.textContent = message;

    errorMessageField.classList.add('show');

    setTimeout(() => {
        errorMessageField.classList.remove('show');
    }, 3000);
}