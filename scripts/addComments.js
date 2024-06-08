async function addComment(event) {
    event.preventDefault(); 
    const name = localStorage.getItem('user');
    if(name == null){
        alert("Войдите в аккаунт");
    }else{
        const text = document.getElementById('review-input').value;
        try {
            const response = await fetch('http://localhost:3000/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    text: text
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            document.getElementById('review-input').value = "";
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}