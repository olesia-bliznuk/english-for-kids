import { modules } from "../data/cards.js";

export function checkGame () {
    const switchInput = document.getElementById("switchInput");
    const startGame = document.getElementById('headerCategory');  
    const main = document.getElementById('main'); 
    let category = '';
    if (document.querySelector('.word'))
        category = modules[document.querySelector('.word').id.split('-')[1]-1].module;
    startGame.innerHTML = '';
    if (switchInput.checked){
        document.getElementById("switchText").textContent = 'Play';
        if (main.classList.contains('words_page'))
        {
            const button = document.createElement('button');
            const header = document.createElement('h2');
            header.textContent = category;
            header.id = "nameCategory";
            button.classList.add('start_button');
            button.textContent = 'Play';
            startGame.append(header);
            startGame.append(button);

        }
    }
    else{
        document.getElementById("switchText").textContent = 'Train';
        if (main.classList.contains('words_page'))
        {
            const header = document.createElement('h2');
            header.textContent = category;
            header.id = "nameCategory";
            startGame.append(header);
        }
    }
}