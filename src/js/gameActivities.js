export function audioWord(word){
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = word.audioSrc;
    audio.play();
}

export function addStar(win){
    const starsCont = document.getElementById("stars");
    if (starsCont.children.length >= 12) 
        starsCont.removeChild(starsCont.firstChild);
    const star = document.createElement('img');
    (win) ? star.src = "./data/img/star-win.svg" : star.src = "./data/img/star.svg";
    starsCont.append(star);
}



