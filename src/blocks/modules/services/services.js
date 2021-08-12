import gsap from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const wrap = gsap.utils.wrap(0, 1);
const itemContainer = document.querySelectorAll(".services__list");

itemContainer.forEach(function (container) {
    let totalDistance = 0;
    const direction = container.dataset.direction === "left" ? "-" : "",
        duration = container.dataset.duration,
        solutionDirection = direction.length > 0;

    if (direction.length === 0) {
        container.closest(".services__inner").style.display = "flex";
        container.closest(".services__inner").style.flexDirection = "row-reverse";
    }

    // дублируем содержимое
    container.querySelectorAll("li").forEach(function (li) {
        return container.appendChild(li.cloneNode(true));
    });
    let animation;
    let startPosition;
    const draggable = new Draggable(container, {
        type: "x",
        trigger: container,
        throwProps: true,
        onPressInit: function () {
            animation.pause();
            startPosition = this.x;
        },
        onDrag: function () {
            let num = solutionDirection ? -this.x / totalDistance : this.x / totalDistance;

            let progress = wrap(num);
            animation.progress(progress);
        },
        onRelease: function () {
            animation.play();
            gsap.fromTo(animation, {timeScale: 0.5}, {duration: 2, timeScale: 1, ease: "power1.in"});
        },
    })


    totalDistance = parseInt(window.getComputedStyle(container).width) / 2;

    animation = gsap.to(container, {
        duration: duration,
        x: solutionDirection ? -Math.abs(totalDistance) : totalDistance,
        ease: "none",
        repeat: -1,
        overwrite: true
    });


});
