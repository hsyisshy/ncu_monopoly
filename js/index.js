function getRandomNumber(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
function rollDice() {
    console.log("dice time",loadDiceTime());
    let rollTimes = Number(loadDiceTime()); // 有十次擲骰子的機會
    if (rollTimes <= 0) {
        closeGameInfoModal();
        closegateInfomodal();
        showUserScoreModal();
        return;
    }
    let current_dice  = parseInt(getRandomNumber(1,6), 10);
    document.getElementById("diceResult").innerText = "擲骰子結果：" + current_dice;
    rollTimes--;
    document.getElementById("rollTimes").innerText = "剩餘擲骰子次數：" + rollTimes;
    storeDiceTime(rollTimes);

    let currentLocation = loadLocation();
    let target_element_id = getNextLocation(currentLocation,current_dice);
    moveRedDot(target_element_id);
}
function storeLocation(currentLocation) {
    localStorage.setItem('currentLocation', currentLocation);
}

function loadLocation() {
    return localStorage.getItem('currentLocation');
}

function storeScore(currentScore) {
    localStorage.setItem('currentScore', currentScore);
}

function loadScore() {
    return localStorage.getItem('currentScore');
}

function storeDiceTime(currentdiceTime) {
    localStorage.setItem('currentdiceTime', currentdiceTime);
}

function loadDiceTime() {
    return localStorage.getItem('currentdiceTime');
}

function moveRedDot(cell_id) {
    console.log("moving to",cell_id);
    var redDot = document.getElementById("redDot");

    let cell = document.getElementById(cell_id);
    let cellInfo = cell.getBoundingClientRect(); // 知道在哪

    redDot.style.left = cellInfo.left + cell.offsetWidth / 2 + "px";
    redDot.style.top = cellInfo.top + cell.offsetHeight / 2 + "px"; // 紅點至中
    redDot.style.right = cellInfo.right - cell.offsetWidth / 2 + "px";
    redDot.style.bottom = cellInfo.bottom - cell.offsetHeight / 2 + "px"; // 紅點至中
    redDot.style.display = "block";

    storeLocation(cell_id);

    if(cell_id=='location5'){
        showgateInfomodal();
        closeGameInfoModal();
        closeUserScoreModal();
    }
}

function closeGameInfoModal() {
    console.log("closing gameinfo")
    let modal = document.getElementById('game-info');
    modal.style.display = 'none';
}
function showGameInfoModal() {
    console.log("showing gameinfo");
    let modal = document.getElementById('game-info');
    modal.style.display = 'block';
}
function showgateInfomodal() {
    console.log("showing gateinfo");
    var modal = document.getElementById('gateInfomodal');
    modal.style.display='block';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}
function closegateInfomodal() {
    console.log("closing gateinfo")
    let modal = document.getElementById('gateInfomodal');
    modal.style.display = 'none';
    showGameInfoModal();
}

function showUserScoreModal() {
    console.log("showing user-score modal");
    var modal = document.getElementById('user-score');
    modal.style.display='block';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}
function closeUserScoreModal() {
    let modal = document.getElementById('user-score');
    modal.style.display = 'none';
}
const locations = ["location1", "location2", "location3", "location4", "location5", "location6", "location7", "location8", "location9", "location10", "location11", "location12", "location13", "location14", "location15", "location16"];
function getNextLocation(currentLocation, step) {
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + step) % locations.length;
    return locations[nextIndex];
}
function chooseOption(option) {
    closegateInfomodal();
}
function reset(){
    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();


    storeDiceTime(Number(10));
    storeLocation("location1");
    storeScore(100);
    moveRedDot(loadLocation());
}

 function init() {

    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();
    console.log(loadDiceTime());


    if(Number(loadDiceTime())==null || Number(loadDiceTime())< -1){
        console.log("initilize dice time");
        storeDiceTime(Number(10));
    }
    console.log(loadDiceTime());
    if(Number(loadDiceTime()) === 10){
         console.log("initilize location");
         storeLocation("location1");
         console.log("initilize score ");
         storeScore(100);
    }
    moveRedDot(loadLocation());
}