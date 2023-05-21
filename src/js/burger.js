// Действие при клике на бургер
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open");
        document.querySelector(".blur").classList.toggle("background_blur");
    })
});

// Закрыть меню при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelector(".header").classList.remove("open");
    }
});

// Закрыть меню при клике вне его
document.getElementById("nav").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

// Закрыть меню при клике на ссылку
// document.querySelector('.header_link').addEventListener('click', event => {
//     event._isClickWithInMenu = true;
// });

document.getElementById("burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open");
    document.querySelector(".blur").classList.remove("background_blur");
});

document.querySelector('.nav').addEventListener('click', function (event) {
    if (event.target.closest('.header_link')) {
        document.querySelector(".header").classList.remove("open");
        document.querySelector(".blur").classList.remove("background_blur");
    }
});