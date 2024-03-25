async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            alert('wrong password');
            throw new Error('Network response was not ok');
        }
        else{
            localStorage.setItem('user', username);
        }

        const result = await response.json();
        console.log(result);
    } 
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}