let playerData = JSON.parse(localStorage.getItem("playerData"));
if (!playerData) resetPlayerData();

const appleCount = document.querySelector("#num-apples");
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

const goldenAppleUpgradeEl = document.querySelector(".upgrade1");
const lengthUpgradeEl = document.querySelector(".upgrade2");
const extendCanvasUpgradeEl = document.querySelector(".upgrade3");
const speedUpgradeEl = document.querySelector(".upgrade4");
const appleUpgradeEl = document.querySelector(".upgrade5");

let upgradeElements = [goldenAppleUpgradeEl, lengthUpgradeEl, extendCanvasUpgradeEl, speedUpgradeEl, appleUpgradeEl]
function renderUpgradeData(){
    
    Object.keys(UPGRADES).forEach((key, index) => {
        let el = upgradeElements[index];
        let level = upgradeData[key];
        let upgrade = UPGRADES[key];
        let upgradeCost = (level === upgrade.maxLevel) ? "MAX" : `${upgrade.cost * Math.pow(upgrade.multiplier, level - 1)}`;

        el.querySelector(".upgrade-level").textContent = `${level}/${upgrade.maxLevel}`;
        el.querySelector(".upgrade-cost").textContent = upgradeCost;
        renderCurrent(el, level, upgrade);
    })
}

function renderCurrent(el, level, upgrade){
    let value = "nothing";
    switch (upgrade){
        case UPGRADES.goldenAppleUpgrade:
            value = `${(level - 1) * 10}%`;
            break;
        case UPGRADES.lengthUpgrade:
            if (level > 1)
                value = `doubled for every ${28 - 4 * (level - 1)}'th part`
            break;
        case UPGRADES.extendCanvasUpgrade:
            if (level > 1)
                value = `+${level - 1} columns`;
            break
        case UPGRADES.speedUpgrade:
            value = ["steady", "nimble", "swift", "doublequick", "supersonic"].at(level - 1);
            break;
        case UPGRADES.appleUpgrade:
            value = `${level}`;
            break
    }
    el.querySelector(".upgrade-value").textContent = value;
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
    goldenAppleUpgrade: {maxLevel: 10, cost: 150, multiplier: 2},
    lengthUpgrade: {maxLevel: 5, cost: 200, multiplier: 6},
    extendCanvasUpgrade: {maxLevel: 5, cost: 300, multiplier: 4},
    speedUpgrade: {maxLevel: 5, cost: 200, multiplier: 3, level1: 400, level2: 340, level3: 280, level4: 240, level5 : 220 },
    appleUpgrade: {maxLevel: 8, cost: 100, multiplier: 2}
}

renderData()
renderUpgradeData()