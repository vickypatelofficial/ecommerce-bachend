fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    // Notice we only send email and password (we don't need the name for login)
    body: JSON.stringify({
        email: "vicky@example.com",
        password: "MySuperSecretPassword123"
    })
})
.then(response => response.json())
.then(data => console.log("Login Successful! Look at your VIP Bagde:", data))
.catch(error => console.error("Error:", error));
