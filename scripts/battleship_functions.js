// Battleship Game Functions

export let opponentShips = []; // 2D array to represent the opponent's ships
export let opponentShipsLeft = {}; // Object to track the number of ships left for each size

// Create empty board
export function initializeOpponentShips(size, ship2, ship3, ship4, ship5) {
  // Initialize the opponent's ships
  opponentShipsLeft = { 2: ship2, 3: ship3, 4: ship4, 5: ship5 }; // Track the number of ships left for each size
  updateScoreboard(); // Update the scoreboard

  // Create a 2D array to represent the opponent's ships
  opponentShips = Array(size) // Create an array of the specified size
    .fill(null) // Fill the array with null values
    .map(() => Array(size).fill(0)); // Fill the board with zeros

  // Create an array of ship objects with size and count
  const ships = [
    { size: 2, count: ship2 },
    { size: 3, count: ship3 },
    { size: 4, count: ship4 },
    { size: 5, count: ship5 },
  ];

  // Place each ship randomly on the board
  ships.forEach((ship) => {
    // Loop through each ship object
    for (let i = 0; i < ship.count; i++) {
      // Loop through the count of each ship
      placeShipRandomly(ship.size); // Place the ship randomly on the board
    }
  });
}

// Function to place a ship randomly on the board
export function placeShipRandomly(shipSize) {
  const size = opponentShips.length; // Get the size of the board
  let placed = false; // Flag to check if the ship is placed

  while (!placed) {
    const dir = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Randomly choose direction
    const row = Math.floor(Math.random() * size); // Randomly choose row
    const col = Math.floor(Math.random() * size); // Randomly choose column

    if (canPlaceShip(row, col, shipSize, dir)) {
      for (let i = 0; i < shipSize; i++) {
        if (dir === 'horizontal') {
          opponentShips[row][col + i] = shipSize;
        } else {
          opponentShips[row + i][col] = shipSize;
        }
      }
      placed = true;
    }
  }
}

// Function to check if a ship can be placed at the given position
export function canPlaceShip(row, col, shipSize, dir) {
  const size = opponentShips.length;

  if (dir === 'horizontal') {
    if (col + shipSize > size) return false; // Check if the ship fits horizontally
    for (let i = 0; i < shipSize; i++) {
      if (opponentShips[row][col + i] !== 0) return false; // Check if the cell is already occupied
    }
  } else {
    if (row + shipSize > size) return false; // Check if the ship fits vertically
    for (let i = 0; i < shipSize; i++) {
      if (opponentShips[row + i][col] !== 0) return false; // Check if the cell is already occupied
    }
  }
  return true; // Return true if the ship can be placed
}

export function generateBoard(size) {
  const board = document.getElementById('opponent-board');
  board.innerHTML = '';

  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < size; col++) {
      const td = document.createElement('td');
      td.dataset.row = row;
      td.dataset.col = col;
      td.addEventListener('click', shootAtCell);
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
}

export function shootAtCell(event) {
  const cell = event.target;
  if (cell.classList.contains('clicked')) return;

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
      alert(`BOOM! You destroyed a ship of size ${shipSize}!`);
      checkWin();
    }
  } else {
    cell.style.backgroundColor = 'lightgray';
  }
}

export function checkIfShipDestroyed(shipSize) {
  for (let row = 0; row < opponentShips.length; row++) {
    for (let col = 0; col < opponentShips.length; col++) {
      if (opponentShips[row][col] === shipSize) return false;
    }
  }
  return true;
}

export function checkWin() {
  if (
    opponentShipsLeft[2] === 0 &&
    opponentShipsLeft[3] === 0 &&
    opponentShipsLeft[4] === 0 &&
    opponentShipsLeft[5] === 0
  ) {
    setTimeout(() => {
      alert('YOU WIN! Congratulations!');
      location.reload();
    }, 200);
  }
}

export function updateScoreboard() {
  document.getElementById('ship-2-count').textContent = opponentShipsLeft[2];
  document.getElementById('ship-3-count').textContent = opponentShipsLeft[3];
  document.getElementById('ship-4-count').textContent = opponentShipsLeft[4];
  document.getElementById('ship-5-count').textContent = opponentShipsLeft[5];
}
