import "./import/modules";
import "./import/components";

import lozad from "lozad";

const titleImg = document.querySelectorAll(".lozad");
const observerTitle = lozad(titleImg);
observerTitle.observe();

const preload = document.querySelector(".preload");

window.onload = () => {
    preload.style.visibility = "hidden";
    preload.style.pointerEvents = "none";
    preload.style.opacity = "0";

    setTimeout(() => {
        preload.style.display = "none";
    }, 500)
}
