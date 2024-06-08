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
    let step = getStepSize();
    console.log(step);
    if(slideCount < 24/step-2) slideCount++;
    else slideCount = 0;
    button = document.getElementById(slideCount);
    changeImages();
}

function back(){
    let button = document.getElementById(slideCount);
    let step = getStepSize();
    if(slideCount > 0) slideCount--;
    else slideCount = 24/step-2;
    button = document.getElementById(slideCount);
    changeImages();
}

function changeImages() {
    let imgCount = 0;
    let images = document.querySelectorAll('.album-vid');
    let step = getStepSize();
    images.forEach(img => {   
        img.classList.add('animate-slide-out');
        setTimeout(() => {
            const newImageData = imagesData[imgCount + slideCount*step];
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

function getStepSize() {
    if(window.innerWidth <= 770) return 4;
    else if(window.innerWidth <= 450) return 2;
    else return 6;
}
