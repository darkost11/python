/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 480;
const height = canvas.height = 720;

const squareSize = 60;
const squareColor = "green";
const appleColor = "red";
const lineColor = "black";

const States = {
    right: 0,
    left: 180,
    up: -90,
    down: 90
}

class Square{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = squareColor;
        this.state = States.right;
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
        this.image = new Image();
        this.image.src = "assets/apple.png";
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(this.image, 0, 0, 160, 160, this.x, this.y, squareSize, squareSize);
        ctx.closePath();
    }
}

class Head extends Square{
    constructor(x, y){
        super(x, y);
        this.image = new Image();
        this.image.src = "assets/snake.png";
        this.frameX = 70;
    }
    draw(){
        const rad = this.state * Math.PI / 180;
        ctx.save();
        ctx.translate(this.x + squareSize/2, this.y + squareSize/2);
        ctx.rotate(rad);
        ctx.beginPath();
        ctx.drawImage(this.image, this.frameX, 0, 70, 70, -squareSize/2, -squareSize/2, squareSize, squareSize);
        ctx.closePath();
        ctx.restore();
    }
}

class Tail extends Head {
    constructor(x, y){
        super(x, y);
        this.frameX = 0;
    }
    
}

const head = new Head(squareSize, 0);
const tail = new Tail(0, 0);
const parts = [head, tail];

let lastTime = Date.now();
const INTERVAL_MS = 300;


function isTimeElapsed(){
    currentTime = Date.now();
    if (currentTime - lastTime >= INTERVAL_MS) {
        lastTime = currentTime;
        return 1;
    }
    return 0;
}

let lastState = States.right;
function move(){
    lastState = head.state;
    switch(head.state){
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
        part.state = nextPart.state;
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
    if (parts.length >= 12*8){
        alert("You won!")
        location.reload();
    }
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

    if ((event.key === "d" || event.key === "D") && lastState != States.left)
        head.state = States.right;
    else if ((event.key === "a" || event.key === "A") && lastState != States.right)
        head.state = States.left; 
    else if ((event.key === "s" || event.key === "S") && lastState != States.up)
        head.state = States.down;  
    else if ((event.key === "w" || event.key === "W") && lastState != States.down) 
        head.state = States.up;
        
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
    let newPart = new Square(tail.x, tail.y);
    newPart.state = tail.state;
    parts.splice(parts.length-1, 1, newPart, tail);
}

mainLoop();