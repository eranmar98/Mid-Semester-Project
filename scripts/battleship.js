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

function generateBoard(size, boardId) {
  const board = document.getElementById(boardId); // Get the board element
  board.innerHTML = ''; // Clear the board/table content
  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr'); // Create a new table row
    for (let col = 0; col < size; col++) {
      const td = document.createElement('td'); // Create a new table cell
      // לגרום לכל תא להיות להדפיס את הסימן זיהוי שלו, מבלי להשפיע על כל הטבלאות)
      tr.appendChild(td); // Append the cell to the row
    }
    board.appendChild(tr); // Append the row to the board
  }
}
