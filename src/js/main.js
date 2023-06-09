import { cards } from "../data/cards.js";
import { modules } from "../data/cards.js";
import { checkGame } from './game.js';
import { audioWord, rotateWord } from './gameActivities.js';
import {checkWord} from './game.js';
import {createStatPage} from './statistics.js';
import {createStatData} from './statistics.js';
import {addToTrainWord} from './statistics.js';


const nav = document.querySelector("nav");
const main = document.querySelector('main'); 
const headerCategory = document.getElementById('headerCategory');


//Create nav item
function createNavItem(text, id, nav) { 
    const navLink = document.createElement('a');
    navLink.classList.add('header_link');
    navLink.textContent = text;
    navLink.id = id;
    return navLink;
}

//Create nav menu
function createNavigation() {
    nav.innerHTML = '';
    nav.append(createNavItem('Main Page', 'mainPage'));
    cards[0].forEach((item, index) => {
        nav.append(createNavItem(item, index + 1));
    });
    nav.append(createNavItem('Statistics', 'statistics'));
}

//Создание карт с названиями категорий 
function createCards() {
    const starsCont = document.getElementById("stars");
    main.classList.remove('words_page');
    main.innerHTML = '';
    for (let i = 0; i < modules.length; i++) {
        main.innerHTML += `<div id="${i + 1}" class="words_card">
        <div><img src="${modules[i].image}"></div>
        <h4>${modules[i].module}</h4>
        <h5>8 cards</h5>
        </div>`;
    }
    headerCategory.innerHTML = '';
    starsCont.innerHTML = '';

}

/*MainPageOpen*/
export function mainPageOpen() {
    createNavigation();
    createCards();
    createStatData();
}

/*OpenCategory*/
function openCategory(id) {
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
        wordsCard.addEventListener('click', (event) => checkWord(wordsCard));
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

/*Statistics page*/
function staticticsPage() {
    createStatPage();
}

mainPageOpen();


document.addEventListener('click', (event) => {
    //Open category 
    if (event.target.closest('.words_card') && !event.target.closest('.word')) {
        const target = event.target.closest('.words_card');
        openCategory(target.id);
    }
    //Open links in nav 
    if (event.target.closest('.nav')) {
        const target = event.target.closest('.header_link');
        main.classList.remove('hardWords');
        if (target != null) {
            if (target.id == 'mainPage') {
                createCards();
                main.classList.remove('no-grid');
            }
            else if (target.id == 'statistics') staticticsPage();
            else if (+target.id > 0 && +target.id < 9) {
                openCategory(target.id);
                main.classList.remove('no-grid');
            }
        }
    }
    //Rotate cards with words
    if (event.target.closest('.button_rotate')) {
        const target = event.target.closest('.word');
        const wordTrans = target.querySelector(".word_transcript");
        audioWord(cards[target.id.split('-')[1]][event.target.closest('.word').id.split('-')[0]]);
        target.classList.add('word_active');
        addToTrainWord(target.id.split('-')[1], event.target.closest('.word').id.split('-')[0]);
    } else if (event.target.closest('.front') && !event.target.closest('.remove_translation')) {
        const target = event.target.closest('.word');
        const numPage = target.id.split('-')[1];
        audioWord(cards[numPage][target.id.split('-')[0]]);
        addToTrainWord(target.id.split('-')[1], event.target.closest('.word').id.split('-')[0]);
    }
});







