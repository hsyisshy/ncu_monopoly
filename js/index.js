function getRandomNumber(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
} // 隨機生成數字，其實可以不用寫這個函數，超好笑

// Step.0 遊戲初始化 //
function init() {

  closegateInfomodal();
  closeUserScoreModal();
  showGameInfoModal();
  showDescription();


   var diceTime = Number(loadDiceTime());
   console.log(diceTime);

   if(diceTime < -1){
       console.log("initialize dice time");
       storeDiceTime(10);
   }
   diceTime = Number(loadDiceTime());
  console.log(diceTime);
  if(diceTime === 10){
       console.log("initilize location");
       storeLocation("location1");
       console.log("initilize score ");
       storeScore(100);
  }
  let locationId = loadLocation();
  moveRedDot(locationId);


}

// Step.1 骰子與移動邏輯 //
//擲骰子函數
function rollDice() {
  // 加載當前剩餘的擲骰子次數
  let rollTimes = Number(loadDiceTime());
  console.log("dice time", rollTimes);

  // 如果沒有剩餘次數，關閉遊戲信息模態窗口，並顯示用戶分數模態窗口
  if (rollTimes <= 0) {
      closeGameInfoModal(); // 關閉遊戲信息模態窗口
      closegateInfomodal(); // 關閉其他相關模態窗口
      showUserScoreModal(); // 顯示用戶分數模態窗口
      return; // 結束函數執行
  }
  
  // 生成一個介於 1 到 6 的隨機骰子點數
  let current_dice = parseInt(getRandomNumber(1,6), 10);
  // 將骰子結果顯示到頁面上
  document.getElementById("diceResult").innerText = "擲骰子結果：" + current_dice;

  // 更新剩餘擲骰次數並在頁面上顯示
  rollTimes--;
  document.getElementById("rollTimes").innerText = "剩餘擲骰子次數：" + rollTimes;
  // 存儲更新後的擲骰次數
  storeDiceTime(rollTimes);

  // 加載當前玩家的位置
  let currentLocation = loadLocation();
  // 根據骰子點數計算下一個位置
  let target_element_id = getNextLocation(currentLocation, current_dice);
  // 移動表示玩家的紅點到新位置
  moveRedDot(target_element_id);
}

// 函數：存儲當前位置到本地存儲
function storeLocation(currentLocation) {
  localStorage.setItem('currentLocation', currentLocation); // 使用 localStorage 存儲當前位置
  console.log("location has been saved"); // 輸出存儲成功的日志
}

// 函數：從本地存儲加載當前位置
function loadLocation() {
  return localStorage.getItem('currentLocation'); // 返回從 localStorage 獲取的當前位置
}

// 函數：存儲當前分數到本地存儲
function storeScore(currentScore) {
  localStorage.setItem('currentScore', currentScore); // 使用 localStorage 存儲當前分數
}

// 函數：從本地存儲加載當前分數
function loadScore() {
  return localStorage.getItem('currentScore'); // 返回從 localStorage 獲取的當前分數
}

// 函數：存儲當前的擲骰次數到本地存儲
function storeDiceTime(currentdiceTime) {
  localStorage.setItem('currentdiceTime', currentdiceTime); // 使用 localStorage 存儲當前擲骰次數
  return 1; // 返回 1，表示存儲成功
}

// 函數：從本地存儲加載擲骰次數
function loadDiceTime() {
  let value = localStorage.getItem('currentdiceTime'); // 從 localStorage 獲取擲骰次數
  return (value < 0 ? null : value); // 如果擲骰次數小於0，返回 null，否則返回獲取的值
}

// 函數：移動遊戲界面上的紅點到指定的單元格
function moveRedDot(cell_id) {
  if(cell_id == null){
      console.log("cell_id is null"); // 如果單元格ID為 null，輸出日志並結束函數
      return;
  }
  console.log("moving to:", cell_id); // 輸出移動到的單元格ID
  var redDot = document.getElementById("redDot"); // 獲取紅點的 DOM 元素

  let cell = document.getElementById(cell_id); // 獲取指定單元格的 DOM 元素
  let cellInfo = cell.getBoundingClientRect(); // 獲取單元格的位置和大小信息

  // 設置紅點的位置，使其位於單元格中心
  redDot.style.left = cellInfo.left + cell.offsetWidth / 2 + "px";
  redDot.style.top = cellInfo.top + cell.offsetHeight / 2 + "px";
  redDot.style.display = "block"; // 確保紅點可見

  storeLocation(cell_id); // 存儲新的紅點位置
  handleGateEffect(cell_id); // 處理到達新單元格後的效果
}


