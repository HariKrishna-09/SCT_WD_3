const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            cells[a].style.backgroundColor = "#C3073F";
            cells[b].style.backgroundColor = "#C3073F";
            cells[c].style.backgroundColor = "#C3073F";
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        statusText.textContent = "😲 It's a Draw!";
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] === "" && gameActive) {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#4E4E50";
    });
    statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);