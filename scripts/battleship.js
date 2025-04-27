// Function to start the game
function startGame(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const boardSize = parseInt(document.getElementById('board-size').value); // Get the board size from the input field
  const ship2 = parseInt(document.getElementById('ships-2').value); // Get the ship count from the input field
  const ship3 = parseInt(document.getElementById('ships-3').value);
  const ship4 = parseInt(document.getElementById('ships-4').value);
  const ship5 = parseInt(document.getElementById('ships-5').value);

  generateBoard(boardSize, 'player1-board'); // Generate the player board
  generateBoard(boardSize, 'opponent-board'); // Generate the opponent board
  generateBoard(boardSize, 'dummy-board'); // Generate the dummy board
}

// Function to generate the game board
function generateBoard(size, boardId) {
  const board = document.getElementById(boardId);
  board.innerHTML = '';

  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr');

    for (let col = 0; col < size; col++) {
      const td = document.createElement('td');

      if (boardId === 'opponent-board') {
        td.addEventListener('click', function () {
          this.style.backgroundColor = 'red';
        });
      } else if (boardId === 'player1-board') {
        td.addEventListener('click', function () {
          this.style.backgroundColor = 'blue';
        });
      } else if (boardId === 'dummy-board') {
        td.addEventListener('click', function () {
          this.style.backgroundColor = 'green';
        });
      }

      tr.appendChild(td); // Append the cell to the row
    }

    board.appendChild(tr); // Append the row to the board
  }
}

const startGameButton = document.getElementById('start-game-button');
startGameButton.addEventListener('click', function () {
  startGame(event); // Call the startGame function when the button is clicked
});
