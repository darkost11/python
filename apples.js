function summonApple(){
    let x, y;
    while (true) {
        x = Math.floor(Math.random()*8) * squareSize;
        y = Math.floor(Math.random()*12) * squareSize;
        let occupied = parts.some(part => part.x === x 
            && part.y === y
        );
        if (!occupied)
            return new Apple(x, y);;
    }
}

function eatApple(){
    apple = summonApple();
    let newPart = new Square(tail.x, tail.y);
    newPart.state = tail.state;
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

