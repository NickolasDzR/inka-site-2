const url = "http://inka.finance:90/api/subscribe";

const btn = document.querySelector(".button");
const formError = document.querySelector(".callback__form").dataset.error;

async function sendData(formData) {
    await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
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

    const inputs = e.target.closest("form").querySelectorAll("input");
    let inputsData = {};

    inputs.forEach((el, index) => {
        inputsData[inputs[index].dataset.type] = inputs[index].value;
    });

    return sendData(inputsData);
});
