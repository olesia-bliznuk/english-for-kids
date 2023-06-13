import { cards } from "../data/cards.js";
import { checkGame } from "./game.js";

let dataStat;
let colIndex = -1;

function resetStat() {
    localStorage.removeItem("statistics");
    createStatData();
    createStatPage();
}

function hardWords() {
    const headerCategory = document.querySelector(".headerCategory");
    headerCategory.innerHTML += ` <h2 id="nameCategory">Difficult words</h2>`;
    const button = document.createElement("button");
    button.classList.add("startButton");
    button.id = "closeWords";
    button.textContent = "Close";
    button.addEventListener("click", (event) => {
        createStatPage();
        main.classList.remove("hardWords");
    });
    headerCategory.append(button);
    const main = document.querySelector("#main");
    main.innerHTML = "";
    main.classList.add("hardWords");
    const arrHardWords = dataStat.filter((el) => el.mistakes !== 0).sort((a, b) => b.mistakes - a.mistakes).splice(0, 8);
    if (arrHardWords.length === 0)
        main.innerHTML = `<h2 class="noWords">No words to repeat</h2>`;
    else {
        main.classList.remove("noGrid");
        for (let i = 0; i < arrHardWords.length; i++) {
            const wordsCard = document.createElement("div");
            wordsCard.id = `${arrHardWords[i].id}`;
            wordsCard.classList.add("wordsCard");
            wordsCard.classList.add("word");
            wordsCard.addEventListener("mouseleave", () => {
                wordsCard.classList.remove("wordActive");
            });
            wordsCard.innerHTML = `<div class="front">
        <img class="wordImage" src="${arrHardWords[i].image}">
        <div class="wordTranscript"><h4>${arrHardWords[i].word}</h4>
        <button class="buttonRotate"></button></div>
        </div>
        <div class="back"><img class="wordImage" src="${arrHardWords[i].image}">
        <div class="wordTranscript"><h4>${arrHardWords[i].translation}</h4>
        </div>`;
            main.append(wordsCard);
        }
    }
}

export function addToTrainWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].train++;
    localStorage.setItem("statistics", JSON.stringify(dataStat));
}

export function addToCorrectWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].correct++;
    dataStat[index].per = Math.floor((dataStat[index].correct * 100) / (dataStat[index].correct + dataStat[index].mistakes));
    localStorage.setItem("statistics", JSON.stringify(dataStat));
}

export function addToMistakeWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].mistakes++;
    dataStat[index].per = Math.floor((dataStat[index].correct * 100) / (dataStat[index].correct + dataStat[index].mistakes));
    localStorage.setItem("statistics", JSON.stringify(dataStat));
}

export function createStatData() {
    const data = localStorage.getItem("statistics");
    if (data) {
        dataStat = JSON.parse(data);
    } else {
        dataStat = [];
        for (let i = 1; i < cards.length; i++) {
            for (let j = 0; j < cards[i].length; j++) {
                const statEl = {
                    category: cards[0][i - 1],
                    word: cards[i][j].word,
                    translation: cards[i][j].translation,
                    train: 0,
                    correct: 0,
                    mistakes: 0,
                    per: 0,
                    id: `${j}-${i}`,
                    image: cards[i][j].image,
                }
                dataStat.push(statEl);
            }
        }
        localStorage.setItem("statistics", JSON.stringify(dataStat));
    }
}


function sortTable(index, isSorted) {
    const table = document.querySelector("#statTable");
    let sortedRows = Array.from(table.rows).slice(1);
    const headerRow = table.rows[0];
    const columnHeaderCell = headerRow.cells[index];
    const columnHeader = columnHeaderCell.innerText;
    const type =
        columnHeader === "Translation" || columnHeader === "Category" || columnHeader === "Word"
            ? "text"
            : "number";
    sortedRows.sort((rowA, rowB) => {
        switch (type) {
            case "number":
                return Number(rowB.cells[index].innerHTML) - Number(rowA.cells[index].innerHTML);
                break;
            case "text":
                if (rowA.cells[index].innerHTML < rowB.cells[index].innerHTML) return -1;
                if (rowA.cells[index].innerHTML > rowB.cells[index].innerHTML) return 1;
                return 0;
                break;
        }
    });

    if (isSorted) sortedRows.reverse();

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = 0; i < sortedRows.length; i++) {
        table.appendChild(sortedRows[i]);
    }

}

export function createStatPage() {
    const headerCategory = document.querySelector(".headerCategory");
    headerCategory.innerHTML = "";
    const main = document.querySelector("#main");
    main.classList.remove("wordsPage");
    main.classList.add("noGrid");
    checkGame();
    main.innerHTML = "";
    const cont = document.createElement("div");
    cont.classList.add("contBtn");
    main.append(cont);

    const diffButton = document.createElement("button");
    diffButton.classList.add("btnDiffWords");
    diffButton.textContent = "Difficult words";
    cont.append(diffButton);
    diffButton.addEventListener("click", hardWords);


    const buttonReset = document.createElement("button");
    buttonReset.classList.add("btnReset");
    buttonReset.textContent = "Reset stats";
    cont.append(buttonReset);
    buttonReset.addEventListener("click", resetStat);

    const table = document.createElement("table");
    table.classList.add("statTable");
    table.id = "statTable";
    table.innerHTML = ` <thead class="headerTable">  <th>Category</th>
     <th>Word</th> <th>Translation</th> <th>Train</th> <th>Correct</th> <th>Mistakes</th> <th>%</th> </thead>`;
    for (let i = 0; i < dataStat.length; i++) {
        const line = document.createElement("tr");
        line.innerHTML = `<td>${dataStat[i].category}</td><td>${dataStat[i].word}</td><td>${dataStat[i].translation}</td>
            <td>${dataStat[i].train}</td><td>${dataStat[i].correct}</td>
            <td>${dataStat[i].mistakes}</td><td>${dataStat[i].per}</td>`;
        table.append(line);
    }
    table.addEventListener("click", (event) => {
        if (event.target.closest("th")) {
            const index = event.target.cellIndex;
            sortTable(index, colIndex === index);
            colIndex = (colIndex === index) ? -1 : index;
        }
    });
    main.append(table);
}