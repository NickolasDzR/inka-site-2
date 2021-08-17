import Glide from '@glidejs/glide'

const sliderAutoplaySpeed = parseInt(document.querySelector(".slider__slides-wrp").dataset.autoplaySpeed);

let activeSlideIndex = 0;
let inkaSlider = document.querySelector(".glide-slider");

const inkaSliderInit = new Glide(inkaSlider, {
    startAt: activeSlideIndex,
    autoplay: sliderAutoplaySpeed * 1000,
    type: 'carousel',
    perView: 1,
    perSwipe: '',
    perTouch: 1,
    touchRatio: 0.5
});

const pauseSlider = () => {
    inkaSliderInit.pause();
    setTimeout(() => {
        inkaSliderInit.play();
    }, sliderAutoplaySpeed * 1000)
};

inkaSlider.addEventListener("click", pauseSlider);

inkaSliderInit.mount();

// const inkaSlideranimationHeightHandler = () => {
//     if (!inkaSlider) return false;
//
//     const slideHeight = inkaSlider.querySelector(".glide__slide--active").offsetHeight;
//     const glideTrack = inkaSlider.querySelector(".glide__track").offsetHeight;
//
//     if (slideHeight !== glideTrack) {
//         inkaSlider.querySelector(".glide__track").style.height = slideHeight + "px";
//     }
// }

// inkaSliderInit.on(['build.after', 'run.after'], inkaSlideranimationHeightHandler);
