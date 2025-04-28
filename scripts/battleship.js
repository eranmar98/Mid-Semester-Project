// ========================
// Global Variables
// ========================
let opponentShips = []; // Opponent's 2D ship array
let playerShips = []; // Player's 2D ship array

// ========================
// Opponent's Ships Left
let opponentShipsLeft = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

// ========================
// Game Start and Initialization
// ========================
const startGameButton = document.getElementById('start-game-button');
startGameButton.addEventListener('click', function (event) {
  startGame(event); // Start the game when the button is clicked
});

function startGame(event) {
  event.preventDefault(); // Prevent default form submission

  const boardSize = parseInt(document.getElementById('board-size').value);
  const ship2 = parseInt(document.getElementById('ships-2').value);
  const ship3 = parseInt(document.getElementById('ships-3').value);
  const ship4 = parseInt(document.getElementById('ships-4').value);
  const ship5 = parseInt(document.getElementById('ships-5').value);

  if (
    isNaN(boardSize) ||
    isNaN(ship2) ||
    isNaN(ship3) ||
    isNaN(ship4) ||
    isNaN(ship5)
  ) {
    alert('Fill all fields before starting the game!');
    return;
  }

  initializeOpponentShips(boardSize, ship2, ship3, ship4, ship5);
  initializePlayerShips(boardSize, ship2, ship3, ship4, ship5);

  generateBoard(boardSize, 'player1-board');
  generateBoard(boardSize, 'opponent-board');
}

// ========================
// Board Creation
// ========================
function generateBoard(size, boardId) {
  const board = document.getElementById(boardId);
  board.innerHTML = '';

  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr');

    for (let col = 0; col < size; col++) {
      const td = document.createElement('td');

      if (boardId === 'player1-board') {
        if (playerShips[row][col] > 0) {
          td.style.backgroundColor = 'blue'; // Your ship cell
        }
      }

      td.dataset.row = row; // Store row index in data attribute
      td.dataset.col = col; // Store column index in data attribute

      if (boardId === 'opponent-board') {
        td.addEventListener('click', shootAtCell);
      }

      tr.appendChild(td);
    }

    board.appendChild(tr);
  }
}

// ========================
// Ship Placement (Player and Opponent)
// ========================
function initializePlayerShips(size, ship2, ship3, ship4, ship5) {
  playerShips = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const ships = [
    // Define ship sizes and counts
    { size: 2, count: ship2 },
    { size: 3, count: ship3 },
    { size: 4, count: ship4 },
    { size: 5, count: ship5 },
  ];

  ships.forEach((ship) => {
    for (let i = 0; i < ship.count; i++) {
      placePlayerShipRandomly(ship.size);
    }
  });
}

// Place ships randomly on the player's board
function placePlayerShipRandomly(shipSize) {
  const size = playerShips.length;
  let placed = false;

  while (!placed) {
    // Keep trying until the ship is placed
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (canPlacePlayerShip(row, col, shipSize, direction)) {
      for (let i = 0; i < shipSize; i++) {
        if (direction === 'horizontal') {
          playerShips[row][col + i] = shipSize;
        } else {
          playerShips[row + i][col] = shipSize;
        }
      }
      placed = true;
    }
  }
}

// Check if the ship can be placed on the board without overlapping
function canPlacePlayerShip(row, col, shipSize, direction) {
  const size = playerShips.length; // Get the size of the board

  if (direction === 'horizontal') {
    // Check for horizontal placement
    if (col + shipSize > size) return false;
    for (let i = 0; i < shipSize; i++) {
      if (playerShips[row][col + i] !== 0) return false;
    }
  } else {
    if (row + shipSize > size) return false;
    for (let i = 0; i < shipSize; i++) {
      if (playerShips[row + i][col] !== 0) return false;
    }
  }
  return true;
}

