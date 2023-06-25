let ys = 1;
let dl = 0;
let score = 0;
let clicklevel = 1;
let clickcost = 10;
let clickpower = 1;
let plusfree = 0;
let totalProduction = 0;
let generators = [
  { name: "農場", cost: 10, rate: 1, production: 0, level: 1 },
  { name: "紙生産工場", cost: 50, rate: 5, production: 0, level: 1 },
  { name: "金属加工工場", cost: 100, rate: 10, production: 0, level: 1 },
  { name: "発電所", cost: 200, rate: 20, production: 0, level: 1 },
  { name: "下水処理場", cost: 500, rate: 50, production: 0, level: 1 },
  { name: "銀行", cost: 1000, rate: 100, production: 0, level: 1 },
  { name: "地主", cost: 2000, rate: 200, production: 0, level: 1 },
  { name: "飛行機工場", cost: 5000, rate: 500, production: 0, level: 1 },
  { name: "造船所", cost: 10000, rate: 1000, production: 0, level: 1 },
  { name: "油田", cost: 20000, rate: 2000, production: 0, level: 1 }
];

function clickup(){
  if (score > clickcost){
    score -= clickcost;
    clicklevel += 1; 
    clickpower += (clicklevel * 2);
    clickcost += ((clicklevel * clicklevel) * 50)
    document.getElementById("clickcost").innerText = "コスト: " + clickcost;
    document.getElementById("clickpower").innerText = "生産力: " + clickpower;
    document.getElementById("clicklevel").innerText = "レベル: " + clicklevel;
    nsaveGame();
  }
}

function increaseScore() {
  score += clickpower;
  document.getElementById("score").innerText = Math.floor(score);
  document.getElementById("click-button").classList.add("animate");
  setTimeout(function() {
    document.getElementById("click-button").classList.remove("animate");
  }, 300);
}

function buyGenerator(index) {
  let generator = generators[index];
  if (score >= generator.cost) {
    score -= generator.cost;
    generator.cost *= 1.2;
    generator.production += generator.rate;
    totalProduction += generator.rate;
    generator.level++;
    document.getElementById("score").innerText = Math.floor(score);
    updateProductionUI();
    updateGeneratorUI(index);
  }
  updateProductionUI();
updateGeneratorUI(index);
saveGame();
}

function updateProductionUI() {
  document.getElementById("total-production").innerText = `合計生産量: ${totalProduction} / 秒`;
}

function updateGeneratorUI(index) {
  let generator = generators[index];
  let generatorElement = document.getElementById(`generator-${index}`);
  generatorElement.querySelector(".generator-name").innerText = generator.name;
  generatorElement.querySelector(".generator-cost").innerText = `コスト: ${generator.cost.toFixed(0)}`;
  generatorElement.querySelector(".generator-production").innerText = `生産量: ${generator.production} / 秒`;
  generatorElement.querySelector(".generator-level").innerText = `レベル: ${generator.level}`;
}

setInterval(function() {
  for (let i = 0; i < generators.length; i++) {
    let generator = generators[i];
    score += generator.production;
  }
  nsaveGame();
  document.getElementById("score").innerText = Math.floor(score);
}, 1000);

window.onload = function() {
  loadGame();
};



window.addEventListener('beforeunload', function(event) {
// 現在の日時を取得
var currentDate = new Date();

// 現在の日時をローカルストレージに保存
localStorage.setItem('lastAccessTime', currentDate.getTime());

// 確認メッセージを表示（一部のブラウザで表示される）
event.returnValue = 'ページを離れますか？';
});

