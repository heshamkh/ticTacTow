var orgBoard;
const huPlayer = "O";
const AiPlayer = "X";
const winCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];

const cells = document.querySelectorAll(".cell");

startGame();

function startGame() {
	document.querySelector(".end-game").style.display = "none";
	orgBoard = Array.from(Array(9).keys);
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.removeProperty("background-color");
		cells[i].addEventListener("click", turnClick, false);
	}
}

function turnClick(square) {
	turn(square.target.id, huPlayer);
}

function turn(squareId, player) {
	orgBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(orgBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
	let gameWon = null;
	for (let [index, win] of winCombo.entries()) {
		if (win.every((elem) => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	console.log(gameWon);
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombo[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("click", turnClick, false);
	}
}
