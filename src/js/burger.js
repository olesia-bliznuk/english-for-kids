// Действие при клике на бургер
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open");
        document.body.classList.toggle("stopScrolling");
        document.querySelector(".blur").classList.toggle("backgroundBlur");
    });
});

// Закрыть меню при нажатии на Esc
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelector(".header").classList.remove("open");
    }
});

// Закрыть меню при клике вне его
document.querySelector(".nav").addEventListener("click", event => {
    event._isClickWithInMenu = true;
});

document.querySelector(".burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
});

document.body.addEventListener("click", event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open");
    document.body.classList.remove("stopScrolling");
    document.querySelector(".blur").classList.remove("backgroundBlur");
});

document.querySelector(".nav").addEventListener("click", function (event) {
    if (event.target.closest(".headerLink")) {
        document.querySelector(".header").classList.remove("open");
        document.body.classList.remove("stopScrolling");
        document.querySelector(".blur").classList.remove("backgroundBlur");
    }
});