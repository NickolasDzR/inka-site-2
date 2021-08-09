import "./import/modules";
import "./import/components";

import lozad from "lozad";
import {createPopper} from "@popperjs/core";

const titleImg = document.querySelectorAll(".lozad");
const observerTitle = lozad(titleImg);
observerTitle.observe();

const appStoreLink = document.querySelectorAll(".qr-code");
const qrImg = document.querySelector(".qr-code-image");

const tooltipOptions = {
    placement: "right",
    modifiers: [
        {
            name: "offset",
            options: {
                offset: [15, 15],
            },
        },
    ],
};

let tooltip = null;

function show(el) {
    if (qrImg.dataset.popperEscaped === "") {
        qrImg.removeAttribute("data-show");
        tooltip.destroy();
        tooltip = null;
    }

    if (!tooltip) {
        tooltip = createPopper(el, qrImg, tooltipOptions);
        qrImg.dataset.show = "";
    } else {
        qrImg.removeAttribute("data-show");
        tooltip.destroy();
        tooltip = null;
    }
}

appStoreLink.forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        show(el);
    });
});

const navBarPosition = () => {
    if (scrollY > 0) {
        document.querySelector("header").classList.add("header_hidden");
    } else {
        document.querySelector("header").classList.remove("header_hidden");
    }
};

window.addEventListener("scroll", navBarPosition);

navBarPosition();
