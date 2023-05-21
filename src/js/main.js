import { cards } from "../data/cards.js";
import { modules } from "../data/cards.js";

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
}

/*MainPageOpen*/
function mainPageOpen() {
    createNavigation();
    createCards();
}

/*OpenCategory*/
function openCategory(id) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    cards[id].forEach((item) => {
    const wordsCard = document.createElement('div');
    wordsCard.classList.add('words_card');
    wordsCard.classList.add('word_trans');
    const div = document.createElement('div');
    const imgCard = document.createElement('img');
    const h4Card = document.createElement('h4');
    h4Card.textContent = item.word;
    const h5Card = document.createElement('h5');
    h5Card.textContent = 'Audio';
    imgCard.src = item.image;
    div.append(imgCard);
    wordsCard.append(div);
    wordsCard.append(h4Card);
    wordsCard.append(h5Card);
    main.append(wordsCard);
    });
}


mainPageOpen();

document.addEventListener('click', (event) => {
    if (event.target.closest('.words_card') && !event.target.closest('.word_trans')) {
        const target = event.target.closest('.words_card');
        openCategory(target.id);
    }
    if (event.target.closest('.nav')){
        const target = event.target.closest('.header_link');
        if (target != null) {
            if (target.id == 'mainPage') createCards();
            else if (target.id == 'statistics') console.log('stat');
            else if (+target.id > 0 && +target.id < 9) openCategory(target.id);
        }
    }
});







