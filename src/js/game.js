document.getElementById("switch").addEventListener('click', event => {
    const switchInput = document.getElementById("switchInput");
    if (switchInput.checked)
        document.getElementById("switchText").textContent = 'Play';
    else
    document.getElementById("switchText").textContent = 'Train';
});