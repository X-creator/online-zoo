import Carousel from "../../../carousel.js";

const spoilerSection = document.querySelector('.about-long');
const spoilerBtn = document.querySelector('.animal__info-btn');

const animalCamera = document.querySelector('.animal-camera__preview');
const mainCamera = document.querySelector('.animal-camera__online-wrapper');
const animalCarousel = new Carousel({
    carousel: document.querySelector('.animal-camera .slider'),
    wrapper: ".animal-camera__preview",
    controls: {
        prevBtn: ".prev-btn",
        nextBtn: ".next-btn"
    },
    infinite: true
});

animalCamera.addEventListener('click', (e) => {
    if (e.target.classList.contains('animal-camera__preview-item')) {
        let mainIframe = mainCamera.querySelector('iframe');
        let videoIframe = e.target.querySelector('iframe');
        let mainSrc = mainIframe.src;
        mainIframe.src = videoIframe.src;
        videoIframe.src = mainSrc;
    }
});

spoilerBtn.addEventListener('click', (e) => {
    spoilerSection.classList.toggle('spoiler');
    spoilerBtn.textContent = spoilerSection.classList.contains('spoiler') ? 'Read More' : 'Read Less';
});