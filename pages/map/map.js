const mapContainer = document.querySelector('.map-bg__wrapper');
const wrapper = document.querySelector('.map');
const mapBg = document.querySelector('.map-bg');
const links = document.querySelectorAll('.map-bg > a');
const zoomIn = document.querySelector('.map-control__scale-up');
const zoomOut = document.querySelector('.map-control__scale-down');
let scale = 0;
let scaleCoef = 0.25;

mapContainer.addEventListener('mousedown', (e) => {
    let {top, left} = mapContainer.getBoundingClientRect();
    let shiftX = e.clientX - left;
    let shiftY = e.clientY - top;

    function onMouseMove(e) {
        mapContainer.style.left = e.pageX - shiftX + 'px';
        mapContainer.style.top = e.pageY - shiftY + 'px';
    }

    wrapper.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        wrapper.removeEventListener('mousemove', onMouseMove);
    });
});

mapContainer.ondragstart = function () {
    return false;
};

function scaling(elem) {
    scale = scale > 4 ? 4 : scale < 0 ? 0 : scale;
    elem.style.transform = `scale(${1 + (scale * scaleCoef)})`;
    if (scale === 0) mapContainer.style.top = mapContainer.style.left = '';
}

zoomIn.addEventListener('click', () => {
    scale++;
    scaling(mapBg);
});

zoomOut.addEventListener('click', () => {
    scale--;
    scaling(mapBg);
});

// ------todo
let activeLink;
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (activeLink) activeLink.classList.remove('active');
        link.classList.add('active');
        activeLink = link;
    });
});

