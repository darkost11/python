
const cellSize = 58;

let numRows = 12;
let numCols = 8;

let stopSnake = 0;
const RESET_UPGRADES = 1;
const RESET_PLAYER_DATA = 1;

if (RESET_UPGRADES){
    resetUpgradeData();
}

if (RESET_PLAYER_DATA){
    resetPlayerData();
}