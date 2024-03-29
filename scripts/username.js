window.onload = function (){
    const username = localStorage.getItem('user');
    let btText = document.getElementById("user-container");
    let btTextbg = document.getElementById("user-container-bg");
    if(username == null){
        btText.innerHTML = "Войти в аккаунт ↗";
        btTextbg.innerHTML = "Войти в аккаунт ↗";
    }
    else{
        btText.innerHTML = username;
        btTextbg.innerHTML = username;
    }
}