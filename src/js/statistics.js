import { cards } from "../data/cards.js";
import { checkGame } from './game.js';

let dataStat;
let colIndex = -1;

class statElement {
    constructor(category, word, translation, id, image) {
        this.category = category;
        this.word = word;
        this.translation = translation;
        this.train = 0;
        this.correct = 0;
        this.mistakes = 0;
        this.per = 0;
        this.id = id;
        this.image = image;
    }
}

function resetStat() {
    localStorage.removeItem('statistics');
    createStatData();
    createStatPage();
}

function hardWords() {

    const headerCategory = document.getElementById('headerCategory');
    headerCategory.innerHTML += ` <h2 id="nameCategory">Difficult words</h2>`;
    const button = document.createElement('button');
    button.classList.add('start_button');
    button.id = 'closeWords';
    button.textContent = 'Close';
    button.addEventListener('click', (event) => {
        createStatPage();
        main.classList.remove('hardWords');
    });
    headerCategory.append(button);
    //очистить страницу 
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.classList.add('hardWords');
    //выбрать слова
    const arrHardWords = dataStat.filter((el) => el.mistakes !== 0).sort((a, b) => b.mistakes - a.mistakes).splice(0, 8);
    //если нет слова то написать об этом
    if (arrHardWords.length === 0)
        main.innerHTML = '<h2 class="noWords">No words to repeat</h2>';
    else {
        //создать страницу со словами 
        main.classList.remove('no-grid');
        for (let i = 0; i < arrHardWords.length; i++) {
            const wordsCard = document.createElement('div');
            wordsCard.id = `${arrHardWords[i].id}`;
            wordsCard.classList.add('words_card');
            wordsCard.classList.add('word');
            wordsCard.addEventListener('mouseleave', () => {
                wordsCard.classList.remove('word_active');
            });
            wordsCard.innerHTML = `<div class="front">
        <img class="word_image" src="${arrHardWords[i].image}">
        <div class="word_transcript"><h4>${arrHardWords[i].word}</h4>
        <button class="button_rotate"></button></div>
        </div>
        <div class="back"><img class="word_image" src="${arrHardWords[i].image}">
        <div class="word_transcript"><h4>${arrHardWords[i].translation}</h4>
        </div>`;
            main.append(wordsCard);
        }
    }

    //добавить туда кнопку закрыть
}

function changePerWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].per = (dataStat[index].correct * 100) / (dataStat[index].correct + dataStat[index].mistakes);
}

export function addToTrainWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].train++;
    localStorage.setItem('statistics', JSON.stringify(dataStat));
}

export function addToCorrectWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].correct++;
    dataStat[index].per = (dataStat[index].correct * 100) / (dataStat[index].correct + dataStat[index].mistakes);
    // changePerWord(category, word);
    localStorage.setItem('statistics', JSON.stringify(dataStat));
}

export function addToMistakeWord(category, word) {
    const index = +((category - 1) * 8 + +word);
    dataStat[index].mistakes++;
    dataStat[index].per = (dataStat[index].correct * 100) / (dataStat[index].correct + dataStat[index].mistakes);
    localStorage.setItem('statistics', JSON.stringify(dataStat));
    changePerWord(category, word);
}

export function createStatData() {
    const data = localStorage.getItem('statistics');
    if (data) {
        // Данные уже существуют, загружаем их
        dataStat = JSON.parse(data);
    } else {
        // Данные еще не существуют, создаем новый массив и сохраняем его в локальном хранилище
        dataStat = [];
        for (let i = 1; i < cards.length; i++) {
            for (let j = 0; j < cards[i].length; j++) {
                const statEl = new statElement(cards[0][i - 1], cards[i][j].word, cards[i][j].translation, `${j}-${i}`, cards[i][j].image);
                dataStat.push(statEl);
            }
        }
        localStorage.setItem('statistics', JSON.stringify(dataStat));
    }
}


function sortTable(index, isSorted){
    const table = document.querySelector('#stat_table');
    let sortedRows = Array.from(table.rows).slice(1);

    //const type = typeof sortedRows[0][index];
    const headerRow = table.rows[0]; // Предполагаем, что заголовочная строка находится в первой строке таблицы
   const  columnHeaderCell = headerRow.cells[index];
    const columnHeader = columnHeaderCell.innerText;
    const type =
    columnHeader === 'Translation' || columnHeader === 'Category' || columnHeader === 'Word'
      ? 'text'
      : 'number';

    // columnHeaderCell.innerText = `${columnHeaderCell.innerText}!`;
    sortedRows.sort((rowA, rowB) => {
        switch(type){
            case 'number':
                return Number(rowB.cells[index].innerHTML) - Number(rowA.cells[index].innerHTML);
                break;
            case 'text':
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
    
    for (let i = 0; i < sortedRows.length; i++){
        table.appendChild(sortedRows[i]);
    }


    
}

export function createStatPage() {
    const headerCategory = document.getElementById('headerCategory');
    headerCategory.innerHTML = ``;
    const main = document.querySelector('main');
    main.classList.remove('words_page');
    main.classList.add('no-grid');
    checkGame();
    main.innerHTML = '';
    // main.innerHTML = `<div class="cont_btn"><button class="btn_diff_words">Difficult words</button>
    // <button id="btn_reset" class="btn_reset">Reset stats</button></div>`;
    const cont = document.createElement('div');
    cont.classList.add("cont_btn");
    main.append(cont);

    const diff_button = document.createElement('button');
    diff_button.classList.add("btn_diff_words");
    diff_button.id = "btn_diff_words";
    diff_button.textContent = "Difficult words";
    cont.append(diff_button);
    diff_button.addEventListener('click', hardWords);


    const button = document.createElement('button');
    button.classList.add("btn_reset");
    button.id = "btnReset";
    button.textContent = "Reset stats";
    cont.append(button);
    button.addEventListener('click', resetStat);



    const table = document.createElement('table');
    table.classList.add('stat_table');
    table.id = 'stat_table';
    table.innerHTML = ` <thead class="header_table">  <th>Category</th>
     <th>Word</th> <th>Translation</th> <th>Train</th> <th>Correct</th> <th>Mistakes</th> <th>%</th> </thead>`;
    for (let i = 0; i < dataStat.length; i++) {
        const line = document.createElement('tr');
        line.innerHTML = `<td>${dataStat[i].category}</td><td>${dataStat[i].word}</td><td>${dataStat[i].translation}</td>
            <td>${dataStat[i].train}</td><td>${dataStat[i].correct}</td>
            <td>${dataStat[i].mistakes}</td><td>${dataStat[i].per}</td>`;
        table.append(line);
    }
    table.addEventListener('click', (event) => {
        if(event.target.closest('th')){
            const index = event.target.cellIndex;
            sortTable(index, colIndex === index);
            colIndex = (colIndex === index)? -1 : index;
        }
    });
    main.append(table);
}



