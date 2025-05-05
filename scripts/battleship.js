import {
  initializeOpponentShips,
  generateBoard,
} from './battleship_functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('game-form');
  form.addEventListener('submit', startGame);
});

function startGame(event) {
  event.preventDefault(); // Prevent form submission

  const boardSize = parseInt(document.getElementById('board-size').value); // Get the board size from the input
  const ship2 = parseInt(document.getElementById('ships-2').value); // Get the number of ships of size 2 from the input
  const ship3 = parseInt(document.getElementById('ships-3').value);
  const ship4 = parseInt(document.getElementById('ships-4').value);
  const ship5 = parseInt(document.getElementById('ships-5').value);

  initializeOpponentShips(boardSize, ship2, ship3, ship4, ship5);
  generateBoard(boardSize);
}