const locations = ["location1", "location2", "location3", "location4", "location5", "location6", "location7", "location8", "location9", "location10", "location11", "location12", "location13", "location14", "location15", "location16"];
function getNextLocation(currentLocation, step) {
    const currentIndex = locations.indexOf(currentLocation);
    const nextIndex = (currentIndex + step) % locations.length;
    return locations[nextIndex];
}


// Step.2 判斷現在在哪一格並跳出對應題目 //
// 函數：處理到達新單元格後的效果
$(document).ready(function() {
  let score = 0;    // EDIT (得到的分數)
  let position = 0; // EDIT (現在在第幾格 (0~15))
  let cycle = 0;    // EDIT (現在是第幾圈)
  let round = 10;  // EDIT (總共擲 10 次骰子)
  let ncuscore = 0;//EDIT(中大人指數)
  let ncuchance = 0;//EDIT(碰到中大人指數的次數)
  let ncuornot = ncuscore/ncuchance;

  function doIteration(currentRound, totalRound) {
    return new Promise(resolve => {
      if (currentRound < totalRound)
      {
        // EDIT (擲骰子並更新位置和圈數，但在起點時不擲骰子)
        // EDIT (應該要先按「擲骰子」的按鈕，按按鈕之後再隨機產生骰子的點數，但先跳過這個)
        if (currentRound > 0)
        {
          let dice = 1; // Math.floor(6 * Math.random()) + 1;
          position += dice;
          if (position >= 16)
          {
            cycle++;
            position %= 16;
          }
        }

        // EDIT (先把所有關卡隱藏起來)
        $(".stage").hide();

        // EDIT (根據現在的位置和圈數決定要顯示和執行哪一個關卡)
        if (position == 0)
        {
          if (cycle == 0) // EDIT (第一次到達第一格(起點))
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_0_cycle_0").show();
            // EDIT (偵測關卡的選項有被有被點擊)
            $(".position_0_cycle_0_button").one("click", function() {
              // EDIT (點擊選項後檢查是哪一個選項被點，並檢查點擊的選項是否為正確答案來更新分數)
              $(".position_0_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "我了解了")
                score += 10;
              else
                score -= 10;
              alert(`score = ${score}`);
              // EDIT (進到下一輪)
              resolve(currentRound + 1);
            });
          }
          else if (cycle == 1)
          {
            // 第二次到起點要做的事情
          }
          else if (cycle == 2)
          {
            // 第三次到起點要做的事情
          }
        }
        else if (position == 1)
        {
          if (cycle == 0)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_1_cycle_0").show();
            // EDIT (偵測關卡的選項有被有被點擊)
            $(".position_1_cycle_0_button").one("click", function() {
              // EDIT (點擊選項後檢查是哪一個選項被點，並檢查點擊的選項是否為正確答案來更新分數)
              $(".position_1_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "B:大象")
                score += 10;
              else
                score -= 10;
              alert(`score = ${score}`);
              // EDIT (進到下一輪)
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 2)
        {
          if (cycle == 0)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_2_cycle_0").show();
            // EDIT (偵測關卡的選項有被有被點擊)
            $(".position_2_cycle_0_button").one("click", function() {
              // EDIT (點擊選項後檢查是哪一個選項被點，並檢查點擊的選項是否為正確答案來更新分數)
              $(".position_2_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "乖乖分類")
                score += 10;
              else
                score -= 10;
              alert(`score = ${score}`);
              resolve(currentRound + 1);
            });
          }

        }
        else if (position == 3)//等待修改
        {
          if (cycle == 0)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_3_cycle_0").show();
                            alert("烏丘媽媽:哪裡來的%@$*想動我的蛋！");
                            ncuscore += 10;
                            ncuchance += 10;
            // position--;
            resolve(currentRound + 1);
          }
                        else if(cycle == 1)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_3_cycle_1").show();
            alert("烏丘爸爸:還敢來!");
            // position--;
            resolve(currentRound + 1);
          }
                        else if(cycle == 2)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_3_cycle_2").show();
                            score += 10;
            alert("烏鴉全家:對不起，你不是壞人!觸發:烏鴉的報恩，`score = ${score}`");
            // position--;
            resolve(currentRound + 1);
          }
        }
        else if (position == 4)//等待修改
        {
          if (cycle == 0)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_4_cycle_0").show();
            // EDIT (偵測關卡的選項有被有被點擊)
            $(".position_4_cycle_0_button").one("click", function() {
              // EDIT (點擊選項後檢查是哪一個選項被點，並檢查點擊的選項是否為正確答案來更新分數)
              $(".position_4_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "乖乖分類")
                score += 10;
              else
                score -= 10;
              alert(`score = ${score}`);
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 5)//步數
        {
          if (cycle == 0)
          {
            // EDIT (把關卡的元件顯示出來)
            $("#position_5_cycle_0").show();
            // EDIT (偵測關卡的選項有被有被點擊)
            $(".position_5_cycle_0_button").one("click", function() {
              // EDIT (點擊選項後檢查是哪一個選項被點，並檢查點擊的選項是否為正確答案來更新分數)
              $(".position_5_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "看地板是否真的跟月球表面一樣")
              {	score -= 10;
                 alert(`走路踩到坑洞跌倒，然後上課遲到，下次行動步數-1, score = ${score}`);
              }
              else if (user_input == "沒有要看地板，我對棒球隊有沒有帥哥比較有興趣")
              {
                score += 20;
                alert(`看到學長打出一個全壘打，直接被帥到，score = ${score}`);
              }
              else if (user_input == "趕課要緊 我才不看棒球勒")
              {		
                score += 10;
                alert(`你快步走過,很幸運沒有跌倒,下次行動步數+1，score = ${score}`);
              }
              else if (user_input == "人行道坑坑巴巴的，我要專心走路")
              {
                score += 25;
                alert(`很棒 你還記得中央的人行道很破，一不注意就會跌倒，score = ${score}`);
              }
              alert(`score = ${score}`);
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 6) 
        {
          if (cycle == 0) {
            $("#position_6_cycle_0").show();
            $(".position_6_cycle_0_button").one("click", function() {
              $(".position_6_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input === "否") {
                score -= 10;
                alert(`走過時你突然感覺背後涼涼的，score = ${score}`);
              } else if (user_input === "是") {
                score += 10;
                alert(`你膽大的在站牌附近逛，發現什麼鬼都沒有，score = ${score}`);
              } else if (user_input === "我只是想去裡面健身而已") {
                score += 25;
                alert(`是個會運動的好孩子呢，score = ${score}`);
              } else if (user_input === "我只是想去裡面游泳而已") {
                score -= 20;
                alert(`ㄟ那個，裡面沒有游泳館耶，裡面只有籃球館、排球館、體適能健身教室、韻律教室、技擊教室，score = ${score}`);
              }
              resolve(currentRound + 1);{}
            });
          }
        }
        else if (position == 7) 
        {
          if (cycle == 0) {
            // 顯示關卡元件
            $("#position_7_cycle_0").show();
            // 偵測選項點擊
            $(".position_7_cycle_0_button").one("click", function() {
              // 取得玩家選擇
              $(".position_7_cycle_0_button").off("click");
              let user_input = $(this).val();
              // 根據玩家選擇更新分數
              if (user_input === "那麼好騎 當然要阿") {
                score -= 20;
                alert(`你騎上了oloo(很貴), 下次行動步數乘3倍, score = ${score}`);
              } else if (user_input === "雖然我沒騎過 但我想試試看") {
                score -= 10;
                alert(`你上了Oloo發現不會騎，在半路上摔倒, score = ${score}`);
              } else if (user_input === "走快一點就好，我才不騎") {
                score -= 10;
                alert(`在路上走被新生騎Oloo撞到, score = ${score}`);
              } else if (user_input === "不要，這個太貴了") {
                score -= 20;
                alert(`走到下個教室太遠，上課遲到, score = ${score}`);
              }
              // 進入下一輪
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 8) {
          if (cycle == 0) {
            $("#position_8_cycle_0").show();
            $(".position_8_cycle_0_button").one("click", function() {
              $(".position_8_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input === "雨傘") {
                score -= 20;
                alert(`購買了雨傘，score = ${score}`);
              } else if (user_input === "食物") {
                score += 20;
                alert(`購買了食物，score = ${score}`);
              } else if (user_input === "架上的學生證") {
                score -= 10;
                alert(`購買了架上的學生證，怎麼有在賣學生證??，score = ${score}`);
              }
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 9) {
          if (cycle == 0) {
            $("#position_9_cycle_0").show();
            $(".position_9_cycle_0_button").one("click", function() {
              $(".position_9_cycle_0_button").off("click");
            });
          }
        }
        else if (position == 10) {
          if (cycle == 0) {
            // 第一次踩到宵夜街
            $("#position_10_cycle_0").show();
            $(".position_10_cycle_0_button").one("click", function() {
              $(".position_10_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input === "吃個宵夜") {
                // 吃宵夜情境
                score += 40;
                alert(`吃個宵夜\n+40 分\nscore = ${score}`);
              }
              resolve(currentRound + 1);
            });
          } else if (cycle == 1) {
            // 第二次踩到宵夜街
            $("#position_10_cycle_1").show();
            $(".position_10_cycle_1_button").one("click", function() {
              $(".position_10_cycle_1_button").off("click");
              let user_input = $(this).val();
              if (user_input === "真的好飽") {
                // 飽了情境
                score -= 10;
                alert(`真的好飽\n-10 分\nscore = ${score}`);
              }
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 11) {
          if (cycle == 0) {
            $("#position_11_cycle_0").show();
            $(".position_11_cycle_0_button").one("click", function() {
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 12) {
          if (cycle == 0) {
            // 第一次踩到游藝館
            $("#position_12_cycle_0").show();
            $(".position_12_cycle_0_button").one("click", function() {
              $(".position_12_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input === "答應") {
                // 接受邀請
                score += 100;
                alert(`接受洗禮的過程中，遇到了真心好友\n+100 分\nscore = ${score}`);
              } else if (user_input === "因社恐不敢走掉，留下") {
                // 社恐情境
                score -= 50;
                alert(`上課遲到，身心受創\n-50 分\nscore = ${score}`);
              } else {
                // 掉頭就走
                alert(`無事發生`);
              }
              resolve(currentRound + 1);
            });
          } else if (cycle == 1) {
            // 第二次踩到游藝館
            $("#position_12_cycle_1").show();
            $(".position_12_cycle_1_button").one("click", function() {
              $(".position_12_cycle_1_button").off("click");
              let user_input = $(this).val();
              if (user_input === "吃飯皇帝大") {
                extraDiceRollChance += 1;
                alert(`回到宵夜街並飽餐一頓\n+1 次擲骰子的機會\nscore = ${score}`);
              } else if (user_input === "好看一直看") {
                extraRoundSkip += 1;
                alert(`當天蓋起了黑布，漫漫星光下出現了數不清的火團，他們飛啊轉啊，一道道銀色軌跡如同流星一般，讓你一陣眩暈。\n暫停 1 回合\nscore = ${score}`);
              }
              resolve(currentRound + 1);
            });
          } else if (cycle == 2) {
            // 第三次踩到游藝館
            $("#position_12_cycle_2").show();
            $(".position_12_cycle_2_button").one("click", function() {
              $(".position_12_cycle_2_button").off("click");
              let user_input = $(this).val();
              if (user_input === "專心於課業") {
                // 專心於課業情境
                score *= 2;
                alert(`恭喜啊恭喜，歐趴呀歐趴，大街小巷都樂開了花！\n當前金錢*2\nscore = ${score}`);
              } else if (user_input === "期末是甚麼？能吃嗎？") {
                // 期末是甚麼？能吃嗎？情境
                extraRoundSkip += 2;
                alert(`你參加了許多社團，現在卻獨自一人啜泣。\n你交到了無數好友，他們卻自己拍畢業照。\n暫停 2 回合\nscore = ${score}`);
              }
              resolve(currentRound + 1);
            });
          } else if (cycle == 3) {
            // 第四次踩到游藝館
            $("#position_12_cycle_3").show();
            $(".position_12_cycle_3_button").one("click", function() {
              $(".position_12_cycle_3_button").off("click");
              let user_input = $(this).val();
              if (user_input === "太極飯糰") {
                score += 50;
                alert(`甚麼，居然有壽喜燒？太酷了吧！飽餐一頓\n+50 分\nscore = ${score}`);
              } else if (user_input === "太極社") {
                alert(`喝！哈！練太極壯身體，你的身體機能以提升\n+100 分\nscore = ${score}`);
              } else if (user_input === "八卦") {
                alert(`路上遇到一位算命大師，人人都說他算的妙算的準，於是你也想過去試試看。沒想到他幫你掐指一算，你的命數已盡。\n生命如同花落下，人生如夢一場空，要是有來世我再也不會算命了。\n遊戲結束\nscore = ${score}`);
                gameOver = true;
              }
              resolve(currentRound + 1);
            });
          } else if (cycle == 4) {
            // 第五次踩到游藝館
            $("#position_12_cycle_4").show();
            $(".position_12_cycle_4_button").one("click", function() {
              $(".position_12_cycle_4_button").off("click");
              let user_input = $(this).val();
              if (user_input === "選擇無視") {
                extraRoundSkip += 1;
                alert(`室友感冒並傳染給你！\n暫停 1 回合\nscore = ${score}`);
              } else if (user_input === "請他多喝熱水") {
                score += 50;
                alert(`古人云：「熱水既能暖身亦能暖心。」沒事多喝水，多喝水沒事，你的室友身體健健康康，而你也感到心神安定。\n+50 分\nscore = ${score}`);
              } else if (user_input === "拿毛巾幫他擦拭濕潤的頭髮") {
                extraRoundSkip += 1;
                score *= 2;
                alert(`觸碰到他的髮絲之際，你心想這髮質怎麼這麼柔軟滑順？呆滯之餘，他回頭望向你，兩眼對視間彷彿出現一道電流，你倆 惺惺相惜、情不自禁。\n暫停 1 回合，當前金錢*2\nscore = ${score}`);
              }
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 13) {
          if (cycle == 0) {
            $("#position_13_cycle_0").show();
            $(".position_13_cycle_0_button").one("click", function() {
              $(".position_13_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "B:誠樸") {
                score += 20;
                alert("答對了！校訓是「誠樸」，你真是一位稱職的中大生！");
              } else {
                score -= 20;
                alert("答錯了！校訓是「誠樸」，你要更加了解學校的故事喔！");
              }
              resolve(currentRound + 1);
            });
          }
          else if (cycle == 1) {
            $("#position_13_cycle_1").show();
            $(".position_13_cycle_1_button").one("click", function() {
              $(".position_13_cycle_1_button").off("click");
              let user_input = $(this).val();
              if (user_input == "C:62") {
                score += 20;
                alert("答對了！2024年是中大在台復校的第62年！");
              } else {
                score -= 20;
                alert("答錯了！2024年是中大在台復校的第62年！");
              }
              resolve(currentRound + 1);
            });
          }
        }
        else if (position == 14) {
          if (cycle == 0) {
            $("#position_14_cycle_0").show();
            $(".position_14_cycle_0_button").one("click", function() {
              $(".position_14_cycle_0_button").off("click");
              let user_input = $(this).val();
              if (user_input == "A:照片a") {
                alert("答對了！朱銘是照片a中的人物！");
              } else {
                alert("答錯了！朱銘不是照片b中的人物！");
              }
              resolve(currentRound + 1);
            });
          }
        }
      }
      else
      {
        resolve();
      }
    });
  }

  async function iterate() {
    let currentRound = 0;
    const totalRound = 10;
    while (currentRound < totalRound)
      currentRound = await doIteration(currentRound, totalRound);
    // EDIT (把分數儲存到資料庫)
  }

  iterate();
});


//單元格效果
function handleGateEffect(locationId){
  if(locationId==='location1'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location2'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location3'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location4'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location5'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location6'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location7'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location8'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location9'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location10'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location11'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location12'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }

  if(locationId==='location13'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location14'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location15'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  if(locationId==='location16'){
      showgateInfomodal();
      closeGameInfoModal();
      closeUserScoreModal();
  }
  
}


// Step.3 遊戲結束後 //

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


function closeModalButtonHandling(option) {
    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();
}

// Step.4 遊戲重新開始 // 
function reset(){
    closegateInfomodal();
    closeUserScoreModal();
    showGameInfoModal();

    storeDiceTime(Number(10));
    storeLocation("location1");
    storeScore(100);
    let locationId = loadLocation();
    moveRedDot(locationId);
}



function showDescription(title, description) {
    // 更新標題和描述
    document.getElementById("title").innerText = title;
    document.getElementById("descriptionText").innerText = description;
    
    // 創建題目選項列表
    var questionOptions = document.createElement("ul");
    for (var i = 1; i <= 4; i++) {
      var questionOption = document.createElement("li");
      questionOption.innerText = title + "-選項" + i;
      questionOptions.appendChild(questionOption);
    }
    
    // 將題目選項列表插入到描述下面
    document.getElementById("questionOptions").innerHTML = "";
    document.getElementById("questionOptions").appendChild(questionOptions);
    
    // 創建回答選項列表
    var answerOptions = document.createElement("ul");
    for (var i = 1; i <= 4; i++) {
      var answerOption = document.createElement("li");
      answerOption.innerText = title + "-回答" + i;
      answerOptions.appendChild(answerOption);
    }
    
    // 將回答選項列表插入到描述下面
    document.getElementById("answerOptions").innerHTML = "";
    document.getElementById("answerOptions").appendChild(answerOptions);
}



