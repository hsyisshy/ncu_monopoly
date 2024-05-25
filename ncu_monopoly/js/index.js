
// Step.0 初始化 //


// 初始化函數，檢查使用者是否已登入，並初始化遊戲
function init() {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (!userId || !username) {
        window.location.href = 'login.html';
        return;
    }

    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();
    reset();
    let locationId = 'location1';
    moveRedDot(locationId);
    handleGateEffect(locationId);

    document.getElementById('userNameDisplay').innerText = username;
}


// Step.1 骰子、資料、modal //
// Step.1-1 骰子 //

// 隨機數字函數
function getRandomNumber(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

// 擲骰子函數
function rollDice() {
    let rollTimes = Number(loadDiceTime());
    console.log("dice time", rollTimes);
    if (rollTimes <= 0) {
        closeGameInfoModal();
        closegateInfomodal();
        showUserScoreModal();
        return;
    }

    let current_dice = parseInt(getRandomNumber(1, 6), 10);
    document.getElementById("diceResult").innerText = "擲骰子結果：" + current_dice;
    rollTimes--;
    document.getElementById("rollTimes").innerText = "剩餘擲骰子次數：" + rollTimes;
    storeDiceTime(rollTimes);

    let currentLocation = loadLocation();
    let target_element_id = getNextLocation(currentLocation, current_dice);
    moveRedDot(target_element_id);
    handleGateEffect(target_element_id);
}

// Step.1-2 各種資料儲存 //

// 儲存當前位置到 localStorage
function storeLocation(currentLocation) {
    localStorage.setItem('currentLocation', currentLocation);
    console.log("location has been saved");
}

// 從 localStorage 讀取當前位置
function loadLocation() {
    return localStorage.getItem('currentLocation');
}

// 儲存當前分數到 localStorage
function storeScore(currentScore) {
    localStorage.setItem('currentScore', currentScore);
}

// 從 localStorage 讀取當前分數
function loadScore() {
    return localStorage.getItem('currentScore');
}

// 儲存擲骰子次數到 localStorage
function storeDiceTime(currentdiceTime) {
    localStorage.setItem('currentdiceTime', currentdiceTime);
    return 1;
}

// 從 localStorage 讀取擲骰子次數
function loadDiceTime() {
    let value = localStorage.getItem('currentdiceTime');
    return (value < 0 ? null : value);
}


// Step.1-3 各種 modal 的顯示與關閉  //


// 關閉 game-info
function closeGameInfoModal() {
    console.log("closing gameinfo");
    let modal = document.getElementById('game-info');
    modal.style.display = 'none';
}

// 顯示 game-info
function showGameInfoModal() {
    console.log("showing gameinfo");
    let modal = document.getElementById('game-info');
    modal.style.display = 'block';
}

// 顯示 gateInfomodal
function showgateInfomodal() {
    console.log("showing gateinfo");
    var modal = document.getElementById('gateInfomodal');
    modal.style.display = 'block';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}

// 關閉 gateInfomodal
function closegateInfomodal() {
    console.log("closing gateinfo");
    let modal = document.getElementById('gateInfomodal');
    modal.style.display = 'none';
}

// 顯示 user-score
function showUserScoreModal() {
    console.log("showing user-score modal");
    var modal = document.getElementById('user-score');
    modal.style.display = 'block';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('username');
    const userScore = loadScore();

    const userList = document.getElementById('user-list');
    userList.innerHTML = `
        <tr>
            <td>${userName}</td>
            <td>${userScore}</td>
        </tr>
    `;
}

// 關閉 user-score
function closeUserScoreModal() {
    let modal = document.getElementById('user-score');
    modal.style.display = 'none';
}


// Step.2 移動邏輯、效果處理 //
// Step.2-1 移動邏輯 //

// 第一格閱讀後，開始遊戲
function startGame() {
    closegateInfomodal();
    console.log("遊戲開始！");
    if(Number(loadDiceTime())==10){
    storeDiceTime(9);
    document.getElementById("diceResult").innerText = "擲骰子結果：1" ;
    document.getElementById("rollTimes").innerText = "剩餘擲骰子次數：9" ;
    let startLocationId = getNextLocation("location1", 1);
    moveRedDot(startLocationId);
    handleGateEffect(startLocationId);
    }
    else{
        rollDice();
    }
}

// 移動紅點到指定位置
function moveRedDot(cell_id) {
    console.log("Attempting to move red dot to:", cell_id);
    if (cell_id == null) {
        console.log("cell_id is null");
        return;
    }
    var redDot = document.getElementById("redDot");
    if (!redDot) {
        console.log("redDot element not found");
        return;
    }
    let cell = document.getElementById(cell_id);
    if (!cell) {
        console.log("No cell found with ID:", cell_id);
        return;
    }
    let cellInfo = cell.getBoundingClientRect();
    redDot.style.left = cellInfo.left + cell.offsetWidth / 2 + "px";
    redDot.style.top = cellInfo.top + cell.offsetHeight / 2 + "px";
    redDot.style.display = "block";
    storeLocation(cell_id);
}
// 計算下一個位置
function getNextLocation(currentLocation, step) {
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + step) % locations.length;
    return locations[nextIndex];
}


