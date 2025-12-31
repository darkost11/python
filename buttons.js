/** @type {HTMLButtonElement} */
const pauseBtn = document.querySelector(".pause img");

if (stopSnake) pauseBtn.setAttribute("src", "assets/resume.png");
else pauseBtn.setAttribute("src", "assets/pause.png");

function updatePause(){
stopSnake = (stopSnake + 1) % 2;
    if (stopSnake) pauseBtn.setAttribute("src", "assets/resume.png");
    else pauseBtn.setAttribute("src", "assets/pause.png");
}
pauseBtn.addEventListener("click", updatePause);
document.addEventListener("keydown", event => {
    if (event.key === " ")
        updatePause()
})