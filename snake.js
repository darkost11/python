const States = {
    right: 0,
    left: 180,
    up: -90,
    down: 90
}

const Sprites = {
    tailOdd: 0,
    tailEven: 70,
    segOdd: 140,
    segEven: 210,
    head: 280    
}

class Segment{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.state = States.right;
        this.sprite = sprite;
        this.image = new Image();
        this.image.src = "assets/snake.png";
        this.size = 70;
        this.hidden = false;
    }

    draw(){
        ctx.beginPath();
        ctx.drawImage(this.image, this.sprite, 0, this.size, this.size, this.x, this.y, spriteSize, spriteSize);
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

class RotatingSegment extends Segment{
    constructor(x, y, sprite){
        super(x, y, sprite);
    }
    draw(){
        const rad = this.state * Math.PI / 180;
        ctx.save();
        ctx.translate(this.x + spriteSize/2, this.y + spriteSize/2);
        ctx.rotate(rad);
        ctx.beginPath();
        ctx.drawImage(this.image, this.sprite, 0, this.size, this.size, -spriteSize/2, -spriteSize/2, spriteSize, spriteSize);
        ctx.closePath();
        ctx.restore();
    }
}

let timesIncrement = 0;
function incrementSnake(){

    let isSegEven = parts.length % 2 === 0;
    let sprite = (isSegEven) ? Sprites.segEven : Sprites.segOdd
    let newPart = new Segment(tail.x, tail.y, sprite);
    newPart.state = tail.state;
    newPart.hidden = true;
    hiddenSegment = newPart;

    tailSprite = (isSegEven) ? Sprites.tailOdd : Sprites.tailEven;
    parts.splice(parts.length - 1, 1, newPart, tail);
}

function move(){
    if (timesIncrement > 0) {
        incrementSnake();
        timesIncrement--;
        renderSnakeLength();
    }
    lastState = head.state;
    switch(head.state){
        case States.right:
            moveParts();
            head.x += spriteSize;
            break;
        case States.left:
            moveParts();
            head.x -= spriteSize;
            break;
        case States.up:
            moveParts();
            head.y -= spriteSize;
            break;
        case States.down:
            moveParts();
            head.y += spriteSize;
            break; 
    }
    if (hiddenSegment) hiddenSegment.hidden = false;
    tail.sprite = tailSprite;
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
    if ((head.x < 0) || (head.x >= canvasWidth) ||
        (head.y < 0) || (head.y) >= canvasHeight)
        return true;
    return false;
}

function getLengthToDouble(){
    return 28 - 4*(upgradeData.lengthUpgrade - 1);
}
function getSnakeLength(){
    return parts.length + timesIncrement; 
}

function renderSnakeLength(){
    let infoEls = document.querySelectorAll(".snake-length");
    infoEls.forEach(el => {
        el.textContent = `${getSnakeLength()}`;
    })
    
    if (upgradeData.lengthUpgrade > 1) {
        let multiplierEl = document.querySelector(".multiplier");
        let remainderEl = document.querySelector(".remainder");
        let multiplierTextEl = document.querySelector(".multiplier-text");
        multiplierTextEl.innerHTML = "<br>Apples multiplied by: "
        multiplierEl.textContent = getMultiplier();
        remainderEl.textContent = ` (${getSnakeLength() % getLengthToDouble()}/${getLengthToDouble()})`;
    }
}

function draw(){
    parts.forEach(part => {
        if (!part.hidden) part.draw();
    })
    apple.draw();
}
