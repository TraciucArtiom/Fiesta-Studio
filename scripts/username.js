window.onload = function (){
    const username = localStorage.getItem('user');
    let btText = document.getElementById("user-container");
    if(username == null){
        btText.innerHTML = "Войти в аккаунт ↗";
    }
    else{
        btText.innerHTML = username;
    }
}