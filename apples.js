function summonApple(){
    let x, y;
    while (true) {
        x = Math.floor(Math.random()*8) * spriteSize;
        y = Math.floor(Math.random()*12) * spriteSize;
        let occupied = parts.some(part => part.x === x 
            && part.y === y
        );
        if (!occupied)
            return new Apple(x, y);;
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
    addApples();
}

function addApples(){
    playerData.appleCount++;
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

