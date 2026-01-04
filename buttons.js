// Pause button

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

const upBtn = document.querySelector(".button-up");
const leftBtn = document.querySelector(".button-left");
const rightBtn = document.querySelector(".button-right");
const downBtn = document.querySelector(".button-down");

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
        renderSnakeLength();
    }
})

extendCanvasUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.extendCanvasUpgrade;
    let maxLevel = UPGRADES.extendCanvasUpgrade.maxLevel;
    if (buyUpgrade(extendCanvasUpgradeEl) && level <= maxLevel){
        upgradeData.extendCanvasUpgrade++;
        numCols++;
        updateCanvasSize();
        renderUpgradeData();
        storeUpgradeData();
    }
})

speedUpgradeEl.addEventListener("click", event => {
    let level = upgradeData.speedUpgrade;
    let maxLevel = UPGRADES.speedUpgrade.maxLevel;
    if (buyUpgrade(speedUpgradeEl) && level <= maxLevel){
        upgradeData.speedUpgrade++;
        initSnakeSpeed();
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

upBtn.addEventListener("click", event => {
    if (lastState != States.down) 
        head.state = States.up;
})

leftBtn.addEventListener("click", event => {
    if (lastState != States.right) 
        head.state = States.left;
})

rightBtn.addEventListener("click", event => {
    if (lastState != States.left) 
        head.state = States.right;
})

downBtn.addEventListener("click", event => {
    if (lastState != States.up) 
        head.state = States.down;
})
