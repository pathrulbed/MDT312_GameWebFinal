document.getElementById('register-form').onsubmit = function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert('User registered successfully');
        window.location.href = 'login.html';  // Redirect to login page
    })
    .catch(error => {
        alert('Error registering user');
    });
};
