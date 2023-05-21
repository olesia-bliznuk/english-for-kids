export function audioWord(item){
    let audio = new Audio();
    audio.preload = 'auto';
    audio.src = item.audioSrc;
    audio.play();
}