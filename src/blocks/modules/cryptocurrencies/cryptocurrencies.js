const circle = document.querySelector(".cryptocurrencies__circle-inner"),
    smallCircles = document.querySelectorAll(".cryptocurrencies__item-img"),
    cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-inner"),
    cryptoAnimationTime = document.querySelector(".cryptocurrencies__controll").dataset.animationTime,
    cryptoAnimationInitBy = parseInt(document.querySelector(".cryptocurrencies__controll").dataset.animationHideCrypto);

const runningAnimation = () => {
    for (let i = 0; i <= smallCircles.length; i += 1) {
        const realIndex = i + 1;
        const activationAnimationClass = `cryptocurrencies__item-img_${realIndex}_transform`;
        setInterval(() => {
            smallCircles[i].classList.add(activationAnimationClass);
            cryptocurrenciesCircleInner.classList.add("cryptocurrencies__circle-inner_scale")
        }, cryptoAnimationInitBy * 1000 * 2);
        setTimeout(function () {
            setInterval(() => {
                smallCircles[i].classList.remove(activationAnimationClass);
                cryptocurrenciesCircleInner.classList.remove("cryptocurrencies__circle-inner_scale")
            }, 4000);
        }, 2000);
    }
    // smallCircles.forEach((el, index) => {
    //     const realIndex = index + 1;
    //     const activationAnimationClass = `cryptocurrencies__item-img_${realIndex}_transform`;
    //     setInterval(() => {
    //         el.classList.add(activationAnimationClass);
    //         cryptocurrenciesCircleInner.classList.add("cryptocurrencies__circle-inner_scale")
    //     }, cryptoAnimationInitBy * 1000 * 2);
    //     setTimeout(function () {
    //         setInterval(() => {
    //             el.classList.remove(activationAnimationClass);
    //             cryptocurrenciesCircleInner.classList.remove("cryptocurrencies__circle-inner_scale")
    //         }, 4000);
    //     }, 2000);
    // })
}

function cryptoAnimationControll() {
    const animationTime = cryptoAnimationTime,
        cryptocurrenciesCircle = document.querySelector(".cryptocurrencies__circle"),
        cryptocurrenciesCircleInner = document.querySelector(".cryptocurrencies__circle-cover"),
        cryptocurrenciesSmallImg = document.querySelectorAll(".cryptocurrencies__cryptos");

    [cryptocurrenciesCircle, cryptocurrenciesCircleInner, ...cryptocurrenciesSmallImg].forEach(el => {
        el.style.animationDuration = `${animationTime}s`
    });
    runningAnimation();
}

cryptoAnimationControll();
