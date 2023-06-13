import { modules, cards } from "../data/cards.js";
import { audioWord, addStar } from "./gameActivities.js";
import { mainPageOpen } from "./main.js";
import { addToCorrectWord, addToMistakeWord } from "./statistics.js";

const errorSound = new Audio("./data/audio/error.mp3");
const correctAudio = new Audio("./data/audio/correct.mp3");
const successAudio = new Audio("./data/audio/success.mp3");
const failureAudio = new Audio("./data/audio/failure.mp3");

const main = document.querySelector("#main");
const headerCategory = document.querySelector(".headerCategory");
const switchInput = document.querySelector(".switchInput");
const starsCont = document.querySelector("#stars");

let randomArr = [];
let isFirstClick;
let errorGame = 0;

function startGame() {
    const buttonStart = document.querySelector("#startCategory");
    if (isFirstClick) {
        isFirstClick = false;
        buttonStart.textContent = "Repeat";
        const numWords = document.querySelector(".word").id.split("-")[1];
        const cloneCards = cards[numWords].slice(0);
        randomArr = cloneCards.sort(() => Math.random() - 0.5);
    }
    audioWord(randomArr[0]);
}

function gameOver() {
    let mistakes = "mistakes";
    headerCategory.innerHTML = "";
    starsCont.innerHTML = "";
    if (errorGame === 0) {
        main.innerHTML = `<div class="gameOver"><img class = "imgGreat" src="./data/img/happyCat.png"></div>`;
        successAudio.play();
    } else {
        if (errorGame === 1) mistakes = "mistake";
        main.innerHTML = `<div class="gameOver"> <img class = "imgGreat" src="./data/img/sadCat.png">
        <h4 class="numMistakes" >You made ${errorGame} ${mistakes}(((</h4>
        </div>`;
        failureAudio.play();
    }
    errorGame = 0;
    headerCategory.innerHTML = "";
    setTimeout(mainPageOpen, 2500);
}

export function checkWord(word) {
    if (randomArr.length === 0) return;
    if (cards[word.id.split("-")[1]][word.id.split("-")[0]].word === randomArr[0].word) {
        addStar(true);
        addToCorrectWord(word.id.split("-")[1], word.id.split("-")[0]);
        correctAudio.play();
        randomArr.shift();
        word.classList.add("inactiveWord");
        if (randomArr.length !== 0) audioWord(randomArr[0]);
        if (randomArr.length === 0) gameOver();
    }
    else {
        errorSound.play();
        addToMistakeWord(word.id.split("-")[1], word.id.split("-")[0]);
        addStar(false);
        errorGame++;
    }
}

function closeWords() {
    const words = main.querySelectorAll(".word");
    words.forEach((word) => {
        word.classList.remove("inactiveWord");
        word.classList.add("removeTranslation");
    });
}

function openWords() {
    const words = main.querySelectorAll(".word");
    words.forEach((word) => {
        word.classList.remove("inactiveWord");
        word.classList.remove("removeTranslation")
    });
}

export function checkGame() {
    errorGame = 0;
    randomArr = [];
    starsCont.innerHTML = "";
    let category = "";
    if (main.classList.contains("hardWords"))
        return;
    if (document.querySelector(".word"))
        category = modules[document.querySelector(".word").id.split("-")[1] - 1].module;
    headerCategory.innerHTML = "";
    if (switchInput.checked) {
        document.querySelector("#switchText").textContent = "Play";
        if (main.classList.contains("wordsPage")) {
            headerCategory.innerHTML += ` <h2 id="nameCategory">${category}</h2>`;
            const button = document.createElement("button");
            button.classList.add("startButton");
            button.id = "startCategory";
            button.textContent = "Play";
            headerCategory.append(button);
            button.addEventListener("click", (event) => startGame());
            isFirstClick = true;
            closeWords();
        }
    }
    else {
        document.querySelector("#switchText").textContent = "Train";
        if (main.classList.contains("wordsPage")) {
            const header = document.createElement("h2");
            header.textContent = category;
            header.id = "nameCategory";
            headerCategory.append(header);
            isFirstClick = true;
            errorGame = 0;
            openWords();
        }
    }
}

document.querySelector(".switch").addEventListener("click", event => {
    checkGame();
});