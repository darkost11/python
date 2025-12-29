/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 480;
const height = canvas.height = 720;

const squareSize = 60;
const squareColor = "green";
const appleColor = "red";
const lineColor = "black";

class Square{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = squareColor;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, squareSize, squareSize)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    moveTo(newX, newY){
        this.x = newX;
        this.y = newY;
    }
    collides(other){
        return (
            this.x === other.x && 
            this.y === other.y
        );
    }
}

class Apple extends Square{
    constructor(x, y){
        super(x, y);
        this.color = appleColor;
    }
}

const head = new Square(squareSize*1, 0);
const prehead = new Square(0, 0);
const parts = [head, prehead];

let lastTime = Date.now();
const INTERVAL_MS = 300;
const States = {
    right: "right",
    left: "left",
    up: "up",
    down: "down"
}
let currentState = States.right;

function isTimeElapsed(){
    currentTime = Date.now();
    if (currentTime - lastTime >= INTERVAL_MS) {
        lastTime = currentTime;
        return 1;
    }
    return 0;
}

function move(){
    switch(currentState){
        case States.right:
            moveParts();
            head.x += squareSize;
            break;
        case States.left:
            moveParts();
            head.x -= squareSize;
            break;
        case States.up:
            moveParts();
            head.y -= squareSize;
            break;
        case States.down:
            moveParts();
            head.y += squareSize;
            break; 
    }
}

function moveParts(){
    for (let i = parts.length - 1; i > 0; i--){
        let part = parts[i];
        let nextPart = parts[i-1];
        part.moveTo(nextPart.x, nextPart.y);
    }
}

let apple = summonApple();
function draw(){
    parts.forEach(part => {
        part.draw();
    })
    apple.draw();
}

function collisionDetected(){
    for(let i = parts.length - 1; i > 0; i--){
        let part = parts[i];
        if (part.collides(head)) return true;
    }
    if ((head.x < 0) || (head.x >= width) ||
        (head.y < 0) || (head.y) >= height)
        return true;
    return false;
}

function update(){
    ctx.clearRect(0, 0, width, height);
    draw();
    if (collisionDetected()){
        alert("Game over!");
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

    if ((event.key === "d" || event.key === "D") && currentState !== States.left) 
        currentState = States.right;
    if ((event.key === "a" || event.key === "A") && currentState !== States.right)
        currentState = States.left; 
    if ((event.key === "s" || event.key === "S") && currentState !== States.up)
        currentState = States.down;  
    if ((event.key === "w" || event.key === "W") && currentState !== States.down) 
        currentState = States.up;
        
})

function summonApple(){
    let x, y;
    while (true) {
        x = Math.floor(Math.random()*8) * squareSize;
        y = Math.floor(Math.random()*12) * squareSize;
        let occupied = parts.some(part => part.x === x 
            && part.y === y
        );
        if (!occupied) break;
    }
    return new Apple(x, y);
}

function eatApple(){
    apple = summonApple();
    let tail = parts.at(-1);
    let newTail = new Square(tail.x, tail.y);
    parts.push(newTail);
}

mainLoop();