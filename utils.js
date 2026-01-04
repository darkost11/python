const SPEED_PRESETS = {
    slow: 400,
    nimble: 340,
    swift: 280,
    whirlwind: 240,
    supersonic: 220
}
let INTERVAL_MS;
let lastTime = Date.now();
let cur_included = 0;
const selectSpeedEl = document.querySelector(".select-speed");
initSnakeSpeed();

function updateCanvasSize(){
    canvasWidth = numCols * cellSize;
    canvasHeight = numRows * cellSize;
    canvasContainer.style.setProperty("width", `${canvasWidth}px`);
    canvasContainer.style.setProperty("height", `${canvasHeight}px`);
    canvas.style.setProperty("width", `${canvasWidth}px`);
    canvas.style.setProperty("height", `${canvasHeight}px`);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function initSnakeSpeed(){
    let key = Object.keys(SPEED_PRESETS).at(upgradeData.speedUpgrade - 1);
    INTERVAL_MS = SPEED_PRESETS[key];
    initSelectSpeedEl();
    storeUpgradeData();
    renderUpgradeData();

}

function initSelectSpeedEl(){
    for(cur_included; cur_included < upgradeData.speedUpgrade; cur_included++){
        let key = Object.keys(SPEED_PRESETS).at(cur_included);
        const option = document.createElement("option");
        option.textContent = key;
        if (cur_included === upgradeData.speedUpgrade - 1){
            option.selected = true;
        }
        selectSpeedEl.appendChild(option);
    }
}

selectSpeedEl.addEventListener("change", event => {
    const targetEl = event.target;
    INTERVAL_MS = SPEED_PRESETS[targetEl.value];
    targetEl.blur();
})

function isTimeElapsed(){
    currentTime = Date.now();
    if (currentTime - lastTime >= INTERVAL_MS && !stopSnake) {
        lastTime = currentTime;
        return 1;
    }
    return 0;
}