function initializeOpponentShips(size, ship2, ship3, ship4, ship5) {
  opponentShipsLeft = {
    2: ship2,
    3: ship3,
    4: ship4,
    5: ship5,
  };
  updateScoreboard();

  opponentShips = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const ships = [
    { size: 2, count: ship2 },
    { size: 3, count: ship3 },
    { size: 4, count: ship4 },
    { size: 5, count: ship5 },
  ];

  ships.forEach((ship) => {
    for (let i = 0; i < ship.count; i++) {
      placeOpponentShipRandomly(ship.size);
    }
  });
}

function placeOpponentShipRandomly(shipSize) {
  const size = opponentShips.length;
  let placed = false;

  while (!placed) {
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (canPlaceOpponentShip(row, col, shipSize, direction)) {
      for (let i = 0; i < shipSize; i++) {
        if (direction === 'horizontal') {
          opponentShips[row][col + i] = shipSize;
        } else {
          opponentShips[row + i][col] = shipSize;
        }
      }
      placed = true;
    }
  }
}

// ========================
// Ship Placement Validation (Player and Opponent)
// Check if the ship can be placed on the board without overlapping
function canPlaceOpponentShip(row, col, shipSize, direction) {
  const size = opponentShips.length;

  if (direction === 'horizontal') {
    if (col + shipSize > size) return false;
    for (let i = 0; i < shipSize; i++) {
      if (opponentShips[row][col + i] !== 0) return false;
    }
  } else {
    if (row + shipSize > size) return false;
    for (let i = 0; i < shipSize; i++) {
      if (opponentShips[row + i][col] !== 0) return false;
    }
  }
  return true;
}

// ========================
// Shooting Logic (Player and AI)
// ========================
function shootAtCell(event) {
  const cell = event.target; // Get the clicked cell

  if (cell.classList.contains('clicked')) {
    return; // Prevent shooting at the same cell again
  }

  cell.classList.add('clicked');

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (opponentShips[row][col] > 0) {
    const shipSize = opponentShips[row][col];
    cell.style.backgroundColor = 'red';
    opponentShips[row][col] = -shipSize;

    if (checkIfShipDestroyed(shipSize)) {
      opponentShipsLeft[shipSize]--;
      updateScoreboard();
      alert('BOOM! You destroyed a ship of size ' + shipSize + '!');
      checkWin(); // 🏆 CHECK IF YOU WON after destroying a ship
    }
  } else {
    cell.style.backgroundColor = 'lightgray';
  }

  opponentShoot();
}

function opponentShoot() {
  const size = playerShips.length;
  let shot = false;

  while (!shot) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    const board = document.getElementById('player1-board');
    const playerCell = board.rows[row].cells[col];

    if (!playerCell.classList.contains('shot')) {
      if (playerShips[row][col] > 0) {
        playerCell.style.backgroundColor = 'red';
      } else {
        playerCell.style.backgroundColor = 'lightgray';
      }
      playerCell.classList.add('shot');
      shot = true;
    }
  }
}

// ========================
// 🧹 Helper Functions
// ========================
function checkIfShipDestroyed(shipSize) {
  for (let row = 0; row < opponentShips.length; row++) {
    for (let col = 0; col < opponentShips.length; col++) {
      if (opponentShips[row][col] === shipSize) {
        return false;
      }
    }
  }
  return true;
}

function updateScoreboard() {
  document.getElementById('ship-2-count').textContent = opponentShipsLeft[2];
  document.getElementById('ship-3-count').textContent = opponentShipsLeft[3];
  document.getElementById('ship-4-count').textContent = opponentShipsLeft[4];
  document.getElementById('ship-5-count').textContent = opponentShipsLeft[5];
}

function checkWin() {
  if (
    opponentShipsLeft[2] === 0 &&
    opponentShipsLeft[3] === 0 &&
    opponentShipsLeft[4] === 0 &&
    opponentShipsLeft[5] === 0
  ) {
    setTimeout(() => {
      alert('YOU WIN! Congratulations!');
      location.reload(); // Reload the page after winning
    }, 200); // Small delay so you see the last red cell
  }
}
