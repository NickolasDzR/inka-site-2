import scrollLock from 'scroll-lock';
const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    navLink = nav.querySelectorAll(".nav__link"),
    html = document.querySelector("html");

const navHandler = (e) => {
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("nav_active");

    if (nav.classList.contains("nav_active")) {
        scrollLock.disablePageScroll();
    } else {
        scrollLock.enablePageScroll();
    }
}

navLink.forEach((el) => {
   el.addEventListener("click", () => {
       if (nav.classList.contains("nav_active")) {
           scrollLock.enablePageScroll();
           nav.classList.remove("nav_active");
           hamburger.classList.remove("is-active");
       }
   });
});

hamburger.addEventListener("click", (e) => {
    navHandler(e);
});
