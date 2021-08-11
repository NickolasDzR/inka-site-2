import {createPopper} from '@popperjs/core';

const socLinks = document.querySelectorAll(".soc__link");
const popper = document.querySelector(".social-popup");

const popperSettings = {
    placement: "top",
    modifiers: [
        {
            name: 'preventOverflow',
            options: {
                margin: 10
            },
        },
    ]
};

socLinks.forEach(el => {
    console.log(el.href.length);
    if (el.href.length === 0) {

        el.addEventListener("click", function () {
            createPopper(el, popper, popperSettings);
            setTimeout(() => {
                popper.removeAttribute("data-popper-placement");
                popper.removeAttribute("style");
            }, 3000)
        })
    }
})
