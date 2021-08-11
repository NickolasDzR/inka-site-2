import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({overwrite: "auto"});

const breakPoint = window.matchMedia("(min-width: 992px)").matches
const statsCircles = document.querySelectorAll(".stats__item");

// расчет анимации
const circleAnimationHandler = (element) => {
    const currentElement = breakPoint ? element.querySelector(".stats__circle_big .stats__circle-progress_fill") : element.querySelector(".stats__circle-progress_fill");

    const ww = window.matchMedia("(min-width: 992px)").matches,
        currentElementFill = currentElement.style.strokeDashoffset;

    const percentage = element.dataset.fillPercentage,
        fullDashOffset = ww ? 628 : 414,
        fullCircle = ww ? 628 : 486,
        fillDashOffset = fullDashOffset / 100 * percentage,
        fillNum = Math.round(fullCircle - fillDashOffset)

    // если высчитанное число не равняется числу которое уже стоит, то
    if (fillNum !== parseInt(currentElementFill)) {
        return currentElement.style.strokeDashoffset = fillNum;
    }

    return false;
}


let triggeredElement = false;

// смотрим при ресайзе stroke-dashoffset, так как значение в lg > или < брекпоинт разное
window.addEventListener("resize", () => {
    if (triggeredElement) {
        statsCircles.forEach(el => {
            const circle = el.querySelector(".stats__circle-progress_fill");
            if (circle.style.strokeDashoffset.length > 0) circleAnimationHandler(el);
        });
    }
})

// триггер при наведении экрана на элемент
statsCircles.forEach((el, index) => {
    ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "+=71",
        once: true,
        onEnter: (self) => {
            circleAnimationHandler(self.trigger);
            triggeredElement = true;
        },
    });
})
