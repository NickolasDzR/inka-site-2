import scrollLock from 'scroll-lock';
import jump from 'jump.js'

const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    navLink = nav.querySelectorAll(".nav__link"),
    html = document.querySelector("html");

let hoveredHeader = false;

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

let scollPosition = window.pageYOffset;
let setTimeoutDeleteClass = undefined;

const deleteClassWithTime = (elem) => {
    console.log(header.classList.contains("header_hovered"));
    if (!header.classList.contains("header_hovered") && !elem.classList.contains("header_hidden") && setTimeoutDeleteClass !== undefined) {
        setTimeoutDeleteClass = setTimeout(() => {
            elem.classList.add("header_hidden");
            setTimeoutDeleteClass = undefined;
        }, 3000);
        return false;
    }
}

let header = document.querySelector(".header");
const navigation = document.querySelector(".nav");

const navBarPosition = () => {
    header = document.querySelector(".header");
    if (scrollY > 40 && !navigation.classList.contains("nav_active")) {
        header.classList.add("header_hidden");
    } else {
        header.classList.remove("header_hidden");
    }

    if (scollPosition > window.pageYOffset) {
        header.classList.remove("header_hidden");
    }
    scollPosition = window.pageYOffset;
    // deleteClassWithTime(header);
};

window.addEventListener("scroll", navBarPosition);

navBarPosition();

// header.addEventListener("mouseover", () => {
//     if (!header.classList.contains("header_hovered")) {
//         header.classList.add("header_hovered");
//     }
// });
// header.addEventListener("mouseout", () => {
//     if (header.classList.contains("header_hovered")) {
//         header.classList.remove("header_hovered");
//     }
// });

const navListItems = document.querySelectorAll(".nav__item:not(:last-child) .nav__link");

navListItems.forEach(el => {
    el.addEventListener("mouseover", () => {
        navListItems.forEach(link => {
            link.classList.add("nav__link_hide-border")
        });
    })

    el.addEventListener("mouseout", () => {
        navListItems.forEach(link => {
            link.classList.remove("nav__link_hide-border")
        });
    })
});

window.onload = () => {
    jump("body", {
        offset: 0,
        duration: 0
    })
};

const productAnchor = document.querySelector("a[href='#Product']");
const serviceAnchor = document.querySelector("a[href='#services']");
const roadMapAnchor = document.querySelector("a[href='#Roadmap']");

productAnchor.addEventListener("click", () => {
    jump("#Product", {
        offset: -100,
        duration: 300,
    })
});

serviceAnchor.addEventListener("click", () => {
    jump("#services", {
        offset: -100,
        duration: 300,
    })
});

roadMapAnchor.addEventListener("click", () => {
    jump("#Roadmap", {
        offset: -100,
        duration: 300,
    })
});
