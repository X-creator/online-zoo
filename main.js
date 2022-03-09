import Carousel from "./carousel.js";

let petsSlider = document.querySelector('.pets .slider');
let slider = petsSlider.querySelector('.pets .slider__window');
let prevBtn = petsSlider.querySelector('.prev-btn');
let nextBtn = petsSlider.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.style.opacity = '1';
        slider.lastElementChild.after(slider.firstElementChild);
    }, 400);
});

prevBtn.addEventListener('click', () => {
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.style.opacity = '1';
        slider.firstElementChild.before(slider.lastElementChild);
    }, 400);
});

let testimonialCarousel = new Carousel({
    carousel: document.querySelector('.testimonials__wrapper'),
    wrapper: ".feedback__wrapper",
    controls: {
        rangeBtn: ".testimonials__slider"
    },
    infinite: true,
    slideChange: {
        interval: 10000,
        freeze: 30000
    }
});