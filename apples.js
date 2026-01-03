class Apple extends Segment{
    constructor(x, y, isGolden){
        super(x, y, 0);
        this.isGolden = isGolden;
        this.value = (upgradeData.lengthUpgrade - 1) 
            ? appleValue * getMultiplier() : appleValue;

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

let appleValue = upgradeData.appleUpgrade;

function getMultiplier(){
    return Math.pow(2, Math.floor((getSnakeLength()) / (28 - 4*(upgradeData.lengthUpgrade - 1))));
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
    updatePeakLength();
    storePlayerData();
    renderAppleValue();
    renderSnakeLength();
}

function addApples(apple){
    playerData.appleCount += apple.value;
    renderPlayerData();
    storePlayerData();
}

function resetApples(){
    playerData.appleCount = 0;
    playerData.totalApples = 0;
    renderPlayerData();
    storePlayerData();
}

function renderAppleValue(){
    let infoEl = document.querySelector(".info .item1");
    infoEl.querySelector("span").textContent = `${apple.value}x`;
    infoEl.querySelector("img").src = apple.image.src;
}

function getUpgradeCost(upgradeEl){
    return parseInt(upgradeEl.querySelector(".upgrade-cost").textContent);
}

function buyUpgrade(upgradeEl){
    if (playerData.appleCount >= getUpgradeCost(upgradeEl)) {
        playerData.appleCount -= getUpgradeCost(upgradeEl);
        renderPlayerData();
        storePlayerData();
        return 1;
    }
    return 0;
}