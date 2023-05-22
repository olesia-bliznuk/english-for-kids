export function audioWord(word){
    let audio = new Audio();
    audio.preload = 'auto';
    audio.src = word.audioSrc;
    audio.play();
}

export function rotateWord(word){
    word.classList.add('rotatey-animation');
}