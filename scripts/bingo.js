let lastGeneratedNumber = null;
let mistakeCount = 0;
let score = 0;

// Initialize the Bingo game
function init() {
  let randomNumbers = [];

  // Generate 49 unique random numbers between 1 and 100
  while (randomNumbers.length < 49) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  // Render the Bingo table
  let table = document.getElementById('bingo-table');
  table.innerHTML = ''; // Clear old table if any
  let index = 0;

  // Create 7x7 grid
  for (let row = 0; row < 7; row++) {
    let tr = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      let td = document.createElement('td');
      td.textContent = randomNumbers[index];

      // Click event for each cell
      td.addEventListener('click', function () {
        if (td.classList.contains('checked')) return; // prevent re-clicking

        if (parseInt(td.textContent) === lastGeneratedNumber) {
          td.classList.add('checked');
          score++;
          checkForWin(td);
        } else {
          alert("Number wasn't generated!");
          mistakeCount++;
          if (mistakeCount >= 3) {
            alert('You made 3 mistakes! You are disqualified.');
            location.reload();
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

// Check for win condition
function checkForWin() {
  if (score >= 3) {
    setTimeout(() => {
      alert('BINGO! YOU WIN!');
      location.reload();
    }, 100);
  }
}

const generateButton = document.getElementById('generate-number');
generateButton.addEventListener('click', generateRandomNumber);
