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

window.onload = () => {

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

    const getCoordinateOfElement = (item) => {
        let formula = undefined;
        if (window.innerWidth > 1280) {
            formula = (window.innerHeight / 2) - ((item.offsetHeight / 2) - 30)
        } else {
            formula = (window.innerHeight / 2) - (item.offsetHeight / 2)
        }
        return formula;
    };

    const getCoordinateOfEndPoint = () => {
        const solutionItem = document.querySelectorAll(".solution__item"),
            solutionItemLastItem = solutionItem[solutionItem.length - 1],
            solutionImg = document.querySelectorAll(".solution__img-fixed"),
            solutionImgLastItem = solutionImg[solutionImg.length - 1],
            solutionItemLastItemHeight = solutionItemLastItem.offsetHeight - parseInt(window.getComputedStyle(solutionItemLastItem).paddingTop),
            solutionImgLastItemHeight = solutionImgLastItem.offsetHeight;

        console.log(solutionItemLastItemHeight, solutionImgLastItemHeight);
        return (solutionItemLastItemHeight / 2) - (solutionImgLastItemHeight / 2);

    }

    const scrollTriggerSettings = {
        trigger: ".solution__content",
        start: `top top+=${getCoordinateOfElement(contentMarkers[contentMarkers.length - 1])}`,
        end: `bottom+=${getCoordinateOfEndPoint()} bottom-=${getCoordinateOfElement(contentMarkers[0])}`,
        onUpdate: getCurrentSection,
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

        if (index !== 0) gsap.set(marker.content, {autoAlpha: 0});

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

    const solutionSliderInit = new Glide('.solution__slider', {
        startAt: activeSlideIndexSolution,
        // autoplay: 2000,
        type: 'carousel',
        perView: 1,
    })

    const solutionSliderAnimationHeightHandler = () => {
        if (!solutionSlider) return false;

        const slideHeight = solutionSlider.querySelector(".glide__slide--active").offsetHeight;
        const glideTrack = solutionSlider.querySelector(".glide__track").offsetHeight;

        if (slideHeight !== glideTrack) {
            solutionSlider.querySelector(".glide__track").style.height = slideHeight + "px";
        }
    }

    solutionSliderInit.on(['build.after', 'run.after'], solutionSliderAnimationHeightHandler);

    let sliderIsInited = false;
    let triggerIsInited = false;
    const onResizeHandler = () => {
        if (window.matchMedia("(min-width: 576px)").matches) {
            if (!triggerIsInited) {
                animationFixes = ScrollTrigger.create(scrollTriggerSettings);
                animationFixes.update();
                animationFixes.refresh();
                solutionSliderInit.destroy();
                sliderIsInited = false;
                triggerIsInited = true;
            }
        } else {
            if (!sliderIsInited) {
                solutionSliderInit.mount();
                sliderIsInited = true;
                triggerIsInited = false;
                if (animationFixes) {
                    animationFixes.kill(true);
                    gsap.set(".solution__fixed", {clearProps: true});
                }
            }
        }
    }

    onResizeHandler();
    window.addEventListener('resize', function (event) {
        return onResizeHandler();
    }, true);

};
