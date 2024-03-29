const imagesData = [
    { src: 'videos/album3.mp4'},
    { src: 'videos/album4.mp4'},
    { src: 'videos/album5.mp4'},
    { src: 'videos/album6.mp4'},
    { src: 'videos/album7.mp4'},
    { src: 'videos/album8.mp4'},
    { src: 'videos/album9.mp4'},
    { src: 'videos/album10.mp4'},
    { src: 'videos/album11.mp4'},
    { src: 'videos/album12.mp4'},
    { src: 'videos/album13.mp4'},
    { src: 'videos/album14.mp4'},
    { src: 'videos/album15.mp4'},
    { src: 'videos/album16.mp4'},
    { src: 'videos/album17.mp4'},
    { src: 'videos/album18.mp4'},
    { src: 'videos/album19.mp4'},
    { src: 'videos/album20.mp4'},
    { src: 'videos/album21.mp4'},
    { src: 'videos/album22.mp4'},
    { src: 'videos/album23.mp4'},
    { src: 'videos/album24.mp4'},
    { src: 'videos/album25.mp4'},
    { src: 'videos/album26.mp4'}
];

let slideCount = 0;
function forward(){
    let button = document.getElementById(slideCount);
    button.className = "album-slide";
    if(slideCount < 3) slideCount++;
    else slideCount = 0;
    button = document.getElementById(slideCount);
    button.className = "this-album-slide";
}
function back(){
    let button = document.getElementById(slideCount);
    button.className = "album-slide";
    if(slideCount > 0) slideCount--;
    else slideCount = 3;
    button = document.getElementById(slideCount);
    button.className = "this-album-slide";
}
function goToSlide(x){
    let button = document.getElementById(slideCount);
    button.className = "album-slide";
    slideCount = x;
    button = document.getElementById(slideCount);
    button.className = "this-album-slide";
}
function changeImages() {
    let imgCount = 0;
    const images = document.querySelectorAll('.album-vid');
    images.forEach(img => {   
        img.classList.add('animate-slide-out');
        setTimeout(() => {
            const newImageData = imagesData[imgCount + slideCount*6];
            imgCount += 1;
            img.src = newImageData.src;
            img.classList.remove('animate-slide-out');
            img.classList.add('animate-slide-in');
            setTimeout(() => {
                img.classList.remove('animate-slide-in');
            }, 500);
        }, 500);
    });
}