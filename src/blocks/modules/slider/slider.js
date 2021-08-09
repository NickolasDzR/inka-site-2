import Glide from '@glidejs/glide'

const sliderAutoplaySpeed = parseInt(document.querySelector(".slider__slides-wrp").dataset.autoplaySpeed);

let activeSlideIndex = 0;

const inkaSlider = new Glide('.glide', {
    startAt: activeSlideIndex,
    autoplay: sliderAutoplaySpeed * 1000,
    type: 'carousel',
    perView: 1,
}).mount();

const animationHeightHandler = () => {
    const slideHeight = document.querySelector(".glide__slide--active").offsetHeight;
    const glideTrack = document.querySelector(".glide__track").offsetHeight;
    if (slideHeight !== glideTrack) {
        document.querySelector(".glide__track").style.height = slideHeight + "px";
    }
}

animationHeightHandler();

inkaSlider.on(['build.after', 'run.after'], animationHeightHandler)
