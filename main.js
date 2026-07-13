"use strict";
// Array Of Words
const words = {
  Easy: [
    "Hello",
    "Code",
    "Town",
    "Scala",
    "Funny",
    "Task",
    "Rust",
    "Test",
    "Roles",
    "Array",
    "Event",
    "Fetch",
    "Node",
    "Tags",
    "Tree",
    "Yield",
    "State",
    "Scope",
    "Loop",
    "React",
    "This",
    "Var",
    "Bug",
    "Html",
    "Null",
  ],
  Normal: [
    "Country",
    "Runner",
    "Playing",
    "Working",
    "Coding",
    "Cascade",
    "Styling",
    "Testing",
    "Python",
    "Youtube",
    "Github",
    "Twitter",
    "Leetcode",
    "Boolean",
    "Compiler",
    "Element",
    "Provider",
    "Selector",
    "Template",
    "Webpack",
    "Variable",
    "Promise",
    "Iterable",
    "Closure",
    "Constant",
  ],
  Hard: [
    "Programming",
    "Javascript",
    "Linkedin",
    "Internet",
    "Destructuring",
    "Paradigm",
    "Recursion",
    "Constructor",
    "Inheritance",
    "Basosy123",
    "Temperature",
    "Lightning",
    "Comfortable",
    "Appreciate",
    "Facebookone",
    "Relationship",
    "Independence",
    "Hi",
    "Habibi",
  ],
};
// Random Words Of Easy Words
const randomWords = {
  Easy: [],
  Normal: [],
  Hard: [],
};
// Setting Levels
const lvls = [
  { name: "Easy", seconds: 5 },
  { name: "Normal", seconds: 4 },
  { name: "Hard", seconds: 5 },
];
// Catch Selctors
const levelsSelectBox = document.querySelector("#levelsBox");
const difficultyMessage = document.querySelector(".difficulty");
const gameStatusBoard = document.querySelector(".message");
const levelName = document.querySelector(".message .lvl");
const levelSeconds = document.querySelector(".message .seconds");
const startButton = document.querySelector(".start");
const currentWord = document.querySelector(".the-word");
const inputField = document.querySelector(".input");
const upcomingWords = document.querySelector(".upcoming-words");
const controlBox = document.querySelector(".control");
const timeBox = document.querySelector(".time");
const timeLeft = document.querySelector(".time span");
const yourScore = document.querySelector(".score .got");
const totalScore = document.querySelector(".score .total");
const helperText = document.querySelector(".helper-text");
const gameTimerElement = document.querySelector(".game-timer");
const scoreBoxes = document.querySelectorAll(".scores-box");
const scoreTitles = document.querySelectorAll(".scores-title");
const bestEasyScoresTable = document.querySelector(".easy-scores-body");
const bestNormalScoresTable = document.querySelector(".normal-scores-body");
const bestHardScoresTable = document.querySelector(".hard-scores-body");
const newScorePopup = document.querySelector(".new-score-popup");
const finishLevelMessage = document.querySelector(".finish-level-message");
const endGameMessage = document.querySelector(".end-game-message");
const closeEndGameMessage = document.querySelector(".end-game-message .close");
const tables = {
  Easy: bestEasyScoresTable,
  Normal: bestNormalScoresTable,
  Hard: bestHardScoresTable,
};
// Get The Curr Level
if (localStorage.getItem("current-lvl")) {
  levelsSelectBox.value = localStorage.getItem("current-lvl");
}
// Set Default Level
updateSelectColor();
let defaultLevelName = levelsSelectBox.value;
let defaultLevelSeconds = setDefaultSeconds();
// If The user Change The DefaultValue
levelsSelectBox.addEventListener("change", function () {
  updateSelectColor();
  defaultLevelName = this.value;
  defaultLevelSeconds = setDefaultSeconds();
  levelSettings();
  // Save The Current Level On Local Storage
  saveLevel(this.value);
});
// Set The Level Name + Second + Score
levelSettings();
// Disable Paste Event
inputField.addEventListener("paste", (e) => e.preventDefault());
// Best Scores
let bestScores = {
  Easy: [],
  Normal: [],
  Hard: [],
};
// Check If There Is Elements In LocalStorage
if (localStorage.getItem("scores")) {
  try {
    bestScores = JSON.parse(localStorage.getItem("scores"));
    document.querySelector(".scores-boxes-title").textContent =
      "🏆Leaderboard🏆";
    showScores("Easy");
    showScores("Normal");
    showScores("Hard");
  } catch (error) {
    console.error("Failed to load saved scores:", error);
    localStorage.removeItem("scores"); // نمسح الداتا التالفة عشان منقعش في نفس المشكلة تاني
  }
}
// Start Game Trigger
startButton.addEventListener("click", () => {
  startButton.remove();
  difficultyMessage.remove();
  levelsSelectBox.remove();
  inputField.focus();
  // Generate Word Func
  genWords();
});
// If The Player Click On The Play Again reload The Page
controlBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-again")) {
    localStorage.removeItem("current-lvl");
    location.reload();
  }
});
finishLevelMessage.addEventListener("click", (e) => {
  if (e.target.classList.contains("again")) {
    randomWords[defaultLevelName].length = 0;
    levelSettings();
    inputField.focus();
    inputField.value = "";
    genWords();
    finishLevelMessage.classList.remove("show");
  } else if (e.target.classList.contains("next")) {
    for (let i = 0; i < lvls.length; i++) {
      if (defaultLevelName === lvls[i].name) {
        defaultLevelName = lvls[i + 1].name;
        defaultLevelSeconds = lvls[i + 1].seconds;
        break;
      }
    }
    levelSettings();
    finishLevelMessage.classList.remove("show");
    inputField.focus();
    genWords();
  } else if (e.target.classList.contains("end")) {
    // Hide And Remove FinishLevelMessage
    finishLevelMessage.classList.remove("show");
    finishLevelMessage.remove();
    // Remove upcomingWords and inputField and current Word Box
    upcomingWords.remove();
    inputField.remove();
    currentWord.remove();
    // Change Game Stauts Board Content
    let CongratsWord = document.createElement("span");
    let CongratsMessage = document.createElement("span");
    CongratsWord.textContent = "🎉 Congratulations! 🎉";
    CongratsMessage.textContent =
      "You have successfully mastered every level of the game.";
    CongratsWord.classList.add("Congrats-word");
    CongratsMessage.classList.add("Congrats-message");
    gameStatusBoard.textContent = "";
    gameStatusBoard.append(CongratsWord, CongratsMessage);
    // append The Message in end Game Message
    endGameMessage.innerHTML = `
      <span class="close">X</span>
      <div class="popup-body">
        <h3 class="popup-title">Legend Unlocked!🏆</h3>
        <p class="popup-subtitle">You beat the Hard level and officially completed the entire game! 🔥</p>
        <p class="popup-note">Your typing speed is off the charts. Respect! 👑</p>
      </div>
    `;
    endGameMessage.classList.toggle("show");
  }
});
endGameMessage.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    // Hide End Game Message Element
    endGameMessage.classList.toggle("show");
    timeBox.remove();
    // Create Restart Game Element
    let restart = document.createElement("div");
    restart.classList.add("play-again");
    restart.textContent = "Restart Game";
    controlBox.append(restart);
    // This code allows the hiding animation to happen
    setTimeout(() => {
      endGameMessage.remove();
    }, 500);
  }
});
scoreTitles.forEach((scoreTitle) => {
  scoreTitle.addEventListener("click", (e) => {
    if (e.target.classList.contains("open-icon")) {
      e.target.classList.toggle("open");
      // Find The Correct Table To Open It
      for (const scoreBox of scoreBoxes) {
        if (scoreBox.querySelector(".scores-title") === scoreTitle) {
          scoreBox.querySelector(".scores_table").classList.toggle("open");
          break;
        }
      }
    }
  });
});
function genWords() {
  // we Check if The Random Array Of Default Level [Easy or Normal or Hard ] Is Empty
  // if That's True We push  words in the Random Array Randomly
  if (randomWords[defaultLevelName].length === 0) {
    // resize Game Timer var
    gameTimer = 0;
    // we are Cloning  Words for the Current Level
    const wordsForTheCurrentLevel = structuredClone(words[defaultLevelName]);
    // We Are Push The Words In Random Arr Randomly
    while (wordsForTheCurrentLevel.length > 0) {
      let randomWord =
        wordsForTheCurrentLevel[
          Math.floor(Math.random() * wordsForTheCurrentLevel.length)
        ];
      randomWords[defaultLevelName].push(randomWord);
      let randomWordIndex = wordsForTheCurrentLevel.indexOf(randomWord);
      wordsForTheCurrentLevel.splice(randomWordIndex, 1);
    }
  }
  // Get Word From Random  Array
  let word = randomWords[defaultLevelName][0];
  // Show The  Word On The Page
  currentWord.textContent = word;
  removeCurrentColor(currentWord);
  // Set The Color
  currentWord.classList.add(defaultLevelName.toLowerCase());
  // Remove The  Word From arr
  randomWords[defaultLevelName].splice(0, 1);
  upcomingWords.textContent = "";
  // Show Up Coming Words
  for (const word of randomWords[defaultLevelName]) {
    let div = document.createElement("div");
    div.classList.add(defaultLevelName.toLowerCase());
    div.textContent = word;
    upcomingWords.append(div);
  }
  // add Listener to Check Enter Key
  inputField.addEventListener("keyup", checkinputField);
  // Call Start Play Func
  startPlay();
}
let wordTimer;
let gameTimer = 0;
function startPlay() {
  // Check If This Is The First Word Or Not
  if (yourScore.textContent === "0") {
    timeLeft.textContent = defaultLevelSeconds + 3;
  } else {
    timeLeft.textContent = defaultLevelSeconds;
  }
  showTimer(gameTimer);
  wordTimer = setInterval(() => {
    timeLeft.textContent--;
    gameTimer++;
    showTimer(gameTimer);
    if (timeLeft.textContent === "0") {
      clearInterval(wordTimer);
      inputField.removeEventListener("keyup", checkinputField);
      checkFunc();
    }
  }, 1000);
}
function levelSettings() {
  let elements = [levelName, levelSeconds, timeLeft, totalScore, yourScore];
  // Remove Current Color From All Element
  elements.forEach((el) => removeCurrentColor(el));
  // Set The Color To All Elements
  let elementColor = defaultLevelName.toLowerCase();
  elements.forEach((el) => el.classList.add(elementColor));
  // Set The Content To All Elements
  levelName.textContent = defaultLevelName;
  levelSeconds.textContent = defaultLevelSeconds;
  timeLeft.textContent = defaultLevelSeconds;
  totalScore.textContent = words[defaultLevelName].length;
  yourScore.textContent = "0";
}
function checkFunc() {
  finishLevelMessage.innerHTML = "";
  if (
    currentWord.textContent.toLowerCase() === inputField.value.toLowerCase()
  ) {
    inputField.value = "";
    yourScore.textContent++;
    if (randomWords[defaultLevelName].length > 0) genWords();
    else {
      let goodBox = document.createElement("div");
      let againOrNextBox = document.createElement("div");
      let again = document.createElement("span");
      let next = document.createElement("span");
      goodBox.classList.add("good");
      goodBox.textContent = "🥳Congrats🥳";
      againOrNextBox.classList.add("again-next");
      again.textContent = "Try Again";
      again.classList.add("again");
      if (defaultLevelName.toLowerCase() !== "hard") {
        next.textContent = "Next Level";
        next.classList.add("next");
      } else {
        next.textContent = "End Game";
        next.classList.add("end");
      }
      againOrNextBox.append(again, next);
      goodBox.append(againOrNextBox);
      finishLevelMessage.append(goodBox);
      currentWord.textContent = "";
      inputField.blur();
      finishLevelMessage.classList.add("show");
      saveScore(gameTimer);
      hideTimer();
    }
  } else {
    let div = document.createElement("div");
    let span = document.createElement("span");
    div.classList.add("bad");
    div.textContent = "😅Game Over😜";
    span.textContent = "Try Again";
    span.classList.add("again");
    div.append(span);
    finishLevelMessage.append(div);
    currentWord.textContent = "";
    inputField.value = "";
    inputField.blur();
    finishLevelMessage.classList.add("show");
    hideTimer();
  }
}
function checkinputField(e) {
  if (e.key === "Enter" && inputField.value !== "") {
    clearInterval(wordTimer);
    inputField.removeEventListener("keyup", checkinputField);
    checkFunc();
  }
}
function setDefaultSeconds() {
  let seconds;
  for (const lvl of lvls) {
    if (lvl.name === defaultLevelName) {
      seconds = lvl.seconds;
      return seconds;
    }
  }
}
function showTimer(timer) {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");
  gameTimerElement.classList.add("show");
  gameTimerElement.textContent = `${minutes}:${seconds}`;
}
function hideTimer() {
  setTimeout(() => {
    gameTimerElement.classList.remove("show");
  }, 1000);
}
function saveScore(gameTimer) {
  // Check If There Is The Same Score On List
  const isDuplicate = bestScores[defaultLevelName].some(
    (score) => gameTimer === score.timerNumber,
  );
  if (isDuplicate) return;
  const scoreObj = createScoreObj(gameTimer);
  bestScores[defaultLevelName].push(scoreObj);
  bestScores[defaultLevelName].sort((a, b) => a.timerNumber - b.timerNumber);
  bestScores[defaultLevelName].length = Math.min(
    bestScores[defaultLevelName].length,
    5,
  );
  const isNewTopScore = bestScores[defaultLevelName][0] === scoreObj;
  if (!bestScores[defaultLevelName].includes(scoreObj)) return;
  localStorage.setItem("scores", JSON.stringify(bestScores));
  if (isNewTopScore) {
    showNewScorePopup();
    showScores(defaultLevelName, true);
  } else showScores(defaultLevelName);
}
function saveLevel(level) {
  localStorage.setItem("current-lvl", level);
}
function createScoreObj(gameTimer) {
  let date = new Date();
  let dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  let hours = date.getHours();
  hours === 0 ? (hours = 12) : (hours = hours);
  let min = date.getMinutes();
  min = min.toString().padStart(2, "0");
  let pm = false;
  if (hours > 12) {
    hours -= 12;
    hours = hours.toString().padStart(2, "0");
    pm = true;
  }
  if (!pm) hours = hours.toString().padStart(2, "0");
  let timeFormat = `${hours}:${min} ${pm ? "PM" : "AM"}`;
  let scoreData = {
    timerNumber: gameTimer,
    timerFormat: gameTimerElement.textContent,
    date: dateFormat,
    time: timeFormat,
  };
  return scoreData;
}
function showScores(levelScores, isTopScore = false) {
  scoreBoxes.forEach((scoresBox) => scoresBox.classList.remove("hide"));
  let fragment = document.createDocumentFragment();
  if (bestScores[levelScores].length === 0) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td>No Scores Yet</td><td>????</td><td>????</td>";
    fragment.append(emptyRow);
  } else {
    for (const score of bestScores[levelScores]) {
      let tableRow = document.createElement("tr");
      let tableScoreData = document.createElement("td");
      let tableDateData = document.createElement("td");
      let tableMintesData = document.createElement("td");
      if (isTopScore) {
        // Table Row Color
        tableRow.classList.add(defaultLevelName.toLowerCase());
        isTopScore = false;
        setTimeout(() => {
          tableRow.classList.remove(defaultLevelName.toLowerCase());
        }, 3000);
      }
      tableScoreData.textContent = score.timerFormat;
      tableDateData.textContent = score.date;
      tableMintesData.textContent = score.time;
      tableRow.append(tableScoreData, tableDateData, tableMintesData);
      fragment.append(tableRow);
    }
  }
  // Empty the Current Table
  tables[levelScores].innerHTML = "";
  tables[levelScores].append(fragment);
}
function showNewScorePopup() {
  newScorePopup.innerHTML = `You Got A New Score On <span style = "font-weight:bold">"${defaultLevelName}"</span> Level!!`;
  newScorePopup.classList.toggle("show");
  // Open The Table For The Current Level
  for (const scoresBox of scoreBoxes) {
    if (scoresBox.dataset.level === defaultLevelName) {
      let openIcon = scoresBox.querySelector(".open-icon");
      openIcon.click();
      break;
    }
  }
  setTimeout(() => {
    newScorePopup.classList.toggle("show");
  }, 3000);
}
function updateSelectColor() {
  const selectedOption = levelsSelectBox.options[levelsSelectBox.selectedIndex];
  const optionColor = selectedOption.dataset.color;
  levelsSelectBox.style.color = optionColor;
  levelsSelectBox.style.borderColor = optionColor;
}
function removeCurrentColor(element) {
  for (let i = 0; i < lvls.length; i++) {
    element.classList.remove(lvls[i].name.toLowerCase());
  }
}
