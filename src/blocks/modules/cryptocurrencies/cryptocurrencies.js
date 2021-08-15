import gsap from "gsap";

const circle = document.querySelector(".cryptocurrencies__circle-inner"),
    smallCircles = document.querySelectorAll(".cryptocurrencies__item-img"),
    cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-inner"),
    cryptoAnimationTime = document.querySelector(".cryptocurrencies__controll").dataset.animationTime,
    cryptoAnimationInitBy = parseInt(document.querySelector(".cryptocurrencies__controll").dataset.animationHideCrypto);

const addAnimation = () => {
    smallCircles.forEach((el, index) => {
        const activationAnimationClass = `cryptocurrencies__item-img_${index + 1}_transform`;
        if (!el.classList.contains(activationAnimationClass)) {
            el.classList.add(activationAnimationClass);
            return cryptocurrenciesCircleInner.classList.add("cryptocurrencies__circle-inner_scale")
        }
    });
}

const removeAnimation = () => {
    smallCircles.forEach((el, index) => {
        const activationAnimationClass = `cryptocurrencies__item-img_${index + 1}_transform`;
        el.classList.remove(activationAnimationClass);
        return cryptocurrenciesCircleInner.classList.remove("cryptocurrencies__circle-inner_scale")
    });
};

function cryptoAnimationControll() {
    const animationTime = cryptoAnimationTime,
        cryptocurrenciesCircle = document.querySelector(".cryptocurrencies__circle"),
        cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-cover"),
        cryptocurrenciesSmallImg = document.querySelectorAll(".cryptocurrencies__cryptos");

    [cryptocurrenciesCircle, cryptocurrenciesCircleInner, ...cryptocurrenciesSmallImg].forEach(el => {
        el.style.animationDuration = `${animationTime}s`
    });
}

gsap.set(removeAnimation, {delay: 0, onRepeat: removeAnimation, duration: 4, repeat: -1, repeatDelay: 1});

gsap.set(addAnimation, {delay: 0, onRepeat: addAnimation, duration: 1, repeat: -1, repeatDelay: 4});

cryptoAnimationControll();
