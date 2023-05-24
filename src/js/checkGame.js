import { modules } from "../data/cards.js";
import { cards } from "../data/cards.js";

import { audioWord } from "./wordFuncrions.js";

let randomArr = [];
let isFirstClick;

function startGame() {
    const buttonStart = document.querySelector('#startCategory');
    if (isFirstClick) {
        isFirstClick = false;
        buttonStart.textContent = 'Repeat';
        const numWords = document.querySelector('.word').id.split('-')[1];
        const cloneCards = cards[numWords].slice(0);
        randomArr = cloneCards.sort(() => Math.random() - 0.5);
        audioWord(randomArr[0]);
    } else {
        audioWord(randomArr[0]);
    }
}

function closeWords() {
    const main = document.getElementById('main');
    const words = main.querySelectorAll('.word');
    words.forEach((word) => word.classList.add('remove_translation'));
}

function openWords() {
    const main = document.getElementById('main');
    const words = main.querySelectorAll('.word');
    words.forEach((word) => word.classList.remove('remove_translation'));
}

export function checkGame() {
    const switchInput = document.getElementById("switchInput");
    const headerCategory = document.getElementById('headerCategory');
    const main = document.getElementById('main');
    let category = '';
    if (document.querySelector('.word'))
        category = modules[document.querySelector('.word').id.split('-')[1] - 1].module;
    headerCategory.innerHTML = '';
    if (switchInput.checked) {
        document.getElementById("switchText").textContent = 'Play';
        if (main.classList.contains('words_page')) {
            const button = document.createElement('button');
            const header = document.createElement('h2');
            header.textContent = category;
            header.id = "nameCategory";
            button.classList.add('start_button');
            button.id = 'startCategory';
            button.textContent = 'Play';
            headerCategory.append(header);
            headerCategory.append(button);
            button.addEventListener('click', (event) => startGame());
            isFirstClick = true;
            closeWords();
        }
    }
    else {
        document.getElementById("switchText").textContent = 'Train';
        if (main.classList.contains('words_page')) {
            const header = document.createElement('h2');
            header.textContent = category;
            header.id = "nameCategory";
            headerCategory.append(header);
            isFirstClick = true;
            openWords();
        }
    }
}