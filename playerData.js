const appleCountEl = document.querySelector("#num-apples");
const totalApplesEl = document.querySelector("#total-apples");
const timesCrashedEl = document.querySelector("#times-crashed");
const timesWonEl = document.querySelector("#times-won");
const peakLengthEl = document.querySelector("#peak-length");

const goldenAppleUpgradeEl = document.querySelector(".upgrade1");
const lengthUpgradeEl = document.querySelector(".upgrade2");
const extendCanvasUpgradeEl = document.querySelector(".upgrade3");
const speedUpgradeEl = document.querySelector(".upgrade4");
const appleUpgradeEl = document.querySelector(".upgrade5");

let upgradeElements = [goldenAppleUpgradeEl, lengthUpgradeEl, extendCanvasUpgradeEl, speedUpgradeEl, appleUpgradeEl]

const UPGRADES = {
    goldenAppleUpgrade: {maxLevel: 10, cost: 25, multiplier: 3},
    lengthUpgrade: {maxLevel: 5, cost: 100, multiplier: 6},
    extendCanvasUpgrade: {maxLevel: 5, cost: 150, multiplier: 4},
    speedUpgrade: {maxLevel: 5, cost: 150, multiplier: 3},
    appleUpgrade: {maxLevel: 10, cost: 25, multiplier: 3}
}

let playerData;
let upgradeData;
initPlayerData();
initUpgradeData();
renderPlayerData();
renderUpgradeData();

function renderPlayerData(){
    appleCountEl.textContent = playerData.appleCount;
    totalApplesEl.innerHTML = `Apples eaten: ${playerData.totalApples}<br>`;
    timesCrashedEl.innerHTML = `Times crashed: ${playerData.timesCrashed}<br>`;
    timesWonEl.innerHTML = `Times won: ${playerData.timesWon}<br>`;
    peakLengthEl.innerHTML = `Peak length: ${playerData.peakLength}`
}

function storePlayerData(){
    localStorage.setItem("playerData", JSON.stringify(playerData));
}

function initPlayerData(){
    try {
        playerData = JSON.parse(localStorage.getItem("playerData"));
    }
    catch {
        playerData = null;
    }
    playerData = {
        appleCount: playerData?.appleCount ?? STARTING_APPLES,
        totalApples: playerData?.totalApples ?? 0, 
        timesCrashed: playerData?.timesCrashed ?? 0, 
        timesWon: playerData?.timesWon ?? 0,
        peakLength: playerData?.peakLength ?? 2
    };
    storePlayerData();
}

function initUpgradeData(){
    try {
       upgradeData = JSON.parse(localStorage.getItem("upgradeData"))
    }
    catch {
        upgradeData = null;
    }
    upgradeData = {
        goldenAppleUpgrade: upgradeData?.goldenAppleUpgrade || 1,
        lengthUpgrade: upgradeData?.lengthUpgrade || 1,
        speedUpgrade: upgradeData?.speedUpgrade || 1,
        extendCanvasUpgrade: upgradeData?.extendCanvasUpgrade || 1,
        appleUpgrade: upgradeData?.appleUpgrade || 1
    }
    storeUpgradeData()
}

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
            value = ["slow", "nimble", "swift", "whirlwind", "supersonic"].at(upgradeData.speedUpgrade - 1);
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


