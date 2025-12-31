/** @type {HTMLButtonElement} */
const pauseBtn = document.querySelector(".pause img")
pauseBtn.addEventListener("click", event => {
    stopSnake = (stopSnake + 1) % 2;
    if (stopSnake) pauseBtn.setAttribute("src", "assets/resume.png");
    else pauseBtn.setAttribute("src", "assets/pause.png");
    
})