import { modules } from "../data/cards.js";
import { cards } from "../data/cards.js";
import { audioWord } from "./wordFuncrions.js";
import { mainPageOpen } from "./main.js";
const errorSound = new Audio('../data/audio/error.mp3');
const correctAudio = new Audio('../data/audio/correct.mp3');
const successAudio = new Audio('../data/audio/success.mp3');
const failureAudio = new Audio('../data/audio/failure.mp3');

let randomArr = [];
let isFirstClick;
let errorGame = 0;

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

function gameOver(){
    const main = document.getElementById('main');
    const headerCategory = document.getElementById('headerCategory');
    let mistakes = 'mistakes';
    headerCategory.innerHTML = '';
    if (errorGame == 0){
        main.innerHTML = `<div class="game-over"><img class = "img-great" src="./data/img/happyCat.png"></div>`;
        successAudio.play();
    }else{
        if (errorGame == 1) mistakes = 'mistake';
        main.innerHTML = `<div class="game-over"> <img class = "img-great" src="./data/img/sadCat.png">
        <h4 class="num-mistakes" >You made ${errorGame} ${mistakes}(((</h4>
        </div>`;
        failureAudio.play();
    }
    errorGame = 0;
    headerCategory.innerHTML = '';
    setTimeout(mainPageOpen, 2500);
}

function checkWord(word) {
    if (cards[word.id.split('-')[1]][word.id.split('-')[0]].word == randomArr[0].word)
        {
            randomArr.shift();
            correctAudio.play();
            word.classList.add('inactive-word');
            audioWord(randomArr[0]);
            if (randomArr.length == 0) gameOver();
        }
    else
        {
            errorSound.play();
            errorGame ++;
        }
}

function closeWords() {
    const main = document.getElementById('main');
    const words = main.querySelectorAll('.word');
    words.forEach((word) => {
        word.classList.add('remove_translation')
        word.addEventListener('click', (event) => checkWord(word));
    });
}

function openWords() {
    const main = document.getElementById('main');
    const words = main.querySelectorAll('.word');
    words.forEach((word) => {
        word.removeEventListener('click', (event) => checkWord(word));
        word.classList.remove('remove_translation')});
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
            randomArr = [];
            const header = document.createElement('h2');
            header.textContent = category;
            header.id = "nameCategory";
            headerCategory.append(header);
            isFirstClick = true;
            errorGame = 0;
            const words = main.querySelectorAll('.word');
            openWords();
        }
    }
}