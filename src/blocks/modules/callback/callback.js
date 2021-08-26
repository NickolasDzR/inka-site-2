const url = "https://inka.finance:90/api/subscribe";

const btn = document.querySelector(".button");
const formError = document.querySelector(".callback__form").dataset.error;

async function sendData(formData) {
    await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }).then(data => {

        const response = data.json();

        response.then(value => {
            const code = value.code;

            if (code === 200 || code === 409) {
                if (value.status === "Success!") {
                    messageHandler("You have been successfully subscribed for newsletters", "Success!");
                }
                if (code === 409) {
                    messageHandler("You have already subscribed to the newsletters", "error");
                }
            } else if (status === 419) {
                alert("Пожалуйста, повторите отправку данных еще раз после перезагрузки страницы");
                window.location.reload();
                return false;
            } else {
                return alert(formError);
            }
        });
    }).catch(error => {
        console.error(error);
    });
}

const messageHandler = (message, type) => {
    let messageAnswer;
    let formMessage = document.querySelector(".count__subheading");

    if (type === "error") {
        messageAnswer = message;
        formMessage.classList.add("footer__heading_error");
    }
    if (type === "Success!") {
        messageAnswer = message;
        if (formMessage.classList.contains("footer__heading_error")) {
            formMessage.classList.remove("footer__heading_error");
        }
    }
    if (type === "valid error") {
        messageAnswer = message;
    }

    return formMessage.innerHTML = messageAnswer;
};

btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (validateHandler() === false) {
        return false;
    } else {

        const inputs = e.target.closest("form").querySelectorAll("input");
        let inputsData = {};

        inputs.forEach((el, index) => {
            inputsData[inputs[index].dataset.type] = inputs[index].value;
        });

        return sendData(inputsData);
    }
});

const callbackBtn = document.querySelector(".callback__btn");
const inputsForm = document.querySelectorAll(".input .input__input");

const validateHandler = () => {
    let inputLength = null;
    inputsForm.forEach((elem, i) => {
        if (elem.value.length > 0) {
            inputLength = true
        } else {
            inputLength = false;
        }
    });
    return inputLength;
}

// callbackBtn.addEventListener("click", (e) => {
//     if (validateHandler() === false) {
//         console.log(false);
//         e.preventDefault();
//         e.stopPropagation();
//         e.stopImmediatePropagation();
//
//         console.log(e);
//         return false;
//     }
//
//     console.log(true);
//     // if (validateHandler() === false) {
//     //     e.preventDefault();
//     // }
// })
