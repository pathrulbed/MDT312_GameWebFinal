document.getElementById('login-form').onsubmit = function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('/login', {  // เปลี่ยน URL จาก /login.html เป็น /login
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {  // ตรวจสอบสถานะการตอบสนอง
            throw new Error('Invalid login');
        }
        return response.json();  // ถ้าผ่านจะทำการแปลงข้อมูลเป็น JSON
    })
    .then(data => {
        alert('Login successful');
        window.location.href = 'game.html';  // Redirect to game page
    })
    .catch(error => {
        alert(error.message);  // แสดงข้อความจากข้อผิดพลาด
    });
};
