class Carousel {
    constructor({carousel, wrapper, controls, infinite, slideChange}) {
        this.carousel = carousel;
        this.wrapper = this.carousel.querySelector(wrapper);
        this.controls = controls;
        this.infinite = infinite;
        this.slideChange = slideChange;
        this.init();
    }

    timer = {};

    init() {
        this.position = 0;
        this.wrapperContains = this.wrapper.children.length - 1;
        if (this.controls) {
            for (const btn in this.controls) {
                this[btn] = this.carousel.querySelector(this.controls[btn]);
                const [event, cb] = Carousel.handlers[btn];
                this[btn].addEventListener(event, cb.bind(this));
            }
        }
        if (this.slideChange) {
            this.autoScroll();
            this.wrapper.addEventListener("click", (e) => {
                if (e.target !== this.wrapper) {
                    clearInterval(this.timer.intervalID);
                    clearTimeout(this.timer.timeoutID);
                    this.timer.timeoutID = setTimeout(this.autoScroll, this.slideChange.freeze);
                }
            });
        }
    }

    autoScroll = () => {
        this.timer.intervalID = setInterval(() => {
            this.rangeBtn.value = ++this.position;
            this.range(this.rangeBtn.max, this.rangeBtn.min, this.rangeBtn, 'value');
            let event = new Event("input");
            this.rangeBtn.dispatchEvent(event);
        }, this.slideChange.interval)
    };

    slider(max, min, shift) {
        this.range(max, min, this, 'position');
        this.wrapper.style["transform"] = `translateX(-${this.position * shift}%)`;
    }

    range(max, min, that, prop) {
        if (this.position < min) that[prop] = this.infinite ? max : min;
        if (this.position > max) that[prop] = this.infinite ? min : max;
    }
}

Carousel.handlers = {
    prevBtn: ["click", function () {
        --this.position;
        let shift = 100 * (this.wrapper.children[0].clientWidth + 30) / this.wrapper.clientWidth;
        this.slider(this.wrapperContains, 0, shift);
    }],
    nextBtn: ["click", function () {
        ++this.position;
        let shift = 100 * (this.wrapper.children[0].clientWidth + 30) / this.wrapper.clientWidth;
        this.slider(this.wrapperContains, 0, shift);
    }],
    rangeBtn: ["input", function (e) {
        this.position = e.target.value;
        let shift = 100 * (this.wrapper.children[0].clientWidth + 34) / this.wrapper.clientWidth;
        this.slider(e.target.max, e.target.min, shift);
    }]
};

export default Carousel;