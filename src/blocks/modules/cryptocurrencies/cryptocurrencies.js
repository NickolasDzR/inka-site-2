const circle = document.querySelector(".cryptocurrencies__circle-inner"),
    smallCircles = document.querySelectorAll(".cryptocurrencies__item-img"),
    cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-inner"),
    cryptoAnimationTime = document.querySelector(".cryptocurrencies__controll").dataset.animationTime,
    cryptoAnimationInitBy = parseInt(document.querySelector(".cryptocurrencies__controll").dataset.animationHideCrypto);

const clearIntervalFunc = (variable) => {
    return window.clearInterval(variable);
};

let addAnimationSetTimeout = undefined;
let removeAnimationSetTimeout = undefined

const addAnimation = () => {
    return addAnimationSetTimeout = setInterval(() => {
        smallCircles.forEach((el, index) => {
            const activationAnimationClass = `cryptocurrencies__item-img_${index + 1}_transform`;
            if (!el.classList.contains(activationAnimationClass)) {
                el.classList.add(activationAnimationClass);
                cryptocurrenciesCircleInner.classList.add("cryptocurrencies__circle-inner_scale")
            }
        });
    }, 2000)
}

const addClassesAfterClearInterval = () => {
    console.log("Asdasd");
    return smallCircles.forEach((el, index) => {
        const activationAnimationClass = `cryptocurrencies__item-img_${index + 1}_transform`;
        return el.classList.add(activationAnimationClass);
    });
}

const removeAnimation = () => {
    return removeAnimationSetTimeout = setInterval(() => {
        smallCircles.forEach((el, index) => {
            const activationAnimationClass = `cryptocurrencies__item-img_${index + 1}_transform`;
            if (el.classList.contains(activationAnimationClass)) {
                el.classList.remove(activationAnimationClass);
                cryptocurrenciesCircleInner.classList.remove("cryptocurrencies__circle-inner_scale")
            }
        });
    }, 2000)
};

function cryptoAnimationControll() {
    const animationTime = cryptoAnimationTime,
        cryptocurrenciesCircle = document.querySelector(".cryptocurrencies__circle"),
        cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-cover"),
        cryptocurrenciesSmallImg = document.querySelectorAll(".cryptocurrencies__cryptos");

    [cryptocurrenciesCircle, cryptocurrenciesCircleInner, ...cryptocurrenciesSmallImg].forEach(el => {
        el.style.animationDuration = `${animationTime}s`
    });
    addAnimation();
    setTimeout(removeAnimation, 1000);
}

cryptoAnimationControll();

window.onfocus = () => {
    addAnimation();
    setTimeout(removeAnimation, 1000);
};

window.onblur = () => {
    clearIntervalFunc(addAnimationSetTimeout)
    clearIntervalFunc(removeAnimationSetTimeout)
    return addClassesAfterClearInterval();
}
