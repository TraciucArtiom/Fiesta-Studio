let comments = [];
let nrSlide = 0;
let maxSlides;

async function getComments() {
    try {
        const response = await fetch('http://localhost:3000/read-comments', { method: 'POST' });
        const data = await response.json();
        
        if (response.ok) {
            comments = data.comments;
            maxSlides = Math.ceil(comments.length / 3);
            ChangeComments();   
        } else {
            console.error('Failed to retrieve comments:', data.error);
        }
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

function CommentsBack(){
    getComments();
    if(nrSlide === 0){
        nrSlide = maxSlides - 1;
    }
    else{
        nrSlide--;
    }
    ChangeComments();
}

function CommentsForward(){
    getComments();
    if(nrSlide === maxSlides - 1){
        nrSlide = 0;
    }
    else{
        nrSlide++;
    }
    ChangeComments();
}

function ChangeComments(){
    for(let i = 0; i < 3; i++){
        let u = document.getElementById("u"+(i+1));
        let t = document.getElementById("t"+(i+1));
        let comment = comments[i + nrSlide*3];
        if(comment) {
            u.innerHTML = comment.name;
            t.innerHTML = comment.text;
        } else {
            u.innerHTML = "";
            t.innerHTML = "";
        }
    }
}

window.onload = getComments;
