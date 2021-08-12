import "./import/modules";
import "./import/components";

import lozad from "lozad";

const titleImg = document.querySelectorAll(".lozad");
const observerTitle = lozad(titleImg);
observerTitle.observe();

const navBarPosition = () => {
    if (scrollY > 40) {
        document.querySelector("header").classList.add("header_hidden");
    } else {
        document.querySelector("header").classList.remove("header_hidden");
    }
};

window.addEventListener("scroll", navBarPosition);

navBarPosition();
