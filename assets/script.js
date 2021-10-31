 //Quiz Questions & answers and correct answer
 const questions = [
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
      answer: "d. <script>"
  },
  {
      question: "String values must be enclosed within _____ when being assigned to variables.",
      choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
      answer: "c. quotes"
  },
  {
      question: "How do you create a function in JavaScript",
      choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
      answer: "b. function myFunction()"
  },
  {
      question: "The first index of an array is ____.",
      choices: ["a. 0", "b. 1", "c. 8", "d. any"],
      answer: "a. 0"
  },
  {
      question: "How do you add a comment in a JavaScript?",
      choices: ["a. 'This is a comment", "b. <!--This is a comment-->", "c. //This is a comment", "d. * This is a comment *"],
      answer: "c. //This is a comment"
  },
  {
      question: "Which event occurs when the user clicks on an HTML element?",
      choices: ["a. onmouseclick", "b. onchange", "c. onmouseover", "d. onclick"],
      answer: "d. onclick"
  }
];

//Timer variables
var timer = document.getElementById("timer");
var timeRemaining = document.getElementById("timeRemaining");
var timesUp = document.getElementById("timesUp");
//Start button variables
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
//Question variables
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
//Answer variables
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
//Initials variables-for scorekeeping
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var quizBox = document.getElementById("quiz");
//High Scores variables
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");
//Additional variables for answers & questions
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

//when quiz begins, start timer
var totalTime = 76;
function startQuiz() {
  questionIndex = 0;
  totalTime = 75;
  timeRemaining.textContent = totalTime;
  initialInput.textContent = "";

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
      totalTime--;
      timeRemaining.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              quizEnd();
          }
      }
  },1000);

  showQuiz();
};

//Functions to display questions on the quiz
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

//function to check answer
function checkAnswer(answer) {

  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      //If the answer is correct, add 1 to the final score
      correctAns++;
      //Display to user that their answer was correct
      answerCheck.textContent = "Correct!";
  } else {
      //If answer was incoorect, subtract 10 seconds from the timer
      totalTime -= 10;
      timeRemaining.textContent = totalTime;
      //Display to user that their answer was incorrect and show the correct answer
      answerCheck.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  //Continue quiz with additional questions
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      //If all of the questions have been answered, finish the quiz
      quizEnd();
  }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

//Once all questions have been answered or when the timer reaches 0, quiz ends
function quizEnd() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";
  finalScore.textContent = correctAns;
}

//function to display high score
function storeHighScores(event) {
  event.preventDefault();

  //If the user does not enter anything in the intials box, prompt them to enter a value
  if (initialInput.value === "") {
      alert("Please enter your initials!");
      return;
  } 

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";   

  //variables to record and pull scores from local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
      scoresArray = [];
  } else {
      scoresArray = JSON.parse(savedHighScores)
  }
  //calculate the users score and display with initials
  var userScore = {
      initials: initialInput.value,
      score: finalScore.textContent
  };
  //console log the score
  console.log(userScore);
  scoresArray.push(userScore);

  //Stringify the array to record in local storage
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);
  
  //call function to show high scores
  showHighScores();
}

//display high scores
var i = 0;
function showHighScores() {

  startDiv.style.display = "none";
  timer.style.display = "none";
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";
  var savedHighScores = localStorage.getItem("high scores");

  //check to see if there are any high scores already saved in the local storage
  if (savedHighScores === null) {
      return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
      listOfHighScores.appendChild(eachNewHighScore);
  }
}

//event listeners for answer selections

startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

//event listener and function to submit initials on high scores screen
submitInitialBtn.addEventListener("click", function(event){ 
  storeHighScores(event);
});

//event listener and function to view high scores
viewHighScore.addEventListener("click", function(event) { 
  showHighScores(event);
});

//event listener & fucntion for go back button on high scores menu
goBackBtn.addEventListener("click", function() {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

//event listener & fucntion to clear high scores
clearHighScoreBtn.addEventListener("click", function(){
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
  listOfHighScores.setAttribute("style", "font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;")
});