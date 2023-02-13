"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const totalScore0 = document.querySelector("#score--0");
const totalScore1 = document.querySelector("#score--1");
const diceImg = document.querySelector(".dice");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const holdScore = document.querySelector(".btn--hold");

// Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	totalScore0.textContent = 0;
	totalScore1.textContent = 0;
	currentScore0.textContent = 0;
	currentScore1.textContent = 0;

	diceImg.classList.add("hidden");
	player0.classList.remove("player--winner");
	player1.classList.remove("player--winner");
	player0.classList.add("player--active");
	player1.classList.remove("player--active");
};

init();

const switchPlayer = function () {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0.classList.toggle("player--active");
	player1.classList.toggle("player--active");
};

rollDice.addEventListener("click", function () {
	if (playing) {
		const dice = Math.floor(Math.random() * 6) + 1;
		diceImg.classList.remove("hidden");
		diceImg.src = `dice-${dice}.png`;

		if (dice !== 1) {
			currentScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

holdScore.addEventListener("click", function () {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] > 15) {
			playing = false;
			diceImg.classList.add("hidden");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
		} else {
			switchPlayer();
		}
	}
});

newGame.addEventListener("click", init);
