async function query(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else alert('запрос отправлен');

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}