// Step.2-2 效果處理 //

// 更新用戶分數
function updateUserScore(scoreChange) {
    const userId = localStorage.getItem('userId');
    const data = { userId: userId, scoreChange: scoreChange };

    fetch('update-score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Score updated successfully:', data);
            alert(`分數變更：${scoreChange > 0 ? '加分' : '扣分'} ${scoreChange}`);
            storeScore(data.newScore);
            updateDisplayedScore(data.newScore);
            closegateInfomodal();
            showGameInfoModal();
        })
        .catch(error => {
            console.error('Error updating score:', error);
        });
    }

    //重制用戶分數
    function resetscore() {
        const userId = localStorage.getItem('userId');
        const data = { userId: userId };
    
        fetch('reset_score.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Score updated successfully:', data);
                alert(`分數變更：${scoreChange > 0 ? '加分' : '扣分'} ${scoreChange}`);
                storeScore(data.newScore);
                updateDisplayedScore(data.newScore);

                closegateInfomodal();
                showGameInfoModal();
            })
            .catch(error => {
                console.error('Error updating score:', error);
            });
        }

// 處理關卡效果
function handleGateEffect(locationId) {
    let location = locationInfo[locationId];
    if (location && location.options) {
        document.getElementById('modal-title').textContent = location.title;
        document.getElementById('modal-image').src = location.img;
        document.getElementById('modal-image').alt = location.title;
        document.getElementById('modal-description').textContent = location.description;

        const buttonContainer = document.getElementById('modal-buttons');
        buttonContainer.innerHTML = '';

        location.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.addEventListener('click', function () {
                if (option.action === "startGame") {
                    startGame();
                } else {
                    updateUserScore(option.scoreChange);
                }
            });
            buttonContainer.appendChild(button);
        });

        showgateInfomodal();
        closeGameInfoModal();
        closeUserScoreModal();
    } else {
        console.log("Error: Location data or options are missing for", locationId);
    }
}

// 更新用戶分數顯示
function updateDisplayedScore(newScore) {
    document.getElementById("currentScore").innerText = "個人分數：" + newScore;
}


// Step.3 重置遊戲 //
// 重置遊戲
function reset() {
    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();

    storeDiceTime(Number(10));
    storeLocation("location1");
    resetscore();
    let locationId = loadLocation();
    moveRedDot(locationId);
    document.getElementById("diceResult").innerText = "擲骰子結果：00" ;
    document.getElementById("rollTimes").innerText = "剩餘擲骰子次數：10" ;
    document.getElementById("currentScore").innerText = "個人分數：100" ;
}


// Appendix. 格子位置與對應關卡資訊 //
const locations = ["location1", "location2", "location3", "location4", "location5", "location6", "location7", "location8", "location9", "location10", "location11", "location12", "location13", "location14", "location15", "location16"];

