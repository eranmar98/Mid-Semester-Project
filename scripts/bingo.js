function init() {
  let randomNumbers = [];

  // ----- Generate 49 unique random numbers -----
  for (let i = 0; i < 49; i++) {
    // Generate a random number between 1 and 100
    let randomNumber = Math.floor(Math.random() * 100) + 1;

    if (!randomNumbers.includes(randomNumber)) { // check if the number is already in the array
      // if not, add it to the array
      randomNumbers.push(randomNumber); 
    } else {
      i--; // decrement i to ensure we get 49 unique numbers
    }
  }

  // ----- Render the Bingo table -----
  let table = document.getElementById('bingo-table');// get the table element
  let index = 0; // index to track the position in the randomNumbers array
 
  
  for (let row = 0; row < 7; row++) {
    let tr = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      let td = document.createElement('td');
      td.innerHTML = randomNumbers[index];
      tr.appendChild(td);
      index++;
    }
    table.appendChild(tr);
  }
}
