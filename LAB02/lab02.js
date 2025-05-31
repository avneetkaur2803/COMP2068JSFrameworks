// Import the 'prompt' package
const prompt = require('prompt');

// Start the prompt system
prompt.start();

// Welcome message and instructions
console.log(" Welcome to the Rock, Paper, Scissors Game!");
console.log(" Type ROCK, PAPER, or SCISSORS when prompted.");
console.log("------------------------------------------------");

// Ask the user for input
prompt.get(['userSelection'], function (err, result) {
  if (err) {
    console.error(" Error occurred:", err);
    return;
  }

  const user = result.userSelection.toUpperCase();

  // Validate user input
  if (!['ROCK', 'PAPER', 'SCISSORS'].includes(user)) {
    console.log(" Invalid input! Please type ROCK, PAPER, or SCISSORS only.");
    return;
  }

  // Generate computer selection
  const randomNum = Math.random();
  let computer = '';

  if (randomNum < 0.34) {
    computer = 'PAPER';
  } else if (randomNum < 0.68) {
    computer = 'SCISSORS';
  } else {
    computer = 'ROCK';
  }

  // Show selections
  console.log(`🧍‍♂️ You chose:      ${user}`);
  console.log(`🖥️ Computer chose: ${computer}`);

  // Determine winner
  if (user === computer) {
    console.log("🔁 It's a tie!");
  } else if (
    (user === 'ROCK' && computer === 'SCISSORS') ||
    (user === 'SCISSORS' && computer === 'PAPER') ||
    (user === 'PAPER' && computer === 'ROCK')
  ) {
    console.log(" You win!");
  } else {
    console.log(" Computer wins!");
  }
});
