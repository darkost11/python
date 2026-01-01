let playerData = JSON.parse(localStorage.getItem("playerData"));
if (!playerData) resetPlayerData();

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

function storeData(){
    localStorage.setItem("playerData", JSON.stringify(playerData));
}

function resetPlayerData(){
    playerData = {
        appleCount:0,
        totalApples:0, 
        timesCrashed:0, 
        timesWon:0
    };
    storeData();
}

let upgradeData = JSON.parse(localStorage.getItem("upgradeData"))
if (!upgradeData) resetUpgradeData();

const goldenAppleUpgrade = document.querySelector(".item1");
const lengthUpgrade = document.querySelector(".item2");
const extendCanvasUpgrade = document.querySelector(".item3");
const speedUpgrade = document.querySelector(".item4");
const appleUpgrade = document.querySelector(".item5");

function renderUpgradeData(){
    goldenAppleUpgrade.querySelector("span").textContent = `${upgradeData.goldenAppleUpgrade}/${UPGRADES.goldenAppleUpgrade.maxLevel}`;    
    lengthUpgrade.querySelector("span").textContent = `${upgradeData.lengthUpgrade}/${UPGRADES.lengthUpgrade.maxLevel}`;
    speedUpgrade.querySelector("span").textContent = `${upgradeData.speedUpgrade}/${UPGRADES.speedUpgrade.maxLevel}`;  
    extendCanvasUpgrade.querySelector("span").textContent = `${upgradeData.extendCanvasUpgrade}/${UPGRADES.extendCanvasUpgrade.maxLevel}`;  
    appleUpgrade.querySelector("span").textContent = `${upgradeData.appleUpgrade}/${UPGRADES.appleUpgrade.maxLevel}`;    
}

function storeUpgradeData(){
    localStorage.setItem("upgradeData", JSON.stringify(upgradeData));
}

function resetUpgradeData(){
    upgradeData = {
    goldenAppleUpgrade: 1,
    lengthUpgrade: 1,
    speedUpgrade: 1,
    extendCanvasUpgrade: 1,
    appleUpgrade: 1
    }
    storeUpgradeData()
}

const UPGRADES = {
    goldenAppleUpgrade: {maxLevel: 10, cost: 100, multiplier: 2},
    lengthUpgrade: {maxLevel: 5, cost: 100, multiplier: 6},
    speedUpgrade: {maxLevel: 5, cost: 100, multiplier: 3, level1: 400, level2: 340, level3: 280, level4: 240, level5 : 220 },
    extendCanvasUpgrade: {maxLevel: 4, cost: 100, multiplier: 3},
    appleUpgrade: {maxLevel: 5, cost: 300, multiplier: 4}
}

renderData()
renderUpgradeData()