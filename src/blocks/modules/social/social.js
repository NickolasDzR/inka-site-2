import {createPopper} from '@popperjs/core';

const socLinks = document.querySelectorAll(".soc__link");
const popper = document.querySelector(".social-popup");

const popperSettings = {
    placement: "top",
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [10, 10],
            },
        },
    ],
};

let popperInit = undefined;

const showTooltip = (el) => {
    popper.setAttribute("data-show", '');

    if (popperInit === undefined) {
        popperInit = createPopper(el.target, popper, popperSettings);

        popperInit.setOptions({
            modifiers: [{ name: 'eventListeners', enabled: true }],
        });

        popperInit.update();

        return false
    }
};

const hideTooltip = (el) => {
    popperInit.destroy();
    popper.removeAttribute('data-show');

    popperInit.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: false }],
    });

    popperInit = undefined;
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