// ページが読み込まれた時に処理を実行
window.addEventListener('load', function() {
loadGame();
// ローカルストレージから前回のアクセス時間を取得
var lastAccessTime = localStorage.getItem('lastAccessTime');

// 前回のアクセス時間が存在する場合のみ計算処理を行う
if (lastAccessTime) {
// 前回のアクセス時間を日時オブジェクトに変換
var lastAccessDate = new Date(parseInt(lastAccessTime));

// 現在の日時を取得
var currentDate = new Date();

// 時間の差を計算（ミリ秒単位）
var timeDiff = currentDate.getTime() - lastAccessDate.getTime();

// 時間の差を秒に変換
var secondsDiff = Math.floor(timeDiff / 1000);

function calculateScoreOnce() {
for (let i = 0; i < generators.length; i++) {
  let generator = generators[i];
 plusfree += generator.production * secondsDiff; // 1秒毎の生産量にNOVAをかけてscoreに追加する
}
score += plusfree
document.getElementById("score").innerText = Math.floor(score);
}

// 1秒後にcalculateScoreOnceを実行する
calculateScoreOnce();

// 結果を表示
console.log("前回のアクセスからの生産量は " + plusfree + " です。");
document.getElementById("plus").innerText = "今回の放置で手に入れた量は" + Math.floor(plusfree);
setTimeout(function() {document.getElementById("plus").innerText = ""}, 3000);

}
});

function saveGame() {
if (ys == 1){
// ゲームの状態を保存
localStorage.setItem("score", score);
localStorage.setItem("click", clicklevel);
localStorage.setItem("click", clickcost);
localStorage.setItem("click", clickpower);
localStorage.setItem("totalProduction", totalProduction);
localStorage.setItem("generators", JSON.stringify(generators));
document.getElementById("ys").innerText = "セーブ完了"
setTimeout(function() {
document.getElementById("ys").innerText = ""
}, 1000); // 1000ミリ秒 = 1秒
} else {
document.getElementById("ys").innerText = "セーブ失敗時間をあけてください"
setTimeout(function() {
document.getElementById("ys").innerText = ""}, 1000); // 1000ミリ秒 = 1秒
}
}

function nsaveGame() {
  if (ys == 1){
    // ゲームの状態を保存
    localStorage.setItem("score", score);
    localStorage.setItem("level", clicklevel);
    localStorage.setItem("cost", clickcost);
    localStorage.setItem("power", clickpower);
    localStorage.setItem("totalProduction", totalProduction);
    localStorage.setItem("generators", JSON.stringify(generators));
    document.getElementById("ys").innerText = "セーブ完了"
    setTimeout(function() {
    document.getElementById("ys").innerText = ""
    }, 1000); // 1000ミリ秒 = 1秒
    }  else {
document.getElementById("ys").innerText = "セーブ失敗時間をあけてください"
setTimeout(function() {
document.getElementById("ys").innerText = ""}, 1000); // 1000ミリ秒 = 1秒
}
}

function loadGame() {
// ゲームの状態をロード
score = parseInt(localStorage.getItem("score")) || 0;
totalProduction = parseInt(localStorage.getItem("totalProduction")) || 0;
clicklevel = parseInt(localStorage.getItem("level")) || 1;
clickcost = parseInt(localStorage.getItem("cost")) || 10;
clickpower = parseInt(localStorage.getItem("power")) || 1;

// ジェネレーターの購入情報をロード
const generatorsData = localStorage.getItem("generators");
if (generatorsData) {
generators = JSON.parse(generatorsData);
}


document.getElementById("clickcost").innerText = "コスト: " + clickcost;
document.getElementById("clickpower").innerText = "生産力: " + clickpower;
document.getElementById("clicklevel").innerText = "レベル: " + clicklevel;
document.getElementById("score").innerText = score;
document.getElementById("total-production").innerText = totalProduction + " / 秒";
updateProductionUI();
for (let i = 0; i < generators.length; i++) {
updateGeneratorUI(i);
}
}

function resetGame() {
// ゲームの状態を初期化
score = 0;
totalProduction = 0;
timeLeft = 30;

// ジェネレーターの購入情報を初期化
generators = [];

// 保存された情報を削除
localStorage.removeItem("score");
localStorage.removeItem("totalProduction");
localStorage.removeItem("generators");

// UI を更新
document.getElementById("score").innerText = score;
document.getElementById("total-production").innerText = totalProduction + " / 秒";
updateProductionUI();

// ページを再読み込み
location.reload();
}
