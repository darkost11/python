const States = {
    right: 0,
    left: 180,
    up: -90,
    down: 90
}

let lastState = States.right;

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
        this.spriteX = 70;
    }
    draw(){
        const rad = this.state * Math.PI / 180;
        ctx.save();
        ctx.translate(this.x + squareSize/2, this.y + squareSize/2);
        ctx.rotate(rad);
        ctx.beginPath();
        ctx.drawImage(this.image, this.spriteX, 0, 70, 70, -squareSize/2, -squareSize/2, squareSize, squareSize);
        ctx.closePath();
        ctx.restore();
    }
}

class Tail extends Head {
    constructor(x, y){
        super(x, y);
        this.spriteX = 0;
    }
}

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

function isCollisionDetected(){
    for(let i = parts.length - 1; i > 0; i--){
        let part = parts[i];
        if (part.collides(head)) return true;
    }
    if ((head.x < 0) || (head.x >= width) ||
        (head.y < 0) || (head.y) >= height)
        return true;
    return false;
}

function draw(){
    parts.forEach(part => {
        part.draw();
    })
    apple.draw();
}
