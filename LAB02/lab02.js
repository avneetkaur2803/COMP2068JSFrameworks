const prompt = require("prompt");

prompt.start();

prompt.get(["userSelection"], function (err, result) {
  if (err) {
    console.error("Error occurred");
    return;
  }
    const randomNumber = Math.random();
  let computerSelection = "";

  if (randomNumber <= 0.34) {
    computerSelection = "PAPER";
  } else if (randomNumber <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }

  console.log("Computer selected:", computerSelection);
  


  const userSelection = result.userSelection.toUpperCase();
  console.log("User selected:", userSelection);
});
