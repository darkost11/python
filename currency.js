// logic

let apples = parseInt(localStorage.getItem("apples")) || null;

function eatApple(){
    apple = summonApple();
    let newPart = new Square(tail.x, tail.y);
    newPart.state = tail.state;
    parts.splice(parts.length-1, 1, newPart, tail);
    addApples();
    console.log(apples);
}

function addApples(){
    apples++;
    localStorage.setItem("apples", apples.toString());
}

function resetApples(){
    apples = 0;
    localStorage.setItem("apples", apples.toString());
}

// rendering

const appleCount = document.querySelector(".apple-count");
appleCount.textContent = 10000;
