/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 464;
const height = canvas.height = 696;
const squareSize = 58;

const head = new Head(squareSize, 0);
const tail = new Tail(0, 0);
const parts = [head, tail];
let apple = summonApple();

let lastTime = Date.now();

function isTimeElapsed(){
    currentTime = Date.now();
    if (currentTime - lastTime >= INTERVAL_MS && !stopSnake) {
        lastTime = currentTime;
        return 1;
    }
    return 0;
}


function update(){
    ctx.clearRect(0, 0, width, height);
    draw();
    if (parts.length >= 12*8){
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

mainLoop();