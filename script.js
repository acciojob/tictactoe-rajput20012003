//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const messageDiv = document.querySelector('.message');
    const boardDiv = document.querySelector('.board');

    let currentPlayer = 'X'; // X represents player 1, O represents player 2

    submitButton.addEventListener('click', function() {
        const player1Name = player1Input.value;
        const player2Name = player2Input.value;
        // Validate player names
        if (player1Name && player2Name) {
            // Display the game board
            displayBoard();
            // Display message for player 1's turn
            showMessage(`${player1Name}, you're up!`);
        } else {
            alert('Please enter names for both players.');
        }
    });

    function displayBoard() {
        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            cell.addEventListener('click', function() {
                if (!this.textContent) {
                    this.textContent = currentPlayer;
                    checkWinner();
                    togglePlayer();
                }
            });
            boardDiv.appendChild(cell);
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Horizontal
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Vertical
            [1, 5, 9], [3, 5, 7] // Diagonal
        ];
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                document.getElementById(a).textContent &&
                document.getElementById(a).textContent === document.getElementById(b).textContent &&
                document.getElementById(b).textContent === document.getElementById(c).textContent
            ) {
                const winner = currentPlayer === 'X' ? player1Input.value : player2Input.value;
                showMessage(`${winner} congratulations you won!`);
                return;
            }
        }
        // Check for draw
        const cells = document.querySelectorAll('.cell');
        if ([...cells].every(cell => cell.textContent)) {

