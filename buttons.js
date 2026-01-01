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

goldenAppleUpgrade.addEventListener("click", event => {
    let level = upgradeData.goldenAppleUpgrade;
    let maxLevel = UPGRADES.goldenAppleUpgrade.maxLevel;
    if (level < maxLevel){
        upgradeData.goldenAppleUpgrade++;
        renderUpgradeData();
        storeUpgradeData();
    }
})

lengthUpgrade.addEventListener("click", event => {
    let level = upgradeData.lengthUpgrade;
    let maxLevel = UPGRADES.lengthUpgrade.maxLevel;
    if (level < maxLevel){
        upgradeData.lengthUpgrade++;
        renderUpgradeData();
        storeUpgradeData();
    }
})

extendCanvasUpgrade.addEventListener("click", event => {
    let level = upgradeData.extendCanvasUpgrade;
    let maxLevel = UPGRADES.extendCanvasUpgrade.maxLevel;
    if (level < maxLevel){
        upgradeData.extendCanvasUpgrade++;
        numCols++;
        updateCanvasSize();
        renderUpgradeData();
        storeUpgradeData();
    }
})

speedUpgrade.addEventListener("click", event => {
    let level = upgradeData.speedUpgrade;
    let maxLevel = UPGRADES.speedUpgrade.maxLevel;
    if (level < maxLevel) {
        upgradeData.speedUpgrade++;
        updateSnakeSpeed();
        renderUpgradeData();
        storeUpgradeData();
    }
})

appleUpgrade.addEventListener("click", event => {
    let level = upgradeData.appleUpgrade;
    let maxLevel = UPGRADES.appleUpgrade.maxLevel;
    if (level < maxLevel){
        upgradeData.appleUpgrade++;
        appleValue = upgradeData.appleUpgrade;
        renderUpgradeData();
        storeUpgradeData();
    }
})
