
let appleValue = upgradeData.appleUpgrade;

class Apple extends Segment{
    constructor(x, y, isGolden){
        super(x, y, 0);
        this.value = (upgradeData.lengthUpgrade - 1) 
            ? appleValue * Math.pow(2, Math.floor(1 + parts.length / (34 - 4*upgradeData.lengthUpgrade))) 
            : appleValue;

        if (isGolden){
            this.image.src = "assets/golden-apple.png";
            this.size = 256;
        } else {
            this.image.src = "assets/apple.png";
            this.size = 160;
        }
    }
}

function summonApple(){
    let x, y;
    while (true) {
        let goldenChance = (upgradeData.goldenAppleUpgrade - 1) * 0.1;
        x = Math.floor(Math.random()*numCols) * spriteSize;
        y = Math.floor(Math.random()*numRows) * spriteSize;
        let occupied = parts.some(part => part.x === x && part.y === y);
        if (!occupied){
            if (Math.random() <= goldenChance) return new Apple(x, y, true);
            return new Apple(x, y, false);
        }
    }
}

function eatApple(){
    apple = summonApple();
    let isSegEven = parts.length % 2 === 0;
    let sprite = (isSegEven) ? Sprites.segEven : Sprites.segOdd
    let newPart = new Segment(tail.x, tail.y, sprite);
    newPart.state = tail.state;
    newPart.hidden = true;
    hiddenSegment = newPart;

    tailSprite = (isSegEven) ? Sprites.tailOdd : Sprites.tailEven;
    parts.splice(parts.length-1, 1, newPart, tail);
    addApples(apple);
}

function addApples(apple){
    playerData.appleCount += apple.value;
    playerData.totalApples++;
    renderData();
    storeData();
}

function resetApples(){
    playerData.appleCount = 0;
    playerData.totalApples = 0;
    renderData();
    storeData();
}

