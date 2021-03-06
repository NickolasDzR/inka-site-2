import lozad from "lozad";
import Glide from '@glidejs/glide'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const imagesMobile = document.querySelectorAll(".solution__img.lozad"),
    observer = lozad(imagesMobile);

const solutionItemsWrp = document.querySelectorAll(".solution__item-wrp"),
    solutionItemsWrpOffsetTop = [];

solutionItemsWrp.forEach(el => {
    solutionItemsWrpOffsetTop.push(el.offsetTop);
});

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({overwrite: "auto"});

const getCoords = (elem) => {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
};

const contentMarkers = gsap.utils.toArray(".solution__img-fixed");
const contentMarkserBlock = gsap.utils.toArray(".solution__item");

gsap.set(".solution__fixed-items > *", {xPercent: -50});

const getCoordinateOfElement = (position) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const smImageHeightFirst = 355;
    const smImageHeightLast = 229;

    const mdImageHeightFirst = 355;
    const mdImageHeightLast = 229;

    const lgImageHeightFirst = 396;
    const lgImageHeightLast = 300;

    const xxlImageHeightFirst = 491;
    const xxlImageHeightLast = 417;

    const getCorrectImageHeight = () => {
        if (viewportWidth >= 576 && viewportWidth <= 768) {
            return position === "top" ? smImageHeightFirst : smImageHeightLast;
        } else if (viewportWidth > 768 && viewportWidth <= 992) {
            return position === "top" ? mdImageHeightFirst : mdImageHeightLast;
        } else if (viewportWidth > 992 && viewportWidth <= 1440) {
            return position === "top" ? lgImageHeightFirst : lgImageHeightLast;
        } else if (viewportWidth > 1440) {
            return position === "top" ? xxlImageHeightFirst : xxlImageHeightLast;
        } else {
            if (viewportWidth >= 576) {
                console.error("Inka error: None of the breakpoints is fit to the breakpoints")
            }
        }
    };

    return (viewportHeight / 2) - (getCorrectImageHeight() / 2)
};

const scrollTriggerSettings = {
    trigger: ".solution__content",
    start: () => `top top+=${getCoordinateOfElement("top")}`,
    end: () => `bottom bottom-=${getCoordinateOfElement("bottom")}`,
    onUpdate: getCurrentSection,
    invalidateOnRefresh: true,
    pin: ".solution__fixed",
}

let animationFixes = undefined;

const solutionScrollTrigger = ScrollTrigger.create({
    trigger: ".solution",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
        gsap.set(contentMarkers[0], {autoAlpha: 1});
    },
    onEnterBack: () => {
        gsap.set(contentMarkers[contentMarkers.length - 1], {autoAlpha: 1});
    },
});

contentMarkserBlock.forEach((marker, index) => {
    marker.content = contentMarkers[index];

    gsap.set(marker.content, {autoAlpha: 0})

    marker.content.enter = function () {
        gsap.fromTo(marker.content, {autoAlpha: 0}, {duration: 0.3, autoAlpha: 1});
    };

    marker.content.leave = function () {
        gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
    };

});

let lastContent;
let inited = false;

function getCurrentSection() {
    let newContent;
    const currScroll = scrollY + (window.innerHeight / 2);

    // Find the current section
    contentMarkserBlock.forEach(marker => {

        if (currScroll > getCoords(marker).top) {
            newContent = marker.content;
        }
    });

    // If the current section is different than that last, animate in
    if (newContent && (lastContent == null || !newContent.isSameNode(lastContent))) {
        // Fade out last section
        if (lastContent) {
            lastContent.leave();
        }
        // Animate in new section
        if (inited) {
            newContent.enter();
        }

        inited = true;

        lastContent = newContent;
    }
}

const media = window.matchMedia("screen and (max-width: 576px)");
ScrollTrigger.addEventListener("refreshInit", checkSTState);
checkSTState();

function checkSTState() {
    if (animationFixes) {
        if (media.matches) {
            animationFixes.disable();
            observer.observe();
        } else {
            animationFixes.enable();
        }
    }
}


contentMarkserBlock.forEach((elem, index) => {
    const fadeItems = gsap.timeline({
        scrollTrigger: {
            trigger: elem,
            start: "top+=30% 80%",
            end: "bottom+=40% 50%",
            scrub: true,

            toggleActions: "play reverse play reverse",
        }
    });
    if (media) {
        if (index !== contentMarkserBlock.length - 1) {
            fadeItems
                .to(elem, {opacity: 1, duration: 0.2, stagger: 0.05})
                .to(elem, {opacity: 0, duration: 0.2, stagger: 0.05}, 0.8);
        } else {
            fadeItems
                .to(elem, {opacity: 1, duration: 0.2, stagger: 0.05});
        }
    }
});

let activeSlideIndexSolution = 0;
let solutionSlider = document.querySelector(".solution__slider");

const slideConfig = {
    startAt: activeSlideIndexSolution,
    autoplay: 2000,
    hoverpause: true,
    type: 'carousel',
    perView: 1,
}

let solutionSliderInit = undefined;

let sliderIsInited = false;

const onResizeHandler = () => {
    if (window.matchMedia("(min-width: 576px)").matches) {
        if (animationFixes) {
            animationFixes.refresh();
        }

        if (sliderIsInited === true) {
            solutionSliderInit.destroy();
            solutionSlider.removeEventListener("click", pauseSlider);
            document.querySelector(".solution__track").removeAttribute("style");
            sliderIsInited = false;
        }
    } else {
        if (sliderIsInited === false) {
            solutionSliderInit = new Glide('.solution__slider', slideConfig);
            solutionSlider.addEventListener("click", pauseSlider);
            solutionSliderInit.mount();
            sliderIsInited = true;
        }
    }
}

const pauseSlider = () => {
    solutionSliderInit.pause();
    setTimeout(() => {
        solutionSliderInit.play();
    }, 2000)
};

window.addEventListener('resize', function () {
    return onResizeHandler();
}, true);

ScrollTrigger.addEventListener("refreshInit", function () {
    onResizeHandler();
});

ScrollTrigger.matchMedia({
    "(min-width: 576px)": function () {
        animationFixes = ScrollTrigger.create(scrollTriggerSettings);
        animationFixes.update();
        animationFixes.refresh();
    },
    "(max-width: 576px)": function () {
        if (animationFixes) {
            animationFixes.kill(true);
            gsap.set(".solution__fixed", {clearProps: "all"});
        }
    }
});

onResizeHandler();
