let lastGeneratedNumber = null;
let mistakeCount = 0;
let score = 0;

function init() {
  let randomNumbers = [];

  // Generate 49 unique random numbers
  for (let i = 0; i < 49; i++) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    } else {
      i--; // Retry if the number is already in the array
    }
  }

  // Render the Bingo table
  let table = document.getElementById('bingo-table');
  let index = 0; // Index to track the position in the randomNumbers array

  // Create 7 rows and 7 columns
  for (let row = 0; row < 7; row++) {
    let tr = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      let td = document.createElement('td');
      td.textContent = randomNumbers[index];

      // Add click event to each cell
      td.addEventListener('click', function () {
        if (parseInt(td.textContent) === lastGeneratedNumber) {
          score++;
        } else {
          alert("Number wasn't generated!");
          mistakeCount++;
          if (mistakeCount >= 3) {
            alert('You made 3 mistakes! You are disqualified.');
            location.reload(); // Reload the page to reset the game
          }
        }
      });

      tr.appendChild(td);
      index++;
    }
    table.appendChild(tr);
  }
}

function generateRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  lastGeneratedNumber = randomNumber;

  let numberDisplay = document.getElementById('number-display');
  numberDisplay.textContent = lastGeneratedNumber;
}

function checkForWin(td) {
  let row = td.parentElement; // Get the row (<tr>) of the clicked cell
  let table = document.getElementById('bingo-table');
  let colIndex = Array.from(row.children).indexOf(td); // Find which column number the clicked cell is in

  let rowChecked = 0;
  let colChecked = 0;

  // Check how many checked cells are in the same row
  for (let cell of row.children) {
    if (cell.classList.contains('checked')) {
      rowChecked++;
    }
  }

  // Check how many checked cells are in the same column
  for (let r of table.rows) {
    if (r.cells[colIndex].classList.contains('checked')) {
      colChecked++;
    }
  }

  // If full row or full column is checked, user wins
  if (rowChecked === 7 || colChecked === 7) {
    alert('YOU WIN!');
  }
}

const generateButton = document.getElementById('generate-number');
generateButton.addEventListener('click', generateRandomNumber);
