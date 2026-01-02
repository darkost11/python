/** @type {HTMLButtonElement} */

// Pause button

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


// Upgrade buttons

goldenAppleUpgradeEl.addEventListener("click", event => {

    let level = upgradeData.goldenAppleUpgrade;
    let maxLevel = UPGRADES.goldenAppleUpgrade.maxLevel;
    if (buyUpgrade(goldenAppleUpgradeEl) && level <= maxLevel){
        upgradeData.goldenAppleUpgrade++;
        renderUpgradeData();
        storeUpgradeData();
    }
})
    

lengthUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.lengthUpgrade;
    let maxLevel = UPGRADES.lengthUpgrade.maxLevel;
    if (buyUpgrade(lengthUpgradeEl) && level <= maxLevel){
        upgradeData.lengthUpgrade++;
        renderUpgradeData();
        storeUpgradeData();
    }
})

extendCanvasUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.extendCanvasUpgrade;
    let maxLevel = UPGRADES.extendCanvasUpgrade.maxLevel;
    if (buyUpgrade(extendCanvasUpgradeEl) && level <= maxLevel){
        upgradeData.extendCanvasUpgrade++;
        numCols++;
        renderUpgradeData();
        storeUpgradeData();
    }
})

speedUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.speedUpgrade;
    let maxLevel = UPGRADES.speedUpgrade.maxLevel;
    if (buyUpgrade(speedUpgradeEl) && level <= maxLevel){
        upgradeData.speedUpgrade++;
        updateSnakeSpeed();
        renderUpgradeData();
        storeUpgradeData();
    }
})

appleUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.appleUpgrade;
    let maxLevel = UPGRADES.appleUpgrade.maxLevel;
    if (buyUpgrade(appleUpgradeEl) && level <= maxLevel){
        upgradeData.appleUpgrade++;
        appleValue++;
        renderUpgradeData();
        storeUpgradeData();
    }
})
