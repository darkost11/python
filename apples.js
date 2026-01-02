let appleValue = upgradeData.appleUpgrade;

class Apple extends Segment{
    constructor(x, y, isGolden){
        super(x, y, 0);
        this.isGolden = isGolden;
        this.value = (upgradeData.lengthUpgrade - 1) 
            ? appleValue * Math.pow(2, Math.floor(parts.length / (28 - 4*(upgradeData.lengthUpgrade - 1)))) 
            : appleValue;

        if (isGolden){
            this.image.src = "assets/golden-apple.png";
            this.size = 256;
            this.value *= 2;
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
            if (Math.random() <= goldenChance) return newApple = new Apple(x, y, true);
            return newApple = new Apple(x, y, false);
            
        }
    }
}

function eatApple(){
    timesIncrement++;
    if (apple.isGolden) timesIncrement++;
    addApples(apple);
    apple = summonApple();
    playerData.totalApples++;
    storeData();
    renderAppleValue();
}

function addApples(apple){
    playerData.appleCount += apple.value;
    renderData();
    storeData();
}

function resetApples(){
    playerData.appleCount = 0;
    playerData.totalApples = 0;
    renderData();
    storeData();
}

function renderAppleValue(){
    let appleMultiplier = document.querySelector(".multiplier");
    appleMultiplier.querySelector("span").textContent = `${apple.value}x`;
    appleMultiplier.querySelector("img").src = apple.image.src;
}

function getUpgradeCost(upgradeEl){
    return parseInt(upgradeEl.querySelector(".upgrade-cost").textContent);
}

function buyUpgrade(upgradeEl){
    if (playerData.appleCount >= getUpgradeCost(upgradeEl)) {
        playerData.appleCount -= getUpgradeCost(upgradeEl);
        renderData();
        storeData();
        return 1;
    }
    return 0;
}