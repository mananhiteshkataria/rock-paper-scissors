// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");

const computerScore= document.querySelector(".c_score__number");
let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

let aiScore = 0; // Initialize AI score

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1, 'user');
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepScore(1, 'ai');
    } else {
      resultText.innerText = "draw";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function keepScore(point, player) {
  if (player === 'user') {
    score += point;
    scoreNumber.innerText = score;
    localStorage.setItem('userScore', score); // Store user score in localStorage
  } else if (player === 'ai') {
    aiScore += point;
    computerScore.innerText = aiScore;
    localStorage.setItem('aiScore', aiScore); // Store AI score in localStorage
  }
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}



// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});


window.onload = function() {
  // Retrieve scores from localStorage
  let storedUserScore = localStorage.getItem('userScore');
  let storedAiScore = localStorage.getItem('aiScore');

  // If scores exist in localStorage, use them. Otherwise, initialize to 0.
  score = storedUserScore ? parseInt(storedUserScore) : 0;
  aiScore = storedAiScore ? parseInt(storedAiScore) : 0;

  // Display the scores
  scoreNumber.innerText = score;
  computerScore.innerText = aiScore;
}



document.querySelector('.next-btn').addEventListener('click', function() {
  if (score > aiScore) {
    window.location.href = 'winner.html';
  } else if (score < aiScore) {
    window.location.href = 'loser.html';
  } else {
    window.location.href = 'draw.html';
  }
});

function GoToHomePage()
{
  window.location = '/rock-paper-scissors/index.html';   
  localStorage.clear();
}