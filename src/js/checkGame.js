export function checkGame () {
    const switchInput = document.getElementById("switchInput");
    const startGame = document.getElementById('startGame');  
    const main = document.getElementById('main'); 
    startGame.innerHTML = '';
    if (switchInput.checked){
        document.getElementById("switchText").textContent = 'Play';
        if (main.classList.contains('words_page'))
        {
            const button = document.createElement('button');
            button.classList.add('start_button');
            button.textContent = 'Play';
            startGame.append(button);
        }
    }
    else{
        document.getElementById("switchText").textContent = 'Train';
    }
}