/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.querySelector(".canvas-container");
numCols += upgradeData.extendCanvasUpgrade;
let canvasWidth = numCols * cellSize;
let canvasHeight = numRows * cellSize;

updateCanvasSize();
renderData();
renderUpgradeData();

const spriteSize = cellSize;
const head = new RotatingSegment(spriteSize, 0, Sprites.head);
const tail = new RotatingSegment(0, 0, Sprites.tailOdd);
const parts = [head, tail];

let hiddenSegment = null;
let tailSprite = Sprites.tailEven;
let lastState = States.right;

let apple = summonApple();

function update(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    draw();
    if (parts.length >= numRows * numCols){
        storeData();
        renderData();
        alert("You won!")
        playerData.timesWon++;
        location.reload();
    }
    if (isCollisionDetected()){
        storeData();
        renderData();
        alert("Game over!");
        playerData.timesCrashed++;
        location.reload();
    }
    if (head.collides(apple))
        eatApple();

    if (isTimeElapsed()){
        move();
    }
}
function mainLoop(){
    update();
    requestAnimationFrame(mainLoop)    
}

document.addEventListener("keydown", (event) => {

    if ((event.key === "d" || event.key === "D") && lastState != States.left)
        head.state = States.right;
    else if ((event.key === "a" || event.key === "A") && lastState != States.right)
        head.state = States.left; 
    else if ((event.key === "s" || event.key === "S") && lastState != States.up)
        head.state = States.down;  
    else if ((event.key === "w" || event.key === "W") && lastState != States.down) 
        head.state = States.up;
        
})

if (RESET_UPGRADES){
    resetUpgradeData();
}

if (RESET_PLAYER_DATA){
    resetPlayerData();
}

mainLoop();