const locationInfo = {
    "location1": {
        title: "1.中大圓環(起點)",
        img: "img/1_中大圓環.png",
        description: "歡迎你來到中央大學！你可能對這個地方還很陌生，讓我們擲出骰子，到大富翁的各地去探險吧！你有十次的機會！",
        options: [
            { text: "開始遊戲", action: "startGame" }
        ]
    },
    "location2": {
        title: "2.大象雕塑",
        img: "img/2_大象雕塑.png",
        description: "你到了一棟看起來很氣派的大樓，聽說這裡面常常會有不同的團隊進行演出，除此之外，裡面也有一間小小的咖啡廳販賣各種輕食，是文院同學常常造訪的地點。不過，旁邊草地上的雕像到底是什麼呢？",
        options: [
            { text: "A.青蛙", scoreChange: -5 },
            { text: "B.大象", scoreChange: 10 }
        ]
    },
    "location3": {
        title: "3.男九垃圾場",
        img: "img/3_男九垃圾場.png",
        description: "眼前的垃圾看起來都沒有經過分類，這時候你決定。",
        options: [
            { text: "A.同流合污", scoreChange: -5 },
            { text: "B.乖乖分類", scoreChange: 10 }
        ]
    },
    "location4": {
        title: "4.小木屋",
        img: "img/4_小木屋.png",
        description: "沿著路走，你被一股甜甜的香氣吸引，停下了腳步......",
        options: [
            { text: "A.吃松餅", scoreChange: 10 },
            { text: "B.吃薯餅", scoreChange: -5 }
        ]
    },
    "location5": {
        title: "5.中大湖",
        img: "img/5_中大湖.png",
        description: "沉溺於美景的同時，一旁水面辜冬菇東冒出一堆泡泡，霎時你被濺出的水花潑了一臉。原來是湖中女神！那麼，你要選擇金鵝還是銀鴨呢？",
        options: [
            { text: "A.金鴨", scoreChange: 10 },
            { text: "B.銀鴨", scoreChange: 5 }
        ]
    },
    "location6": {
        title: "6.壘球場",
        img: "img/6_壘球場.png",
        description: "這裡是中央大學的棒球場，平日假日都會有學生或棒球隊在這邊運動，有時還可以看到外籍學生集結在這個場地比賽足球呢。",
        options: [
            { text: "A.我好懶，不想運動", scoreChange: -5 },
            { text: "B.下場去動一動，活動筋骨", scoreChange: 10 }
        ]
    },
    "location7": {
        title: "7.依仁堂",
        img: "img/7_依仁堂.png",
        description: "裡面包含排球館、體適能健身教室、韻律教室、技擊教室等等，是個運動的好地方。請問這裡不能做什麼運動？",
        options: [
            { text: "A.游泳", scoreChange: 10 },
            { text: "B.打籃球", scoreChange: -5 }
        ]
    },
    "location8": {
        title: "8.oloo",
        img: "img/8_oloo.png",
        description: "這是中央大學校園內的交通工具之一。請問 oloo 一次可以幾個人騎呢？",
        options: [
            { text: "A.一個人", scoreChange: 10 },
            { text: "B.二十個人", scoreChange: -5 }
        ]
    },
    "location9": {
        title: "9.松苑餐廳",
        img: "img/9_松苑餐廳.png",
        description: "這裡是中大的學生餐廳，請問裡面有哪間餐廳呢？",
        options: [
            { text: "A.四海遊龍", scoreChange: -5 },
            { text: "B.漢堡王", scoreChange: 10 }
        ]
    },
    "location10": {
        title: "10.女生宿舍區",
        img: "img/10_女生宿舍.png",
        description: "這裡是宿舍區喔，晚上要記得保持安靜！請問裡面總共有幾棟宿舍呢？",
        options: [
            { text: "A.五棟", scoreChange: -5 },
            { text: "B.四棟", scoreChange: 10 }
        ]
    },
    "location11": {
        title: "11.宵夜街",
        img: "img/11_宵夜街.png",
        description: "從入口進來後便有許多的店家，而且他們通常都會營業到很晚，所以是想吃宵夜的人的好去處喔！",
        options: [
            { text: "A.吃吃宵夜", scoreChange: 5 },
            { text: "B.吃爆宵夜", scoreChange: 10 }
        ]
    },
    "location12": {
        title: "12.百花川",
        img: "img/12_百花川.png",
        description: "貫穿中大的美麗河川，有著許多神秘傳說，請問全長為？",
        options: [
            { text: "A.250公尺", scoreChange: 10 },
            { text: "B.520公尺", scoreChange: -5 }
        ]
    },
    "location13": {
        title: "13.游藝館",
        img: "img/13_游藝館.png",
        description: "中央大學不只有豐富的教學資源，還有許多課外活動，請問中央沒有哪個社團？",
        options: [
            { text: "A.聖經研究社", scoreChange: -5 },
            { text: "B.甜點研究社", scoreChange: 10 }
        ]
    },
    "location14": {
        title: "14.校史館",
        img: "img/14_校史館.png",
        description: "中央大學原先於大陸辦校，後隨國民政府遷台後復校。請問今年(2024)為中大在台復校的第幾年？",
        options: [
            { text: "A.62年", scoreChange: 10 },
            { text: "B.26年", scoreChange: -5 }
        ]
    },
    "location15": {
        title: "15.太極銅雕",
        img: "img/15_太極銅雕.png",
        description: "形似二人對招，雙手相纏，如太極之圓融，渾然一體，是富涵中華傳統文化的精美藝術喔。請問它是誰的作品呢？",
        options: [
            { text: "A.銘朱", scoreChange: -5 },
            { text: "B.朱銘", scoreChange: 10 }
        ]
    },
    "location16": {
        title: "16.觀景台",
        img: "img/16_觀景台.png",
        description: "好寬廣的視野，可以看到整個中央大學的景色，請問在此處不能做什麼？",
        options: [
            { text: "A.半夜在這鬼吼鬼叫", scoreChange: 10 },
            { text: "B.放焰火", scoreChange: -5 }
        ]
    },
};

// Appendix. 測試用按鈕，可以直接關掉關卡資訊(gateInfomodal)，回到 game-info  //
function closeModalButtonHandling(option) {
    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();
}
