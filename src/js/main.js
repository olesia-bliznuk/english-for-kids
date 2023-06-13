import { cards, modules } from "../data/cards.js";
import { checkGame, checkWord } from "./game.js";
import { audioWord } from "./gameActivities.js";
import { createStatPage, createStatData, addToTrainWord } from "./statistics.js";


const nav = document.querySelector(".nav");
const main = document.querySelector("#main");
const headerCategory = document.querySelector(".headerCategory");


//Create nav item
function createNavItem(text, id, nav) {
    const navLink = document.createElement("a");
    navLink.classList.add("headerLink");
    navLink.textContent = text;
    navLink.id = id;
    return navLink;
}

//Create nav menu
function createNavigation() {
    nav.innerHTML = "";
    nav.append(createNavItem("Main Page", "mainPage"));
    cards[0].forEach((item, index) => {
        nav.append(createNavItem(item, index + 1));
    });
    nav.append(createNavItem("Statistics", "statistics"));
}

//Create category"s cards
function createCards() {
    const starsCont = document.querySelector("#stars");
    main.classList.remove("wordsPage");
    main.innerHTML = "";
    for (let i = 0; i < modules.length; i++) {
        main.innerHTML += `<div id="${i + 1}" class="wordsCard">
        <div><img src="${modules[i].image}"></div>
        <h4>${modules[i].module}</h4>
        <h5>8 cards</h5>
        </div>`;
    }
    headerCategory.innerHTML = "";
    starsCont.innerHTML = "";
}

/*MainPageOpen*/
export function mainPageOpen() {
    createNavigation();
    createCards();
    createStatData();
}

/*OpenCategory*/
function openCategory(id) {
    main.classList.add("wordsPage");
    main.innerHTML = "";
    for (let i = 0; i < cards[id].length; i++) {
        const wordsCard = document.createElement("div");
        wordsCard.id = `${i}-${id}`;
        wordsCard.classList.add("wordsCard");
        wordsCard.classList.add("word");
        wordsCard.addEventListener("mouseleave", () => {
            wordsCard.classList.remove("wordActive");
        });
        wordsCard.addEventListener("click", (event) => checkWord(wordsCard));
        wordsCard.innerHTML = `<div class="front">
        <img class="wordImage" src="${cards[id][i].image}">
        <div class="wordTranscript"><h4>${cards[id][i].word}</h4>
        <button class="buttonRotate"></button></div>
        </div>
        <div class="back"><img class="wordImage" src="${cards[id][i].image}">
        <div class="wordTranscript"><h4>${cards[id][i].translation}</h4>
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

document.addEventListener("click", (event) => {
    //Open category 
    if (event.target.closest(".wordsCard") && !event.target.closest(".word")) {
        const target = event.target.closest(".wordsCard");
        openCategory(target.id);
    }
    //Open links in nav 
    if (event.target.closest(".nav")) {
        const target = event.target.closest(".headerLink");
        main.classList.remove("hardWords");
        if (target !== null) {
            if (target.id === "mainPage") {
                createCards();
                main.classList.remove("noGrid");
            }
            else if (target.id === "statistics") staticticsPage();
            else if (+target.id > 0 && +target.id < 9) {
                openCategory(target.id);
                main.classList.remove("noGrid");
            }
        }
    }
    //Rotate cards with words
    if (event.target.closest(".buttonRotate")) {
        const target = event.target.closest(".word");
        const wordTrans = target.querySelector(".wordTranscript");
        audioWord(cards[target.id.split("-")[1]][event.target.closest(".word").id.split("-")[0]]);
        target.classList.add("wordActive");
        addToTrainWord(target.id.split("-")[1], event.target.closest(".word").id.split("-")[0]);
    } else if (event.target.closest(".front") && !event.target.closest(".removeTranslation")) {
        const target = event.target.closest(".word");
        const numPage = target.id.split("-")[1];
        audioWord(cards[numPage][target.id.split("-")[0]]);
        addToTrainWord(target.id.split("-")[1], event.target.closest(".word").id.split("-")[0]);
    }
});







