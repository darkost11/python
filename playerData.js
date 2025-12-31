
const playerData = JSON.parse(localStorage.getItem("playerData")) || {
    appleCount:0,
    totalApples:0, 
    timesCrashed:0, 
    timesWon:0
};
const appleCount = document.querySelector(".apple-count span");
const totalApples = document.querySelector("#total-apples");
const timesCrashed = document.querySelector("#times-crashed");
const timesWon = document.querySelector("#times-won");

function renderData(){
    appleCount.textContent = playerData.appleCount;
    totalApples.innerHTML = `Apples eaten: ${playerData.totalApples}<br>`;
    timesCrashed.innerHTML = `Times crashed: ${playerData.timesCrashed}<br>`;
    timesWon.innerHTML = `Times won: ${playerData.timesWon}<br>`;
}

renderData()

function storeData(){
    localStorage.setItem("playerData", JSON.stringify(playerData));
}