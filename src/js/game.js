import { modules } from "../data/cards.js";
import { cards } from "../data/cards.js";
import { audioWord } from "./gameActivities.js";
import { mainPageOpen } from "./main.js";
import {addStar} from "./gameActivities.js";
const errorSound = new Audio('./data/audio/error.mp3');
const correctAudio = new Audio('./data/audio/correct.mp3');
const successAudio = new Audio('./data/audio/success.mp3');
const failureAudio = new Audio('./data/audio/failure.mp3');  

let randomArr = [];
let isFirstClick; 
let errorGame = 0;

const main = document.querySelector('#main');
const headerCategory = document.getElementById('headerCategory');
const switchInput = document.getElementById("switchInput");
const starsCont = document.getElementById("stars");

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
    let mistakes = 'mistakes';
    headerCategory.innerHTML = '';
    starsCont.innerHTML = '';
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

export function checkWord(word) {
    if (randomArr.length == 0) return;
    if (cards[word.id.split('-')[1]][word.id.split('-')[0]].word == randomArr[0].word)
        {
            randomArr.shift();
            addStar(true);
            correctAudio.play();
            word.classList.add('inactive-word');
            if (randomArr.length != 0) audioWord(randomArr[0]);
            if (randomArr.length == 0) gameOver();
        }
    else
        {
            errorSound.play();
            addStar(false);
            errorGame ++;
        }
}

function closeWords() {
    const words = main.querySelectorAll('.word');
    words.forEach((word) => {
        word.classList.remove('inactive-word');
        word.classList.add('remove_translation');
        // word.addEventListener('click', (event) => checkWord(word));
    });
}

function openWords() {
    const words = main.querySelectorAll('.word');
    words.forEach((word) => {
        word.classList.remove('inactive-word');
       // word.removeEventListener('click', (event) => checkWord(word));
        word.classList.remove('remove_translation')});
}

export function checkGame() {
    errorGame = 0;
    randomArr = [];
    starsCont.innerHTML = '';
    let category = '';
    if (document.querySelector('.word'))
        category = modules[document.querySelector('.word').id.split('-')[1] - 1].module;
    headerCategory.innerHTML = '';
    if (switchInput.checked) {
        document.querySelector("#switchText").textContent = 'Play';
        if (main.classList.contains('words_page')) {
            headerCategory.innerHTML += ` <h2 id="nameCategory">${category}</h2>`;
           
            const button = document.createElement('button');
            button.classList.add('start_button');
            button.id = 'startCategory';
            button.textContent = 'Play';
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
            errorGame = 0;
            const words = main.querySelectorAll('.word');
            openWords();
        }
    }
}


document.getElementById("switch").addEventListener('click', event => {
    checkGame();
});