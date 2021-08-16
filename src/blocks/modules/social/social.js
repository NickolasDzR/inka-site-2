import {createPopper} from '@popperjs/core';

const socLinks = document.querySelectorAll(".soc__link");
const popper = document.querySelector(".social-popup");

const popperSettings = {
    placement: "top",
};

let popperInit = undefined;

const showTooltip = (el) => {
    console.log("enter");
    popper.setAttribute("data-show", '');

    if (popperInit === undefined) {
        popperInit = createPopper(el.target, popper, popperSettings);
        popperInit.update();
        return false
    }
};

const hideTooltip = (el) => {
    popperInit.destroy();
    popperInit = undefined;
    popper.removeAttribute('data-show');
};

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

socLinks.forEach(el => {
    if (el.href.length === 0) {
        showEvents.forEach(event => {
            el.addEventListener(event, showTooltip)
        });

        hideEvents.forEach(event => {
            el.addEventListener(event, hideTooltip)
        });
    }
});
