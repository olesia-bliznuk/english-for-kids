import { cards } from "../data/cards.js";
import { modules } from "../data/cards.js";
import { checkGame } from './checkGame.js';
import { audioWord, rotateWord } from './wordFuncrions.js';

function createNavItem(text, id, nav) {
    const navLink = document.createElement('a');
    navLink.classList.add('header_link');
    navLink.textContent = text;
    navLink.id = id;
    return navLink;
}

function createNavigation() {
    const nav = document.getElementById("nav");
    nav.append(createNavItem('Main Page', 'mainPage'));
    cards[0].forEach((item, index) => {
        nav.append(createNavItem(item, index + 1));
    });
    nav.append(createNavItem('Statistics', 'statistics'));
}

function createCards() {
    const main = document.getElementById('main');
    main.classList.remove('words_page');
    main.innerHTML = '';
    for (let i = 0; i < modules.length; i++) {
        const wordsCard = document.createElement('div');
        wordsCard.classList.add('words_card');
        wordsCard.id = i + 1;
        const div = document.createElement('div');
        const imgCard = document.createElement('img');
        const h4Card = document.createElement('h4');
        h4Card.textContent = modules[i].module;
        const h5Card = document.createElement('h5');
        h5Card.textContent = '8 cards';
        imgCard.src = modules[i].image;
        div.append(imgCard);
        wordsCard.append(div);
        wordsCard.append(h4Card);
        wordsCard.append(h5Card);
        main.append(wordsCard);
    }
    checkGame();
}

/*MainPageOpen*/
function mainPageOpen() {
    createNavigation();
    createCards();
}

/*OpenCategory*/
function openCategory(id) {
    const main = document.getElementById('main');
    main.classList.add('words_page');
    main.innerHTML = '';
    for (let i = 0; i < cards[id].length; i++) {
        const wordsCard = document.createElement('div');
        wordsCard.id = `${i}-${id}`;
        wordsCard.classList.add('words_card');
        wordsCard.classList.add('word');
        wordsCard.addEventListener('mouseleave', () => {
            wordsCard.classList.remove('word_active');
        });
        wordsCard.innerHTML = `<div class="front">
        <img class="word_image" src="${cards[id][i].image}">
        <div class="word_transcript"><h4>${cards[id][i].word}</h4>
        <button class="button_rotate"></button></div>
        </div>
        <div class="back"><img class="word_image" src="${cards[id][i].image}">
        <div class="word_transcript"><h4>${cards[id][i].translation}</h4>
        </div>`;
        main.append(wordsCard);
    }
    checkGame();
}

/*statistics*/
function staticticsPage() {
    const main = document.getElementById('main');
    main.innerHTML = '';
}


mainPageOpen();

document.addEventListener('click', (event) => {
    if (event.target.closest('.words_card') && !event.target.closest('.word')) {
        const target = event.target.closest('.words_card');
        openCategory(target.id);
    }
    if (event.target.closest('.nav')) {
        const target = event.target.closest('.header_link');
        if (target != null) {
            if (target.id == 'mainPage') createCards();
            else if (target.id == 'statistics') staticticsPage();
            else if (+target.id > 0 && +target.id < 9) openCategory(target.id);
        }
    }
    if (event.target.closest('.button_rotate')) {
        const target = event.target.closest('.word');
        const wordTrans = target.querySelector(".word_transcript");
        audioWord(cards[target.id.split('-')[1]][event.target.closest('.word').id.split('-')[0]]);
        target.classList.add('word_active');
    } else if (event.target.closest('.front')) {
        const target = event.target.closest('.word');
        const numPage = target.id.split('-')[1];
        audioWord(cards[numPage][target.id.split('-')[0]]);
    }
});







