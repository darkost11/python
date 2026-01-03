/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.querySelector(".canvas-container");
numCols += upgradeData.extendCanvasUpgrade - 1;

let canvasWidth = numCols * cellSize;
let canvasHeight = numRows * cellSize;

updateCanvasSize();
renderData();
renderUpgradeData();


const spriteSize = cellSize;
const head = new RotatingSegment(spriteSize, 0, Sprites.head);
const tail = new RotatingSegment(0, 0, Sprites.tailEven);
const parts = [head, tail];
renderSnakeLength();

let hiddenSegment = null;
let tailSprite = Sprites.tailEven;
let lastState = States.right;

let apple = summonApple();
renderAppleValue();
let hasEnded = false;
function update(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    draw();
    if (getSnakeLength() >= numRows * numCols && !hasEnded){
        hasEnded = true;
        playerData.timesWon++;
        storeData();
        renderData();
        alert("You won!")
        location.reload();
    }
    else if (isCollisionDetected() && !hasEnded){
        hasEnded = true;
        playerData.timesCrashed++;
        storeData();
        renderData();
        alert('You died!');
        location.reload();
    }
    else if (head.collides(apple))
        eatApple();

    else if (isTimeElapsed()){
        move();
    }
}
function mainLoop(){
    update();
    requestAnimationFrame(mainLoop)    
}

document.addEventListener("keydown", (event) => {

    if ((event.key === "d" || event.key === "D" || event.key === "ArrowRight") && lastState != States.left)
        head.state = States.right;
    else if ((event.key === "a" || event.key === "A" || event.key === "ArrowLeft") && lastState != States.right)
        head.state = States.left; 
    else if ((event.key === "s" || event.key === "S" || event.key === "ArrowDown") && lastState != States.up)
        head.state = States.down;  
    else if ((event.key === "w" || event.key === "W" || event.key === "ArrowUp") && lastState != States.down) 
        head.state = States.up;
        
})

mainLoop();