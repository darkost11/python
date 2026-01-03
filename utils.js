let INTERVAL_MS;
updateSnakeSpeed();

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

let lastTime = Date.now();
function isTimeElapsed(){
    currentTime = Date.now();
    if (currentTime - lastTime >= INTERVAL_MS && !stopSnake) {
        lastTime = currentTime;
        return 1;
    }
    return 0;
}




